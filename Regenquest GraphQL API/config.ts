import "dotenv/config";
export const CONFIG = {
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION!,
  REGENQUEST_DB_NAME: process.env.REGENQUEST_DB_NAME!,
  CROSSPLATFORM_DB_NAME: process.env.CROSSPLATFORM_DB_NAME!,
  IMAGE_BUCKET_NAME: process.env.IMAGE_BUCKET_NAME!,
  DIR_PATH: process.env.DIR_PATH!,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  ACCESS_JWT_NAME: process.env.ACCESS_JWT_NAME!,
  CROSS_ORIGIN: process.env.CROSS_ORIGIN!,
  REACT_APP_AUTH_API_URI: process.env.REACT_APP_AUTH_API_URI!,
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME!,
};

export default CONFIG;
