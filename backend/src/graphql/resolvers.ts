import { User } from "../models/User";
import { Post, PostSchemaType } from "../models/Post";
import { Community, CommunitySchemaType } from "../models/Community";
import { Notification, NotificationSchemaType } from "../models/Notification";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import { CrossPlatformUser } from "../models/crossPlatform/User";
import { Coop } from "../models/Coop";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import jwt from "jsonwebtoken";
import { coerceExpandable } from "../utils/expandable";
import { getSecret } from "../utils/gcloud";
import CONFIG from "../config";
import mongoose from "mongoose";
/* To resolve this import please run "npm run codegen"
 * If you run "npm run dev", the codegen command will run automatically
 * This will generate the necessary types for this file
 */
import { Resolvers } from "../__generated__/graphql";
import { Motive } from "../models/Motive";
import { Topic } from "../models/Topic";
import { ServerError, ServerErrorCodes } from "./ServerError";

const storage = new Storage();

const resolvers: Resolvers = {
  registered: {
    // https://stackoverflow.com/a/62185990
    __resolveType(obj) {
      if ("boolValue" in obj) {
        return "bool"; // Return the type name as a string
      } else if ("numValue" in obj) {
        return "int";
      }
      return null; // Handle cases where the type cannot be determined
    },
  },
  Query: {
    //this method returns all the regenquest users
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getUsers() {
      try {
        const result = await User.find();
        return result;
      } catch (err) {
        throw new ServerError("Error getting users", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method returns all the regenquest posts
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getPosts() {
      try {
        const result = await Post.find();
        return result;
      } catch (err) {
        throw new ServerError("Error getting posts", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method returns all the regenquest communites
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getCommunities() {
      try {
        const result = await Community.find();
        return result;
      } catch (err) {
        throw new ServerError("Error getting communities", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    async getMotives() {
      const motives = Motive.find();
      return motives;
    },

    async getTopics() {
      const topics = Topic.find();
      return topics;
    },

    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getCoops() {
      try {
        const coops = await Coop.find().populate("members");
        return coops;
      } catch (err) {
        throw new ServerError("Error getting coops", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method finds a user by their id
    // @ts-expect-error - registered is populated with its directive, it is expected here that its type won't match the schema
    async findUserbyID(_parent, { id, _ }, _context, _info) {
      try {
        const result = await User.findOne({ _id: id });
        if (!result)
          throw new ServerError("User not found", {
            code: ServerErrorCodes.NOT_FOUND,
          });

        if (typeof result.registered === "boolean") {
          result.registered = {
            boolValue: result.registered,
          };
        } else if (typeof result.registered === "number") {
          result.registered = {
            numValue: result.registered,
          };
        } else {
          /* Shouldn't happen */
          result.registered = { boolValue: false };
        }

        return result;
      } catch (err) {
        throw new ServerError("Error finding user by ID", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method finds a post by its id
    async findPostbyID(_parent, { postID }, _context, _info) {
      try {
        return await Post.findOne({ _id: postID });
      } catch (err) {
        throw new ServerError("Error finding post by id", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method finds a community by its id
    async findCommunitybyID(_parent, { id }, _context, _info) {
      try {
        return await Community.findOne({ _id: id });
      } catch (err) {
        throw new ServerError("Error finding community by id", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    // @ts-expect-error - TODO: type null not assignable
    async findCoopbyID(_parent, { id }, _context, _info) {
      try {
        return await Coop.findOne({ _id: id }).populate("members");
      } catch (err) {
        throw new ServerError("Error finding coop by id", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method find all the chats a user is in by the chat id
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getChatsByUserID(_parent, { userID }, _context, _info) {
      //check if userID was provided as a parameter
      if (!userID) {
        throw new ServerError("Must provide userID", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      //check if the user exists
      if (!(await User.exists({ userID: userID }))) {
        throw new ServerError("User not Found.", {
          code: ServerErrorCodes.NOT_FOUND,
        });
      }

      //get the chats from the db
      try {
        const result = await Chat.find({ members: { $in: [userID] } });
        return result;
      } catch (err) {
        throw new ServerError("Error finding chats by user id", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method find all messages belonging to a chat by using the chatID
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getMessagesByChatID(_parent, { chatID }, _context, _info) {
      //check if chatID was provided
      if (!chatID) {
        throw new ServerError("Must provide chatID.", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      //check if that chat exists in the db
      if (!(await Chat.exists({ _id: chatID }))) {
        throw new ServerError("Chat not Found.", {
          code: ServerErrorCodes.NOT_FOUND,
        });
      }

      //get all the messages belonging to that chat
      try {
        const result = await Message.find({ chatID: chatID });
        return result;
      } catch (err) {
        throw new ServerError("Error finding messages by chat id", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    async findCrossUser(_parent, { email }, _context, _info) {
      try {
        return await CrossPlatformUser.findOne({ email }, [
          "_id",
          "email",
          "phoneNumber",
          "regenquestUserId",
        ]);
      } catch (err) {
        throw new ServerError(
          "Error finding cross-platform user:" + (err as Error).message,
          { code: ServerErrorCodes.INTERNAL_SERVER_ERROR, cause: err },
        );
      }
    },

    //this method is used to login a regenquest user

    //this method gets all the notification for a user by thier id
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async getNotifications(_parent, { userID }, _context, _info) {
      //get all the notifications from the db
      try {
        const res = await Notification.find({ userID });
        return res;
      } catch (err) {
        throw new ServerError("Error getting notifications", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method gets all the unread notifications
    // @ts-expect-error - TODO: Cannot figure this out
    async getUnreadNotifications(_parent, { userID }, _context, _info) {
      //check if a userID is provided
      if (!userID) {
        throw new ServerError("Please provide userID", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      try {
        const res = await Notification.find({ userID: userID, isRead: false });
        return res;
      } catch (err) {
        throw new ServerError("Error getting unread notifications", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    async getToken(_parent, _, context, _info) {
      return jwt.verify(
        context.req.cookies[CONFIG.AUTH_COOKIE_NAME],
        // @ts-expect-error - I think an error should be thrown by the program if getSecret returns undefined
        // which is why I'm not assigning a deafult string value to the return value of getSecret
        await getSecret(CONFIG.ACCESS_JWT_NAME),
      );
    },

    async generatePresignedURL() {
      const EXPIRES_IN_MINS = 15;
      // Option object to be passed to the 'getSignedUrl()' method
      const options = {
        version: "v4" as const,
        action: "write" as const,
        expires: Date.now() + EXPIRES_IN_MINS * 60 * 1000,
        // Enforce an image mime type
        conditions: [["starts-with", "$content-type", "image/"]],
      };
      try {
        const uniqueFileName = `${uuidv4()}`;
        const [url] = await storage
          .bucket(CONFIG.IMAGE_BUCKET_NAME)
          .file(`${CONFIG.DIR_PATH}/${uniqueFileName}`)
          .getSignedUrl(options);

        return url;
      } catch (err) {
        console.error("Error generating signed URL:", err);
        throw new ServerError(`Error generating signed URL: ${err}`, {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },
  },
  Mutation: {
    //this method is the resolver for createUser,
    //it creates and adds the user to the db
    // @ts-expect-error - ObjectID is not assignable to type 'string'
    async createUser(
      _parent,
      {
        userInput: {
          name,
          username,
          email,
          location,
          images,
          motives,
          biography,
          topics,
          communities,
          skills,
          badges,
          currentLevel,
          recommendations,
        },
      },
      _context,
      _info,
    ) {
      const newUser = new User({
        userID: null,
        name,
        username,
        email,
        registered: false,
        location,
        images,
        motives,
        biography,
        topics,
        // Map given communities list to a list of IDs, if not already
        communities: coerceExpandable(communities, "id"),
        skills,
        badges,
        currentLevel: currentLevel ?? -1,
        recommendations,
      });

      // Add the user to the database
      try {
        // Check if a cross-platform user already exists
        const crossPlatformUserExists = await CrossPlatformUser.findOne({
          email,
        });

        if (!crossPlatformUserExists) {
          // This should not occur based on registration logic
          // This is a INTERNAL_SERVER_ERROR because it should never happen
          throw new ServerError("There was an error with your account", {
            code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
            cause: new Error("CrossPlatform user does not exist"),
            privateMessage:
              "This should not occur based on registration logic. You'll need to delete the user and try again.",
          });
        }

        newUser.userID = crossPlatformUserExists._id;
        await newUser.save();
        crossPlatformUserExists.regenquestUserId = newUser._id.toString();
        await crossPlatformUserExists.save();

        return { code: 0, response: "successful", id: newUser._id };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating user: ${(err as Error).message}`,
        };
      }
    },

    //resolver for createPost,
    //this method creates and add a post to the db
    async createPost(
      _parent,
      { userInput: { userID, title, description, attachments, comments } },
      _context,
      _info,
    ) {
      //create a new Post object
      const newPost = new Post({
        userID: userID ? userID : null,
        title: title ? title : null,
        description: description ? description : null,
        likes: 0,
        attachments: attachments ? attachments : null,
        createdAt: new Date().toLocaleString(),
        comments: comments ? comments : null,
      });

      //add the post to the db
      try {
        await newPost.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating post: ${(err as Error).message}`,
        };
      }
    },

    //resolver for createCommunity,
    //this method creates and add a community to the db
    async createCommunity(
      _parent,
      {
        userInput: {
          name,
          description,
          objective,
          initiative,
          members,
          tags,
          location,
          images,
        },
      },
      _context,
      _info,
    ) {
      //create a new community object
      const newCommunity = new Community({
        name: name,
        description: description,
        objective: objective,
        initiative: initiative,
        // Map given members list to a list of IDs, if not already
        members: coerceExpandable(members, "id"),
        tags: tags ? tags : null,
        location: location,
        images: images ? images : null,
      });

      //add the community to the db
      try {
        await newCommunity.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating community: ${(err as Error).message}`,
        };
      }
    },

    async createCoop(_parent, { userInput }, _context, _info) {
      if (!userInput.userID || !userInput.name) {
        throw new ServerError("User ID and name are required.", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }
      const newCoop = new Coop(userInput);

      try {
        await newCoop.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError(
          `Error creating coop. ${(err as Error).message}`,
          {
            code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
            cause: err,
          },
        );
      }
    },

    async joinCoop(_parent, { userInput }, _context, _info) {
      const { coopID, userID } = userInput;
      try {
        await Coop.updateOne({ _id: coopID }, { $push: { members: userID } });
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError(`Error joining coop. ${(err as Error).message}`, {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    async leaveCoop(_parent, { userInput }, _context, _info) {
      const { coopID, userID } = userInput;
      try {
        await Coop.updateOne({ _id: coopID }, { $pull: { members: userID } });
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError(`Error leaving coop. ${(err as Error).message}`, {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //resolver for createNotification,
    //this method creates and stores a notification to the db
    async createNotification(
      _parent,
      { userInput: { userID, title, content, image, link, isRead, isDeleted } },
      _context,
      _info,
    ) {
      //check if the userID is provided
      if (!userID) {
        return { code: 1, response: "Error! must provide userID" };
      }

      //create a new notificaiton object
      const newNotification = new Notification({
        userID: userID,
        title: title ? title : null,
        content: content ? content : null,
        image: image ? image : null,
        link: link ? link : null,
        date: new Date().toLocaleString(),
        isRead: isRead === undefined ? null : isRead,
        isDeleted: isDeleted === undefined ? null : isDeleted,
      });

      //try to save the notification to the db
      try {
        await newNotification.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating notification: ${(err as Error).message}`,
        };
      }
    },

    //resolver for createRegenqestChat,
    //this method creates and add a chat to the db
    async createChat(
      _parent,
      { userInput: { members, name, description } },
      _context,
      _info,
    ) {
      //check if member list is provided
      if (!members) {
        return { code: 1, response: "Error! must provide list of members" };
      }

      //create a new chat object
      const newChat = new Chat({
        members: members,
        name: name ? name : null,
        description: description ? description : null,
        createdAt: new Date().toLocaleString(),
      });

      //try adding the chat to the db
      try {
        await newChat.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating chat: ${(err as Error).message}`,
        };
      }
    },

    //resolver for sendMessage,
    //this method creates and stores messages to the db
    async sendMessage(
      _parent,
      { userInput: { chatID, sentFrom, message } },
      _context,
      _info,
    ) {
      //check is chat id is provided
      if (!chatID) {
        return { code: 1, response: "Error! must provide chatID" };
      }
      //check if sentFrom is provided
      if (!sentFrom) {
        return { code: 1, response: "Error! must provide sentFrom" };
      }
      //check if message is provided
      if (!message) {
        return { code: 1, response: "Error! must provide message" };
      }

      //check if the chat exists
      if (!(await Chat.exists({ _id: chatID }))) {
        return { code: 1, response: "Error! chat not found" };
      }

      //get all the members from the chat
      const memberList = await Chat.findOne({ _id: chatID });

      //create a new message object
      const newMessage = new Message({
        chatID: chatID,
        sentFrom: sentFrom,
        message: message,
        time: new Date().toLocaleString(),
        // @ts-expect-error - I want the error to be thrown here if memberList is undefined
        unreadBy: memberList.members.filter((member) => member !== sentFrom),
      });

      //add the message to the db
      try {
        await newMessage.save();
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error creating message: ${(err as Error).message}`,
        };
      }
    },

    //resolver for addMemberToChat,
    //this method add a member to a chat
    async addMemberToChat(
      _parent,
      { userInput: { _id, userID } },
      _context,
      _info,
    ) {
      //check if chatID is provided
      if (!_id) {
        return { code: 1, response: "Error! must provide chatID" };
      }
      //check if userID is provided
      if (!userID) {
        return { code: 1, response: "Error! must provide userID" };
      }

      //check if the chat exists
      if (!(await Chat.exists({ _id }))) {
        return { code: 1, response: "Error! chat does not exist" };
      }

      //check if the user exists
      if (!(await User.exists({ userID: userID }))) {
        return { code: 1, response: "Error! must provide user does not exist" };
      }

      //update the member list of the chat
      try {
        await Chat.updateOne({ _id }, { $push: { members: userID } });
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error adding member to chat: ${(err as Error).message}`,
        };
      }
    },

    //resolver for markMessageAsRead,
    //this method marks a message as read for a given user
    async markMessageAsRead(
      _parent,
      { userInput: { _id, userID } },
      _context,
      _info,
    ) {
      //check if message id was provided
      if (!_id) {
        return { code: 1, response: "Error! must provide messageID" };
      }
      //check if user id was provided
      if (!userID) {
        return { code: 1, response: "Error! must provide userID" };
      }
      //check if the message exists
      if (!(await Message.exists({ _id }))) {
        return { code: 1, response: "Error! message does not exist" };
      }

      //mark the message as read for the given user
      try {
        await Message.updateOne({ _id }, { $pull: { unreadBy: userID } });
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error marking message as read: ${(err as Error).message}`,
        };
      }
    },

    //this method updates propeties for a user
    async updateUser(
      _parent,
      {
        userInput: {
          id,
          name,
          username,
          email,
          registered,
          location,
          images,
          motives,
          biography,
          topics,
          communities,
          skills,
          badges,
          currentLevel,
          recommendations,
        },
      },
      _context,
      _info,
    ) {
      // TODO: check if session token in Auth header is valid

      //check if user id is provided
      if (!id) {
        return { code: 1, response: "Error! must provide userID" };
      }

      //check is user is valid
      if (!(await User.exists({ _id: id }))) {
        return { code: 1, response: "Error! user not found" };
      }

      const getRegisteredValue = (registered) => {
        if (registered.type === "BOOLEAN") {
          return registered.boolValue;
        } else if (registered.type === "NUMBER") {
          return registered.numValue;
        } else {
          return null;
        }
      };

      //create an update user object

      // TODO: Test this, I think if value are not provided, it will replace the existing values with null/undefined in the DB.
      const updateUser = {
        _id: id,
        motives: motives,
        username: username,
        email: email,
        registered: getRegisteredValue(registered),
        name: name,
        location: location,
        images: images,
        biography: biography,
        topics: topics,
        communities: coerceExpandable(communities, "id"),
        skills: skills,
        badges: badges,
        currentLevel: currentLevel,
        recommendations: recommendations,
      };

      try {
        await User.updateOne({ _id: id }, updateUser, { runValidators: true });
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error updating user: ${(err as Error).message}`,
        };
      }
    },

    //this method updates all the properties of a post
    async updatePost(
      _parent,
      { userInput: { id, userID, title, description, attachments, comments } },
      _context,
      _info,
    ) {
      //TODO: check Auth token

      //check if post id is provided
      if (!id) {
        return { code: 1, response: "Error! must provide postID" };
      }

      //check if its a valid post
      if (!(await Post.exists({ _id: id }))) {
        return { code: 1, response: "Error! post not found" };
      }

      const updatePost: Partial<PostSchemaType> = {};

      //update all the given properties of the post
      if (userID) updatePost.userID = new mongoose.Types.ObjectId(userID);

      if (title) updatePost.title = title;

      if (description) updatePost.description = description;

      if (attachments) updatePost.attachments = attachments;

      if (comments) {
        // @ts-expect-error - Inferring issue with arrays in schema
        updatePost.comments = comments;
      }

      try {
        await Post.updateOne({ _id: id }, updatePost);
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error updating post: ${(err as Error).message}`,
        };
      }
    },

    //this method updates all the properties of a community
    async updateCommunity(
      _parent,
      {
        userInput: {
          id,
          name,
          description,
          objective,
          initiative,
          members,
          tags,
          location,
          images,
        },
      },
      _context,
      _info,
    ) {
      // TODO: check if session token in Auth header is valid

      //check if community id is provided
      if (!id) {
        return { code: 1, response: "Error! must provide id" };
      }

      //check if community id is valid
      if (!(await Community.exists({ _id: id }))) {
        return { code: 1, response: "Error! community not found" };
      }

      const updateCommunity: Partial<CommunitySchemaType> = {};

      if (name) updateCommunity.name = name;
      if (description) updateCommunity.description = description;
      if (objective) updateCommunity.objective = objective;
      if (initiative) updateCommunity.initiative = initiative;
      if (members) updateCommunity.members = coerceExpandable(members, "id");
      if (tags) updateCommunity.tags = tags;
      if (location) {
        const { name, lng, lat } = location;
        updateCommunity.location = {
          name: name ?? "",
          lng,
          lat,
        }
      }
      // @ts-expect-error - Inferring issue with arrays in schema
      if (images) updateCommunity.images = images;

      try {
        await Community.updateOne({ _id: id }, updateCommunity, {
          runValidators: true,
        });
        return { code: 0, response: "successful" };
      } catch (err) {
        console.log(err);
        return {
          code: 1,
          response: `Error updating community: ${(err as Error).message}`,
        };
      }
    },

    async updateCoop(_parent, { userInput }, _context, _info) {
      const { _id, ...updateCoop } = userInput;
      try {
        if (!_id)
          throw new ServerError("Coop ID missing.", {
            code: ServerErrorCodes.INVALID_INPUT,
          });
        await Coop.updateOne({ _id }, updateCoop, { runValidators: true });
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error updating coop: ${(err as Error).message}`,
        };
      }
    },

    //this method updates all the properties of a notification
    async updateNotification(
      _parent,
      {
        userInput: {
          id,
          userID,
          title,
          content,
          image,
          link,
          isRead,
          isDeleted,
        },
      },
      _context,
      _info,
    ) {
      //check if notification id is provided
      if (!id) {
        return { code: 1, response: "Error! must provide id" };
      }

      //check if notification id is valid
      if (!(await Notification.exists({ _id: id }))) {
        return { code: 1, response: "Error! notification not found" };
      }

      const updateNotification: Partial<NotificationSchemaType> = {};
      //update all the given properties of the notification
      // @ts-expect-error - ObjectID is not assignable to type 'string'
      // TODO: This should not be updated even if provided because userID cannot change for notifications
      if (userID) updateNotification.userID = userID;

      if (title) updateNotification.title = title;

      if (content) updateNotification.content = content;

      // @ts-expect-error - Inferring issue but don't know how to fix
      if (image) updateNotification.image = image;

      if (link) updateNotification.link = link;

      if (isRead != undefined) updateNotification.isRead = isRead;

      if (isDeleted != undefined) updateNotification.isDeleted = isDeleted;

      try {
        await Notification.updateOne({ _id: id }, updateNotification);
        return { code: 0, response: "successful" };
      } catch (err) {
        return {
          code: 1,
          response: `Error updating notification: ${(err as Error).message}`,
        };
      }
    },

    //this method marks a notification as read
    async markNotificationAsRead(_parent, { notificationID }, _context, _info) {
      //check if notification id is provided
      if (!notificationID) {
        throw new ServerError("Please provide notificationID", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      //update the notification document in the db
      try {
        await Notification.updateOne({ _id: notificationID }, { isRead: true });
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError("Error marking notification as read", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method marks all notificcation as read for a user
    async markAllNotificationsAsRead(_parent, { userID }, _context, _info) {
      //check if userID is provided
      if (!userID) {
        throw new ServerError("Please provide userID", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      //update all the notification for the user in the db
      try {
        await Notification.updateMany({ userID: userID }, { isRead: true });
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError("Error marking all notification as read", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    //this method deletes a notification by its id
    async deleteNotification(_parent, { notificationID }, _context, _info) {
      //check if notification id is provided
      if (!notificationID) {
        throw new ServerError("Please provide notificationID", {
          code: ServerErrorCodes.INVALID_INPUT,
        });
      }

      //remove the notification from the db
      try {
        await Notification.deleteOne({
          _id: notificationID,
        });
        return { code: 0, response: "successful" };
      } catch (err) {
        throw new ServerError("Error deleting notification", {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },

    async setCookieWithToken(_parent, { token }, context, _info) {
      context.res.setHeader(
        "Set-Cookie",
        `${CONFIG.AUTH_COOKIE_NAME}=${token}; HttpOnly; Secure; Path=/; SameSite=None`,
      );

      return { code: 0, response: "successful" };
    },

    async deleteCookieToken(_parent, _args, context, _info) {
      context.res.clearCookie(CONFIG.AUTH_COOKIE_NAME);
      return { code: 0, response: "successful" };
    },

    // this deletes image (file) from the bucket
    async deleteFile(_, { fileName }) {
      try {
        const bucket = storage.bucket(CONFIG.IMAGE_BUCKET_NAME);
        const file = bucket.file(`${CONFIG.DIR_PATH}/${fileName}`);
        await file.delete();
        return { code: 0, response: "successful" };
      } catch (err) {
        console.error("Error deleting file:", err);
        throw new ServerError(`Error deleting file: ${err}`, {
          code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
          cause: err,
        });
      }
    },
  },
};
export default resolvers;
