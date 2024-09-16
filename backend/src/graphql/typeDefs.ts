//This file exports a gql object that contains all the
//graphql types and graphql end-points
import gql from "graphql-tag";
/*
Normative Note about Output ID fields:

- should be non-nullable to conform to mongoose's default _id query behaviour;
- should be named _id to match MongoDB
*/
const schema = gql`
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

  """
  """
  type Name {
    first: String!
    middle: String
    last: String!
  }

  input NameInput {
    first: String!
    middle: String
    last: String!
  }

  type JWT {
    name: Name
    username: String
    email: String
    iat: Int
    exp: Int
    sub: String
  }

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
    lat: Float!
    lng: Float!
  }

  type comment {
    username: String
    body: String
  }

  input commentInput {
    username: String!
    body: String!
  }

  type image {
    contentType: String
    path: String
  }

  input imageInput {
    contentType: String!
    path: String!
  }

  input registeredInput {
    type: registeredRepType!
    boolValue: Boolean
    numValue: Int
  }

  input userCommunityInput {
    type: expandedRepType!
    objValue: communityInput
    strValue: String
  }

  union registered = bool | int

  type notification {
    _id: ID
    userID: String
    title: String
    content: String
    image: [image]
    link: String
    date: String
    isRead: Boolean
    isDeleted: Boolean
  }

  input notificationInput {
    id: String
    userID: String
    title: String
    content: String
    image: [imageInput!]
    link: String
    isRead: Boolean
    isDeleted: Boolean
  }

  type user {
    _id: ID!
    userID: String
    name: Name
    username: String
    email: String
    registered: registered
    location: location
    images: [image]
    motives: [String]
    biography: String
    topics: [String]
    communities: [community]
    skills: [skill]
    badges: [badge]
    currentLevel: Int
    recommendations: [recommendations]
  }

  input userInput {
    id: String
    userID: String
    name: NameInput
    username: String
    email: String
    registered: registeredInput
    location: locationInput
    images: [imageInput]
    motives: [String]
    biography: String
    topics: [String]
    communities: [userCommunityInput]
    skills: [skillInput]
    badges: [badgeInput]
    currentLevel: Int
    recommendations: [recommendationsInput]
  }

  type crossUser {
    _id: ID
    email: String
    phoneNumber: String
    regenquestUserId: String
  }

  type task {
    _id: ID
    userID: String
    questID: String
    createdAt: String
    name: String
    description: String
    requirements: [String]
    completionStatus: Boolean
    history: [String]
  }

  input taskInput {
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
  type quest {
    _id: ID
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

  input questInput {
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

  type post {
    _id: ID
    userID: String
    title: String
    description: String
    likes: Int
    attachments: [String]
    createdAt: String
    comments: [comment]
  }

  input postInput {
    id: String
    userID: String
    title: String
    description: String
    attachments: [String!]
    comments: [commentInput!]
  }

  type inventory {
    _id: ID
    userID: String
    taskLink: String
    itemName: String
    createdAt: String
    description: String
    image: [image]
    history: [String]
  }

  input inventoryInput {
    id: String
    userID: String
    taskLink: String
    itemName: String
    description: String
    image: [imageInput]
    history: [String]
  }

  type event {
    _id: ID
    name: String
    theme: String
    location: location
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  input eventInput {
    id: String
    name: String
    theme: String
    location: locationInput
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  type community {
    _id: ID!
    name: String
    description: String
    objective: String
    initiative: String
    members: [user]
    tags: [String]
    location: location
    images: [image]
  }

  input communityMemberInput {
    type: expandedRepType!
    objValue: userInput
    strValue: String
  }

  input communityInput {
    id: String
    name: String
    description: String
    objective: String
    initiative: String
    members: [communityMemberInput!]
    tags: [String!]
    location: locationInput
    images: [imageInput!]
  }

  type genre {
    genre: [String]
  }

  input genreInput {
    genre: [String]
  }

  type mutationResponse {
    code: Int
    response: String
    id: String
  }

  type loggedInUsers {
    id: String
    userID: String
  }

  input loginUser {
    username: String
    password: String
  }

  type chat {
    _id: ID
    members: [String]
    name: String
    description: String
    createdAt: String
  }

  input chatInput {
    id: String
    members: [String]
    name: String
    description: String
  }

  type message {
    _id: ID
    chatID: String
    sentFrom: String
    message: String
    time: String
    unreadBy: [String]
  }

  input messageInput {
    id: String
    chatID: String
    sentFrom: String
    message: String
  }

  input addMemberToChatInput {
    _id: ID
    userID: String
  }

  input markMessageAsReadInput {
    _id: ID
    userID: String
  }

  type topic {
    name: String
  }

  type motive {
    name: String
  }

  """
  Application, Program, Project and Coop Role Enumerations
  """
  enum ApplicationRole {
    REG_USER
    ADMIN
  }
  enum ProjectRole {
    PROJECT_MANAGER
    PROJECT_COORDINATOR
    PROJECT_ANALYST
    PROJECT_SPONSOR
    PROJECT_TEAM_MEMBER
    PROJECT_ADVISOR
    PROJECT_DESIGNER
    PROJECT_QA_TESTER
  }
  enum ProgramRole {
    PROGRAM_MANAGER
    PROGRAM_COORDINATOR
    PROGRAM_ANALYST
    PROGRAM_SPONSOR
    PROGRAM_TEAM_MEMBER
    PROGRAM_ADVISOR
    PROGRAM_DESIGNER
    PROGRAM_QA_TESTER
  }
  enum CoopRole {
    COOP_MANAGER
    COOP_COORDINATOR
    COOP_ANALYST
    COOP_SPONSOR
    COOP_TEAM_MEMBER
    COOP_ADVISOR
    COOP_DESIGNER
    COOP_QA_TESTER
  }
  type ProjectRoleDetail {
    role: ProjectRole!
    description: String
    qualifications: [String]
  }
  type ProgramRoleDetail {
    role: ProgramRole!
    description: String
    qualifications: [String]
  }
  type CoopRoleDetail {
    role: CoopRole!
    description: String
    qualifications: [String]
  }

  directive @auth on FIELD_DEFINITION
  directive @verifyToken on FIELD_DEFINITION
  directive @formatObj(dbName: String, modelName: String) on FIELD_DEFINITION

  type Query {
    getUsers: [user] @auth
    getPosts: [post] @auth
    getCommunities: [community] @auth

    findUserbyID(id: String, expand: String): user @auth
    findPostbyID(postID: String): post @auth
    findCommunitybyID(id: String): community @auth
    findCrossUser(email: String): crossUser @auth

    getChatsByUserID(userID: String): [chat] @auth
    getMessagesByChatID(chatID: String): [message] @auth

    getNotifications(userID: String!): [notification] @auth
    getUnreadNotifications(userID: String!): [notification] @auth

    getToken: JWT @auth

    generatePresignedURL: String! @auth
  }

  """
  TODO: Declare and implement delete routines for all necessary models
  """
  type Mutation {
    createUser(userInput: userInput!): mutationResponse @auth
    createPost(userInput: postInput!): mutationResponse @auth
    createCommunity(communityInput: communityInput!): mutationResponse @auth
    createNotification(userInput: notificationInput!): mutationResponse @auth
    createChat(userInput: chatInput!): mutationResponse @auth
    sendRegenquestMessage(userInput: messageInput!): mutationResponse @auth
    addMemberToChat(userInput: addMemberToChatInput!): mutationResponse @auth
    markMessageAsRead(userInput: markMessageAsReadInput!): mutationResponse
      @auth

    updateRegenquestUser(userInput: userInput!): mutationResponse @auth
    updateRegenquestPost(userInput: postInput!): mutationResponse @auth
    updateRegenquestCommunity(userInput: communityInput!): mutationResponse
      @auth
    updateRegenquestNotification(
      userInput: notificationInput!
    ): mutationResponse @auth
    markNotificationAsRead(notificationID: String): mutationResponse @auth
    markAllNotificationsAsRead(userID: String): mutationResponse @auth
    deleteNotification(notificationID: String): mutationResponse @auth

    setCookieWithToken(token: String!): mutationResponse @verifyToken
    deleteCookieToken: mutationResponse

    deleteFile(fileName: String!): mutationResponse @auth
  }
`;

export default schema;
