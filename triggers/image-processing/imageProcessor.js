const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");
const path = require("path");
const os = require("os");

const storage = new Storage();
// The recommended minimum size for a profile image is 400x400
const size = 400;

exports.processImageUpload = async (event, context) => {
  const file = event;
  const bucketName = file.bucket;
  const filePath = file.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const targetFilePath = path.join(os.tmpdir(), `resized-${fileName}`);

  console.log(`File type: ${file.contentType}`);
  console.log(`Uploaded file path: ${filePath}`);
  console.log(`Uploaded file dir: ${path.dirname(filePath)}`);

  // Do nothing if file is not an image or if file is not located in IMAGE_POOL
  if (
    !file.contentType.startsWith("image/") ||
    path.dirname(filePath) !== process.env.IMAGE_POOL
  ) {
    console.log(`Ignoring file: ${filePath}`);
    return;
  }

  try {
    const fileObject = storage.bucket(bucketName).file(filePath);
    const [metadata] = await fileObject.getMetadata();

    // Do nothing if the image was already resized
    if (metadata.metadata && metadata.metadata.resized === "true") {
      console.log("File was already resized");
      return;
    }

    // Get uploaded image
    await storage.bucket(bucketName).file(filePath).download({
      destination: tempFilePath,
    });

    // Perform post-process on image and then replace the blob on GCS
    await sharp(tempFilePath)
      // `inside` fitting only shrinks the image if its intrinsic dimensions exceed 400x400 pixels
      // https://sharp.pixelplumbing.com/api-resize
      .resize(size, size, { fit: "inside" })
      .toFile(targetFilePath);

    await storage.bucket(bucketName).upload(targetFilePath, {
      destination: filePath,
      metadata: {
        // Provided by the client when uploading to the signed URL endpoint
        contentType: metadata.contentType,
        metadata: {
          resized: "true",
        },
      },
    });

    console.log(`Image ${fileName} resized and uploaded successfully.`);
  } catch (error) {
    console.error("Failed to process image:", error);
    throw error;
  }
};
