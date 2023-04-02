//This file exports a gql object that contains all the
//graphql types and graphql end-points
const { gql } = require("apollo-server-cloud-functions");

module.exports = gql`
  type regenquestNotification {
    userID: String
    notificationID: String
    title: String
    content: String
    image: String
    link: String
    date: String
    isRead: Boolean
    isDeleted: Boolean
  }

  input regenquestNotificationInput {
    userID: String
    notificationID: String
    title: String
    content: String
    image: String
    link: String
    isRead: Boolean
    isDeleted: Boolean
  }

  type Skill {
    skillName: String
    skillLevel: String
  }

  input skillInput {
    skillName: String
    skillLevel: String
  }

  type Badge {
    badgeName: String
    badgeDescription: String
  }

  input badgeInput {
    badgeName: String
    badgeDescription: String
  }

  type Recommendations {
    name: String
    comment: String
  }

  input recommendationsInput {
    name: String
    comment: String
  }

  type regenquestUser {
    userID: String
    name: String
    username: String
    email: String
    password: String
    location: String
    image: String
    motive: String
    biography: String
    topics: [String]
    communities: [String]
    skills: [Skill]
    badges: [Badge]
    currentLevel: Int
    recommendations: [Recommendations]
  }

  input regenquestUserInput {
    userID: String
    name: String
    username: String
    email: String
    password: String
    location: String
    image: String
    motive: String
    biography: String
    topics: [String]
    communities: [String]
    skills: [skillInput]
    badges: [badgeInput]
    currentLevel: Int
    recommendations: [recommendationsInput]
    sessionToken: String
  }

  type regenquestTask {
    taskID: String
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
    taskID: String
    userID: String
    questID: String
    name: String
    description: String
    requirements: [String]
    completionStatus: Boolean
    history: [String]
    sessionToken: String
  }

  type regenquestQuest {
    questID: String
    name: String
    description: String
    objective: String
    initiative: String
    type: String
    duration: String
    location: String
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
    questID: String
    name: String
    description: String
    objective: String
    initiative: String
    type: String
    duration: String
    location: String
    startDate: String
    endDate: String
    requirements: [String]
    members: [String]
    history: [String]
    budget: Float
    tasks: [String]
    sessionToken: String
    hashtags: [String]
  }

  type Comment {
    username: String
    body: String
  }

  input commentInput {
    username: String
    body: String
  }

  type regenquestPost {
    postID: String
    userID: String
    title: String
    description: String
    likes: Int
    attachments: [String]
    createdAt: String
    comments: [Comment]
  }

  input regenquestPostInput {
    postID: String
    userID: String
    title: String
    description: String
    attachments: [String]
    comments: [commentInput]
    sessionToken: String
  }

  type regenquestInventory {
    itemID: String
    userID: String
    taskLink: String
    itemName: String
    createdAt: String
    description: String
    image: String
    history: [String]
  }

  input regenquestInventoryInput {
    itemID: String
    userID: String
    taskLink: String
    itemName: String
    description: String
    image: String
    history: [String]
    sessionToken: String
  }

  type regenquestEvent {
    eventID: String
    name: String
    theme: String
    location: String
    time: String
    description: String
    layer: String
    hashtags: [String]
  }

  input regenquestEventInput {
    eventID: String
    name: String
    theme: String
    location: String
    time: String
    description: String
    layer: String
    hashtags: [String]
    sessionToken: String
  }

  type Image {
    contentType: String
    path: String
    img: String
  }

  input imageInput {
    contentType: String
    path: String
    img: String
  }

  type regenquestCommunity {
    communityID: String
    name: String
    description: String
    members: [String]
    location: String
    image: Image
  }

  input regenquestCommunityInput {
    communityID: String
    name: String
    description: String
    members: [String]
    location: String
    image: imageInput
    sessionToken: String
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
  }

  type regenquestLoggedInUsers {
    userID: String
    sessionToken: String
  }

  input loginUser {
    username: String
    password: String
  }

  type regenquestChat {
    chatID: String
    members: [String]
    name: String
    description: String
    createdAt: String
  }

  input regenquestChatInput {
    chatID: String
    members: [String]
    name: String
    description: String
  }

  type regenquestMessage {
    messageID: String
    chatID: String
    sentFrom: String
    message: String
    time: String
    unreadBy: [String]
  }

  input regenquestMessageInput {
    messageID: String
    chatID: String
    sentFrom: String
    message: String
  }

  input addMemberToChatInput {
    chatID: String
    userID: String
  }

  input markMessageAsReadInput {
    messageID: String
    userID: String
  }

  type Query {
    getUsers: [regenquestUser]
    getTasks: [regenquestTask]
    getQuests: [regenquestQuest]
    getPosts: [regenquestPost]
    getItems: [regenquestInventory]
    getEvents: [regenquestEvent]
    getCommunities: [regenquestCommunity]
    getGenres: regenquestGenres

    findUserbyID(userID: String): regenquestUser
    findTaskbyID(taskID: String): regenquestTask
    findQuestbyID(questID: String): regenquestQuest
    findPostbyID(postID: String): regenquestPost
    findInventoryItembyID(itemID: String): regenquestInventory
    findEventbyID(eventID: String): regenquestEvent
    findCommunitybyID(communityID: String): regenquestCommunity

    getChatsByUserID(userID: String): [regenquestChat]
    getMessagesByChatID(chatID: String): [regenquestMessage]

    loginRegenquestUser(
      username: String
      password: String
    ): regenquestLoggedInUsers
    logoutRegenquestUser(sessionToken: String): mutationResponse

    getNotifications(userID: String): [regenquestNotification]
    getUnreadNotifications(userID: String): [regenquestNotification]
    markNotificationAsRead(notificationID: String): mutationResponse
    markAllNotificationsAsRead(userID: String): mutationResponse
    deleteNotification(notificationID: String): mutationResponse
  }

  type Mutation {
    createRegenquestUser(userInput: regenquestUserInput): mutationResponse
    createRegenquestTask(userInput: regenquestTaskInput): mutationResponse
    createRegenquestQuest(userInput: regenquestQuestInput): mutationResponse
    createRegenquestPost(userInput: regenquestPostInput): mutationResponse
    createRegenquestInventory(
      userInput: regenquestInventoryInput
    ): mutationResponse
    createRegenquestEvent(userInput: regenquestEventInput): mutationResponse
    createRegenquestCommunity(
      userInput: regenquestCommunityInput
    ): mutationResponse
    createRegenquestNotification(
      userInput: regenquestNotificationInput
    ): mutationResponse

    createRegenquestChat(userInput: regenquestChatInput): mutationResponse
    sendRegenquestMessage(userInput: regenquestMessageInput): mutationResponse
    addMemberToChat(userInput: addMemberToChatInput): mutationResponse
    markMessageAsRead(userInput: markMessageAsReadInput): mutationResponse

    updateRegenquestUser(userInput: regenquestUserInput): mutationResponse
    updateRegenquestTask(userInput: regenquestTaskInput): mutationResponse
    updateRegenquestQuest(userInput: regenquestQuestInput): mutationResponse
    updateRegenquestPost(userInput: regenquestPostInput): mutationResponse
    updateRegenquestInventory(
      userInput: regenquestInventoryInput
    ): mutationResponse
    updateRegenquestEvent(userInput: regenquestEventInput): mutationResponse
    updateRegenquestCommunity(
      userInput: regenquestCommunityInput
    ): mutationResponse
    updateRegenquestGenres(userInput: regenquestGenresInput): mutationResponse
    updateRegenquestNotification(
      userInput: regenquestNotificationInput
    ): mutationResponse
  }
`;