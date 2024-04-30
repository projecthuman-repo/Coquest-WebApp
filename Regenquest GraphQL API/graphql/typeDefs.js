//This file exports a gql object that contains all the
//graphql types and graphql end-points
const { gql } = require("apollo-server-cloud-functions");

/*
Normative Note about Output ID fields:

- should be non-nullable to conform to mongoose's default _id query behaviour;
- should be named _id to match MongoDB
*/
module.exports = gql`
  """
  Type wrappers for union types.
  Use these object types in conjunction with other union member types instead of their fundamental type counterparts.
  """
  type bool {
    boolValue: Boolean!
  }

  type int {
    numValue: Int!
  }

  type string {
    strValue: String!
  }

  """
  Discriminator types for unionized types 
  """
  enum registeredRepType {
    BOOLEAN
    NUMBER
  }
  
  enum expandedRepType {
    EXPANDED_OBJ
    ID_STRING
  }

  """"""
  type skill {
    skillName: String
    skillLevel: String
  }

  input skillInput {
    skillName: String
    skillLevel: String
  }

  type badge {
    badgeName: String
    badgeDescription: String
  }

  input badgeInput {
    badgeName: String
    badgeDescription: String
  }

  type recommendations {
    name: String
    comment: String
  }

  input recommendationsInput {
    name: String
    comment: String
  }

  type location {
    lat: Float
    lng: Float
  }

  input locationInput {
    lat: Float
    lng: Float
  }

  type comment {
    username: String
    body: String
  }

  input commentInput {
    username: String
    body: String
  }
  
  type image {
    contentType: String
    path: String
  }

  input imageInput {
    contentType: String
    path: String
  }

  input registeredInput {
    type: registeredRepType!
    boolValue: Boolean
    numValue: Int
  }

  input communityInput {
    type: expandedRepType!
    objValue: regenquestCommunityInput
    strValue: String
  }

  union registered = bool | int

  union expandableUser = regenquestUser | string
  union expandableCommunity = regenquestCommunity | string

  type regenquestNotification {
    _id: String
    userID: String
    title: String
    content: String
    image: [image]
    link: String
    date: String
    isRead: Boolean
    isDeleted: Boolean
  }

  input regenquestNotificationInput {
    id: String
    userID: String
    title: String
    content: String
    image: [imageInput]
    link: String
    isRead: Boolean
    isDeleted: Boolean
  }

  type regenquestUser {
    _id: String!
    userID: String
    name: String
    username: String
    email: String
    registered: registered
    location: location
    images: [image]
    motives: [String]
    biography: String
    topics: [String]
    communities: [expandableCommunity]
    skills: [skill]
    badges: [badge]
    currentLevel: Int
    recommendations: [recommendations]
  }

  input regenquestUserInput {
    id: String
    userID: String
    name: String
    username: String
    email: String
    registered: registeredInput
    location: locationInput
    images: [imageInput]
    motives: [String]
    biography: String
    topics: [String]
    communities: [communityInput]
    skills: [skillInput]
    badges: [badgeInput]
    currentLevel: Int
    recommendations: [recommendationsInput]
  }

  type regenquestCrossUser {
    _id: String
    email: String
    phoneNumber: String
    regenquestUserId: String
  }

  type regenquestTask {
    _id: String
    userID: String
    questID: String
    createdAt: String
    name: String
    description: String
    requirements: [String]
    completionStatus: Boolean
    history: [String]
  }

  input regenquestTaskInput {
    id: String
    userID: String
    questID: String
    name: String
    description: String
    requirements: [String]
    completionStatus: Boolean
    history: [String]
  }

  """
  TODO: Modify data definition at a later time 
  """
  type regenquestQuest {
    _id: String
    name: String
    description: String
    objective: String
    initiative: String
    type: String
    duration: String
    location: location
    startDate: String
    endDate: String
    requirements: [String]
    members: [String]
    history: [String]
    budget: Float
    tasks: [String]
    hashtags: [String]
  }

  input regenquestQuestInput {
    id: String
    name: String
    description: String
    objective: String
    initiative: String
    type: String
    duration: String
    location: locationInput
    startDate: String
    endDate: String
    requirements: [String]
    members: [String]
    history: [String]
    budget: Float
    tasks: [String]
    hashtags: [String]
  }

  type regenquestPost {
    _id: String
    userID: String
    title: String
    description: String
    likes: Int
    attachments: [String]
    createdAt: String
    comments: [comment]
  }

  input regenquestPostInput {
    id: String
    userID: String
    title: String
    description: String
    attachments: [String]
    comments: [commentInput]
  }

  type regenquestInventory {
    _id: String
    userID: String
    taskLink: String
    itemName: String
    createdAt: String
    description: String
    image: [image]
    history: [String]
  }

  input regenquestInventoryInput {
    id: String
    userID: String
    taskLink: String
    itemName: String
    description: String
    image: [imageInput]
    history: [String]
  }

  type regenquestEvent {
    _id: String
    name: String
    theme: String
    location: location
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  input regenquestEventInput {
    id: String
    name: String
    theme: String
    location: locationInput
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  type regenquestCommunity {
    _id: String!
    name: String
    description: String
    members: [expandableUser]
    tags: [String]
    location: location
    images: [image]
  }

  input userInput {
    type: expandedRepType!
    objValue: regenquestUserInput
    strValue: String
  }

  input regenquestCommunityInput {
    id: String
    name: String
    description: String
    members: [userInput]
    tags: [String]
    location: locationInput
    images: [imageInput]
  }

  type regenquestGenres {
    genre: [String]
  }

  input regenquestGenresInput {
    genre: [String]
  }

  type mutationResponse {
    code: Int
    response: String
    id: String
  }

  type regenquestLoggedInUsers {
    id: String
    userID: String
  }

  input loginUser {
    username: String
    password: String
  }

  type regenquestChat {
    _id: String
    members: [String]
    name: String
    description: String
    createdAt: String
  }

  input regenquestChatInput {
    id: String
    members: [String]
    name: String
    description: String
  }

  type regenquestMessage {
    _id: String
    chatID: String
    sentFrom: String
    message: String
    time: String
    unreadBy: [String]
  }

  input regenquestMessageInput {
    id: String
    chatID: String
    sentFrom: String
    message: String
  }

  input addMemberToChatInput {
    _id: String
    userID: String
  }

  input markMessageAsReadInput {
    _id: String
    userID: String
  }

  type regenquestTopic {
    name: String
  }

  type regenquestMotive {
    name: String
  }

  directive @auth on FIELD_DEFINITION
  directive @verifyToken on FIELD_DEFINITION

  type Query {
    getUsers: [regenquestUser] @auth
    getTasks: [regenquestTask] @auth
    getQuests: [regenquestQuest] @auth
    getPosts: [regenquestPost] @auth
    getItems: [regenquestInventory] @auth
    getEvents: [regenquestEvent] @auth
    getCommunities: [regenquestCommunity] @auth
    getGenres: [regenquestGenres] @auth
    getTopics: [regenquestTopic] @auth
    getMotives: [regenquestMotive] @auth

    findUserbyID(id: String): regenquestUser @auth
    findTaskbyID(taskID: String): regenquestTask @auth
    findQuestbyID(questID: String): regenquestQuest @auth
    findPostbyID(postID: String): regenquestPost @auth
    findInventoryItembyID(itemID: String): regenquestInventory @auth
    findEventbyID(eventID: String): regenquestEvent @auth
    findCommunitybyID(id: String): regenquestCommunity @auth
    findCrossUser(email: String): regenquestCrossUser @auth

    getChatsByUserID(userID: String): [regenquestChat] @auth
    getMessagesByChatID(chatID: String): [regenquestMessage] @auth

    getNotifications(userID: String): [regenquestNotification] @auth
    getUnreadNotifications(userID: String): [regenquestNotification] @auth
    markNotificationAsRead(notificationID: String): mutationResponse @auth
    markAllNotificationsAsRead(userID: String): mutationResponse @auth
    deleteNotification(notificationID: String): mutationResponse @auth

    generatePresignedURL: String! @auth
  }

  
  """
  TODO: Declare and implement delete routines for all necessary models
  """
  type Mutation {
    createRegenquestUser(userInput: regenquestUserInput): mutationResponse @auth
    createRegenquestTask(userInput: regenquestTaskInput): mutationResponse @auth
    createRegenquestQuest(userInput: regenquestQuestInput): mutationResponse @auth
    createRegenquestPost(userInput: regenquestPostInput): mutationResponse @auth
    createRegenquestInventory(
      userInput: regenquestInventoryInput
    ): mutationResponse @auth
    createRegenquestEvent(userInput: regenquestEventInput): mutationResponse @auth
    createRegenquestCommunity(
      communityInput: regenquestCommunityInput
    ): mutationResponse @auth
    createRegenquestNotification(
      userInput: regenquestNotificationInput
    ): mutationResponse @auth

    createRegenquestChat(userInput: regenquestChatInput): mutationResponse @auth
    sendRegenquestMessage(userInput: regenquestMessageInput): mutationResponse @auth
    addMemberToChat(userInput: addMemberToChatInput): mutationResponse @auth
    markMessageAsRead(userInput: markMessageAsReadInput): mutationResponse @auth

    updateRegenquestUser(userInput: regenquestUserInput): mutationResponse @auth
    updateRegenquestTask(userInput: regenquestTaskInput): mutationResponse @auth
    updateRegenquestQuest(userInput: regenquestQuestInput): mutationResponse  @auth
    updateRegenquestPost(userInput: regenquestPostInput): mutationResponse @auth
    updateRegenquestInventory(
      userInput: regenquestInventoryInput
    ): mutationResponse @auth
    updateRegenquestEvent(userInput: regenquestEventInput): mutationResponse @auth
    updateRegenquestCommunity(
      userInput: regenquestCommunityInput
    ): mutationResponse @auth
    updateRegenquestGenres(userInput: regenquestGenresInput): mutationResponse @auth
    updateRegenquestNotification(
      userInput: regenquestNotificationInput
    ): mutationResponse @auth

    setCookieWithToken(token: String!): mutationResponse @verifyToken
  }
`;
