const { gql } = require('apollo-server-cloud-functions');

module.exports = gql`
type Skill {
    skillName: String,
    skillLevel: String
}

input skillInput {
    skillName: String,
    skillLevel: String
}

type Badge {
    badgeName: String,
    badgeDescription: String
}

input badgeInput {
    badgeName: String,
    badgeDescription: String
}

type regenquestUser {
    userID: String,
    motive: String,
    biography: String,
    topics: [String],
    communities: [String],
    skills: [Skill],
    badges: [Badge],
    currentLevel: Int
}

input regenquestUserInput {
    userID: String,
    motive: String,
    biography: String,
    topics: [String],
    communities: [String],
    skills: [skillInput],
    badges: [badgeInput],
    currentLevel: Int
}

type regenquestTask {
    taskID: String,
    userID: String,
    createdAt: String,
    name: String,
    description: String,
    requirements: [String]
    completionStatus: Boolean,
    history: [String]
}

input regenquestTaskInput {
    taskID: String,
    userID: String,
    name: String,
    description: String,
    requirements: [String]
    completionStatus: Boolean,
    history: [String]
}

type regenquestQuest {
    questID: String,
    name: String,
    type: String,
    duration: String,
    location: String,
    startDate: String,
    endDate: String,
    requirements: [String],
    members: [String]
}

input regenquestQuestInput {
    questID: String,
    name: String,
    type: String,
    duration: String,
    location: String,
    startDate: String,
    endDate: String,
    requirements: [String],
    members: [String]
}

type Comment {
    username: String,
    body: String
}

input commentInput {
    username: String,
    body: String
}

type regenquestPost {
    postID: String,
    userID: String,
    title: String,
    description: String,
    likes: Int,
    attachments: [String],
    createdAt: String,
    comments: [Comment]
}

input regenquestPostInput {
    postID: String,
    userID: String,
    title: String,
    description: String,
    attachments: [String],
    comments: [commentInput]
}

type regenquestInventory {
    itemID: String,
    userID: String,
    taskLink: String,
    itemName: String,
    createdAt: String,
    description: String,
    image: String,
    history: [String]
}

input regenquestInventoryInput {
    itemID: String,
    userID: String,
    taskLink: String,
    itemName: String,
    description: String,
    image: String,
    history: [String]
}

type regenquestEvent {
    eventID: String,
    name: String,
    theme: String,
    location: String,
    time: String,
    description: String,
    layer: String,
    hashtags: [String]
}

input regenquestEventInput {
    eventID: String,
    name: String,
    theme: String,
    location: String,
    time: String,
    description: String,
    layer: String,
    hashtags: [String]
}

type regenquestCommunity {
    communityID: String,
    name: String,
    description: String,
    members: [String],
    theme: String
}

input regenquestCommunityInput {
    communityID: String,
    name: String,
    description: String,
    members: [String],
    theme: String
}

type mutationResponse {
    code: Int
    response: String
}


type Query {
    getUsers: [regenquestUser]
    getTasks: [regenquestTask]
    getQuests: [regenquestQuest]
    getPosts: [regenquestPost]
    getItems: [regenquestInventory]
    getEvents: [regenquestEvent]
    getCommunities: [regenquestCommunity]
    
    findUserbyID(userID: String): regenquestUser
    findTaskbyID(taskID: String): regenquestTask
    findQuestbyID(questID: String): regenquestQuest
    findPostbyID(postID: String): regenquestPost
    findInventoryItembyID(itemID: String): regenquestInventory
    findEventbyID(eventID: String): regenquestEvent
    findCommunitybyID(communityID: String): regenquestCommunity
}

type Mutation {
    createRegenquestUser(userInput: regenquestUserInput): mutationResponse
    createRegequestTask(userInput: regenquestTaskInput): mutationResponse
    createRegenquestQuest(userInput: regenquestQuestInput): mutationResponse
    createRegenquestPost(userInput: regenquestPostInput): mutationResponse
    createRegenquestInventory(userInput: regenquestInventoryInput): mutationResponse
    createRegenquestEvent(userInput: regenquestEventInput): mutationResponse
    createRegenquestCommunity(userInput: regenquestCommunityInput): mutationResponse

    updateRegenquestUser(userInput: regenquestUserInput): mutationResponse
    updateRegenquestTask(userInput: regenquestTaskInput): mutationResponse
    updateRegenquestQuest(userInput: regenquestQuestInput): mutationResponse
    updateRegenquestPost(userInput: regenquestPostInput): mutationResponse
    updateRegenquestInventory(userInput: regenquestInventoryInput): mutationResponse
    updateRegenquestEvent(userInput: regenquestEventInput): mutationResponse
    updateRegenquestCommunity(userInput: regenquestCommunityInput): mutationResponse
}
`