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

  type Skill {
    skillName: String
    skillLevel: String
  }

  input SkillInput {
    skillName: String
    skillLevel: String
  }

  type Badge {
    badgeName: String
    badgeDescription: String
  }

  input BadgeInput {
    badgeName: String
    badgeDescription: String
  }

  type Recommendation {
    name: String
    comment: String
  }

  input RecommendationInput {
    name: String
    comment: String
  }

  type Location {
    lat: Float
    lng: Float
  }

  input LocationInput {
    lat: Float!
    lng: Float!
  }

  type Comment {
    username: String
    body: String
  }

  input CommentInput {
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
    objValue: CommunityInput
    strValue: String
  }

  union registered = bool | int

  type Notification {
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

  input NotificationInput {
    id: String
    userID: String
    title: String
    content: String
    image: [imageInput!]
    link: String
    isRead: Boolean
    isDeleted: Boolean
  }

  type User {
    _id: ID!
    userID: String
    name: Name
    username: String
    email: String
    registered: registered
    location: Location
    images: [image]
    motives: [String]
    biography: String
    topics: [String]
    communities: [Community]
    skills: [Skill]
    badges: [Badge]
    currentLevel: Int
    recommendations: [Recommendation]
  }

  input UserInput {
    id: String
    userID: String
    name: NameInput
    username: String
    email: String
    registered: registeredInput
    location: LocationInput
    images: [imageInput]
    motives: [String]
    biography: String
    topics: [String]
    communities: [userCommunityInput]
    skills: [SkillInput]
    badges: [BadgeInput]
    currentLevel: Int
    recommendations: [RecommendationInput]
  }

  type CrossUser {
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
    location: Location
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
    location: LocationInput
    startDate: String
    endDate: String
    requirements: [String]
    members: [String]
    history: [String]
    budget: Float
    tasks: [String]
    hashtags: [String]
  }

  type BudgetItem {
    name: String
    quantity: Int
    costEach: Int
    costTotal: Int
  }

  enum RecurringType {
    DAILY
    WEEKLY
    MONTHLY
    CUSTOM
  }

  type Milestone {
    title: String!
    description: String
    completed: Boolean!
  }

  input MilestoneInput {
    title: String!
    description: String
    completed: Boolean
  }

  type Coop {
    _id: ID!
    userID: String
    name: String
    type: String
    summary: String
    mission: String
    locationAllowed: Boolean
    notificationAllowed: Boolean
    location: Location
    startDate: String # Use ISO date format
    endDate: String # Use ISO date format
    milestones: [Milestone!]
    recurring: RecurringType
    radius: String
    haveNeutralMeetingSpace: Boolean
    venues: [String!]
    additionalInfo: String
    budgetingItems: [BudgetItem!]
    openToBartering: Boolean
    members: [User!]

    # Participation & Crowdfunding
    participationCost: Float
    maxParticipants: Int
    needsCrowdfunding: Boolean
    crowdfundingAmount: Float
    crowdfundingMessage: String

    materialHelp: String
    serviceHelp: String
    operationHelp: String

    # Promotion
    promotionArea: Location
    promotionImage: String
    shareLink: String
    invitedUsers: [ID!]
  }

  input BudgetItemInput {
    name: String
    quantity: Int
    costEach: Int
    costTotal: Int
  }

  input CoopInput {
    id: ID
    userID: ID
    name: String
    type: String
    summary: String
    mission: String
    locationAllowed: Boolean
    notificationAllowed: Boolean
    location: LocationInput
    startDate: String
    startTime: String
    endDate: String
    endTime: String
    milestones: [MilestoneInput!]
    recurring: RecurringType
    radius: String
    haveNeutralMeetingSpace: Boolean
    venues: [String!]
    additionalInfo: String
    budgetingItems: [BudgetItemInput!]
    openToBartering: Boolean
    participationCost: Float
    maxParticipants: Int
    needsCrowdfunding: Boolean
    crowdfundingAmount: Float
    crowdfundingMessage: String
    materialHelp: String
    serviceHelp: String
    operationHelp: String
    promotionArea: LocationInput
    promotionImage: String
    shareLink: String
    invitedUsers: [ID!]
  }

  type Post {
    _id: ID
    userID: String
    title: String
    description: String
    likes: Int
    attachments: [String]
    createdAt: String
    comments: [Comment]
  }

  input PostInput {
    id: String
    userID: String
    title: String
    description: String
    attachments: [String!]
    comments: [CommentInput!]
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
    location: Location
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  input eventInput {
    id: String
    name: String
    theme: String
    location: LocationInput
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  type Community {
    _id: ID!
    name: String
    description: String
    objective: String
    initiative: String
    members: [User]
    tags: [String]
    location: Location
    images: [image]
  }

  input communityMemberInput {
    type: expandedRepType!
    objValue: UserInput
    strValue: String
  }

  input CommunityInput {
    id: String
    name: String
    description: String
    objective: String
    initiative: String
    members: [communityMemberInput!]
    tags: [String!]
    location: LocationInput
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

  type Chat {
    _id: ID
    members: [String]
    name: String
    description: String
    createdAt: String
  }

  input ChatInput {
    id: String
    members: [String]
    name: String
    description: String
  }

  type Message {
    _id: ID
    chatID: String
    sentFrom: String
    Message: String
    time: String
    unreadBy: [String]
  }

  input MessageInput {
    id: String
    chatID: String
    sentFrom: String
    message: String
  }

  input AddMemberToChatInput {
    _id: ID
    userID: String
  }

  input joinCoopInput {
    userID: String!
    coopID: String!
  }

  input leaveCoopInput {
    userID: String!
    coopID: String!
  }

  input MarkMessageAsReadInput {
    _id: ID
    userID: String
  }

  type Topic {
    name: String
  }

  type Motive {
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
    getUsers: [User] @auth
    getPosts: [Post] @auth
    getCommunities: [Community] @auth
    getMotives: [Motive] @auth
    getTopics: [Topic] @auth
    getCoops: [Coop!] @auth

    findUserbyID(id: String, expand: String): User @auth
    findPostbyID(postID: String): Post @auth
    findCommunitybyID(id: String): Community @auth
    findCrossUser(email: String): CrossUser @auth
    findCoopbyID(id: String): Coop @auth

    getChatsByUserID(userID: String): [Chat] @auth
    getMessagesByChatID(chatID: String): [Message] @auth

    getNotifications(userID: String!): [Notification] @auth
    getUnreadNotifications(userID: String!): [Notification] @auth

    getToken: JWT @auth

    generatePresignedURL: String! @auth
  }

  """
  TODO: Declare and implement delete routines for all necessary models
  """
  type Mutation {
    createUser(userInput: UserInput!): mutationResponse @auth
    createPost(userInput: PostInput!): mutationResponse @auth
    createCoop(userInput: CoopInput!): mutationResponse @auth
    createCommunity(userInput: CommunityInput!): mutationResponse @auth
    createNotification(userInput: NotificationInput!): mutationResponse @auth
    createChat(userInput: ChatInput!): mutationResponse @auth
    sendMessage(userInput: MessageInput!): mutationResponse @auth
    addMemberToChat(userInput: AddMemberToChatInput!): mutationResponse @auth
    markMessageAsRead(userInput: MarkMessageAsReadInput!): mutationResponse
      @auth

    joinCoop(userInput: joinCoopInput!): mutationResponse @auth
    leaveCoop(userInput: leaveCoopInput!): mutationResponse @auth

    updateUser(userInput: UserInput!): mutationResponse @auth
    updatePost(userInput: PostInput!): mutationResponse @auth
    updateCommunity(userInput: CommunityInput!): mutationResponse @auth
    updateCoop(userInput: CoopInput!): mutationResponse @auth
    updateNotification(userInput: NotificationInput!): mutationResponse @auth
    markNotificationAsRead(notificationID: String): mutationResponse @auth
    markAllNotificationsAsRead(userID: String): mutationResponse @auth
    deleteNotification(notificationID: String): mutationResponse @auth

    setCookieWithToken(token: String!): mutationResponse @verifyToken
    deleteCookieToken: mutationResponse

    deleteFile(fileName: String!): mutationResponse @auth
  }
`;

export default schema;
