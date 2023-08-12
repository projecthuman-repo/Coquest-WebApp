const User = require('../models/regenquestUser')
const Task = require('../models/regenquestTask')
const Quest = require('../models/regenquestQuest')
const Post = require('../models/regenquestPost')
const Inventory = require('../models/regenquestInventory')
const Event = require('../models/regenquestEvent')
const Community = require('../models/regenquestCommunity')
const mongoose = require('mongoose');

module.exports = {
    Query: {

        async getUsers(){
            return await User.find()
        },

        async getTasks(){
            return await Task.find()
        },

        async getQuests(){
            return await Quest.find()
        },

        async getPosts(){
            return await Post.find()
        },

        async getItems(){
            return await Inventory.find()
        },

        async getEvents(){
            return await Event.find()
        },

        async getCommunities(){
            return await Community.find()
        },

        async findUserbyID(parent, {userID}, context, info){

            result = await User.findOne({userID:userID})
            return result
        },

        async findTaskbyID(parent, {taskID}, context, info){

            result = await Task.findOne({taskID:taskID})
            return result
        },

        async findQuestbyID(parent, {questID}, context, info){

            result = await Quest.findOne({questID:questID})
            return result
        },

        async findPostbyID(parent, {postID}, context, info){

            result = await Post.findOne({postID:postID})
            return result
        },

        async findInventoryItembyID(parent, {itemID}, context, info){

            result = await Inventory.findOne({itemID:itemID})
            return result
        },

        async findEventbyID(parent, {eventID}, context, info){

            result = await Event.findOne({eventID:eventID})
            return result
        },

        async findCommunitybyID(parent, {communityID}, context, info){
            
            result = await Community.findOne({communityID:communityID})
            return result
        }
    },
    Mutation: {

        //resolver for create regenquest user
        async createRegenquestUser(parent, {userInput: {userID, motive, biography, topics, communities, skills, badges, currentLevel}}, context, info){
            const newUser = new User ({
                userID: userID ? userID:null,
                motive: motive ? motive:null,
                biography: biography ? biography:null,
                topics: topics ? topics:null,
                communities: communities ? communities:null,
                skills: skills ? skills:null,
                badges: badges ? badges:null,
                currentLevel: currentLevel ? currentLevel:-1
            });

            const res = await newUser.save()

            return {code: 0, response: "successful"}

        },
        
        //resolver for create regenquest task
        async createRegequestTask(parent, {userInput: {taskID, userID, name, description, requirements, completionStatus, history}}, context, info){
            const newTask = new Task({
                taskID: taskID ? taskID:null,
                userID: userID ? userID:null,
                createdAt: new Date().toLocaleString(),
                name: name ? name:null,
                description: description ? description:null,
                requirements: requirements ? requirements:null,
                completionStatus: completionStatus ? completionStatus:false,
                history: history ? history:null
            });

            const res = await newTask.save()

            return {code:0, response: "successful"}
        },

        //resolver for create regenquest quest
        async createRegenquestQuest(parent, {userInput: {questID, name, type, duration, location, startDate, endDate, requirements, members}}, context, info){
            const newQuest = new Quest({
                questID: questID ? questID:null,
                name: name ? name:null,
                type: type ? type:null,
                duration: duration ? duration:null,
                location: location ? location:null,
                startDate: startDate ? startDate:null,
                endDate: endDate ? endDate:null,
                requirements: requirements ? requirements:null,
                members: members ? members:null
            });

            const res = await newQuest.save()

            return {code:0, response: "successful"}
        },

        //resolver for create regenquest post
        async createRegenquestPost(parent, {userInput: {postID, userID, title, description, attachments, comments}}, context, info){
            const newPost = new Post({
                postID: postID ? postID:null,
                userID: userID ? userID:null,
                title: title ? title:null,
                description: description ? description:null,
                likes: 0,
                attachments: attachments ? attachments:null,
                createdAt: new Date().toLocaleString(),
                comments: comments ? comments:null
            });

            const res = await newPost.save()

            return {code:0, response: "successful"}
        },

        //resolver for create regenquest inventory
        async createRegenquestInventory(parent, {userInput: {itemID, userID, taskLink, itemName, description, image, history}}, context, info){
            const newInventory = new Inventory({
                itemID: itemID ? itemID:null,
                userID: userID ? userID:null,
                taskLink: taskLink ? taskLink:null,
                itemName: itemName ? itemName:null,
                createdAt: new Date().toLocaleString(),
                description: description ? description:null,
                image: image ? image:null,
                history: history ? history:null
            });

            const res = await newInventory.save()

            return {code:0, response: "successful"}
        },

        //resolver for create regenquest event
        async createRegenquestEvent(parent, {userInput: {eventID, name, theme, location, time, description, layer, hashtags}}, context, info){
            const newEvent = new Event({
                eventID: eventID ? eventID:null,
                name: name ? name:null,
                theme: theme ? theme:null,
                location: location ? location:null,
                time: time ? time:null,
                description: description ? description:null,
                layer: layer ? layer:null,
                hashtags: hashtags ? hashtags:null
            });

            const res = await newEvent.save()

            return {code:0, response: "successful"}
        },

        //resolver for create regenquest community
        async createRegenquestCommunity(parent, {userInput: {communityID, name, description, members, theme}}, context, info){
            const newCommunity = new Community({
                communityID: communityID ? communityID:null,
                name: name ? name:null,
                description: description ? description:null,
                members: members ? members:null,
                theme: theme ? theme:null
            });

            const res = await newCommunity.save()

            return {code:0, response: "successful"}
        },

        //update user
        async updateRegenquestUser(parent, {userInput: {userID, motive, biography, topics, communities, skills, badges, currentLevel}}, context, info){
            
            if (!userID){return {code: 1, response: "no userID provided"}}

            const userList = await User.count({userID:userID})
            if (userList === 0){return {code:2 , response: "User not found!"}}

            const updateUser = {userID: userID}

            if (motive){updateUser.motive = motive}
            if (biography){updateUser.biography = biography}
            if (topics){updateUser.topics = topics}
            if (communities){updateUser.communities = communities}
            if (skills){updateUser.skills = skills}
            if (badges){updateUser.badges = badges}
            if (currentLevel){updateUser.currentLevel = currentLevel}

            const res = await User.updateOne({userID:userID},updateUser)

            return {code:0, response: "successful"}
        },

        //update task
        async updateRegenquestTask(parent, {userInput: {taskID, userID, name, description, requirements, completionStatus, history}}, context, info){
            if (!taskID){return {code: 1, response: "no taskID provided"}}

            const taskList = await Task.count({taskID:taskID})
            if (taskList === 0){return {code: 2, response: "Task not found!"}}

            const updateTask = {taskID:taskID}

            if (userID){updateTask.userID = userID}
            if (name){updateTask.name = name}
            if (description){updateTask.description = description}
            if (requirements){updateTask.requirements = requirements}
            if (completionStatus){updateTask.completionStatus = completionStatus}
            if (history){updateTask.history = history}

            const res = await Task.updateOne({taskID:taskID},updateTask)

            return {code:0, response: "successful"}

        },

        //update quest
        async updateRegenquestQuest(parent, {userInput: {questID, name, type, duration, location, startDate, endDate, requirements, members}}, context, info){
            if (!questID){return {code: 1, response: "no questID provided"}}

            const questList = await Quest.count({questID:questID})
            if (questList === 0){return {code: 2, response: "Quest not found!"}}

            const updateQuest = {questID:questID}

            if (name){updateQuest.name = name}
            if (type){updateQuest.type = type}
            if (duration){updateQuest.duration = duration}
            if (location){updateQuest.location = location}
            if (startDate){updateQuest.startDate = startDate}
            if (endDate){updateQuest.endDate = endDate}
            if (requirements){updateQuest.requirements = requirements}
            if (members){updateQuest.members = members}

            const res = await Quest.updateOne({questID:questID}, updateQuest)

            return {code:0, response: "successful"}
        },

        //update post
        async updateRegenquestPost(parent, {userInput: {postID, userID, title, description, attachments, comments}}, context, info){
            if (!postID){return {code: 1, response: "no postID provided"}}

            const postList = await Post.count({postID:postID})
            if (postList === 0){return {code: 2, response: "Post not found!"}}

            const updatePost = {postID:postID}

            if (userId){updatePost.userID = userID}
            if (title){updatePost.title = title}
            if (description){updatePost.description = description}
            if (attachments){updatePost.attachments = attachments}
            if (comments){updatePost.comments = comments}

            const res = await Post.updateOne({postID:postID},updatePost)

            return {code:0, response: "successful"}
        },

        //update inventory
        async updateRegenquestInventory(parent, {userInput: {itemID, userID, taskLink, itemName, description, image, history}}, context, info){
            if (!itemID){return {code: 1, response: "no itemID provided"}}

            const itemList = await Inventory.count({itemID:itemID})
            if (itemList === 0){return {code: 2, response: "Item not found!"}}

            const updateItem = {itemID:itemID}

            if (userID){updateItem.userID = userID}
            if (taskLink){updateItem.taskLink = taskLink}
            if (itemName){updateItem.itemName = itemName}
            if (description){updateItem.description = description}
            if (image){updateItem.image = image}
            if (history){updateItem.history = history}

            const res = await Inventory.updateOne({itemID:itemID},updateItem)

            return {code:0, response: "successful"}
        },

        //update event
        async updateRegenquestEvent(parent, {userInput: {eventID, name, theme, location, time, description, layer, hashtags}}, context, info){
            if (!eventID){return {code: 1, response: "no eventID provided"}}

            const eventList = await Event.count({eventID:eventID})
            if (eventList === 0){return {code: 2, response: "Event not found!"}}

            const updateEvent = {eventID:eventID}

            if (name){updateEvent.name = name}
            if (theme){updateEvent.theme = theme}
            if (location){updateEvent.location = location}
            if (time){updateEvent.time = time}
            if (description){updateEvent.description = description}
            if (layer){updateEvent.layer = layer}
            if (hashtags){updateEvent.hashtags = hashtags}

            const res = await Event.updateOne({eventID:eventID},updateEvent)

            return {code:0, response: "successful"}
        },

        //update community
        async updateRegenquestCommunity(parent, {userInput: {communityID, name, description, members, theme}}, context, info){
            if (!communityID){return {code: 1, response: "no communityID provided"}}

            const communityList = await Community.count({communityID:communityID})
            if (communityList === 0){return {code: 2, response: "Community not found!"}}

            const updateCommunity = {communityID:communityID}

            if (name){updateCommunity.name = name}
            if (description){updateCommunity.description = description}
            if (members){updateCommunity.members = members}
            if (theme){updateCommunity.theme = theme}

            const res = await Community.updateOne({communityID:communityID}, updateCommunity)

            return {code:0, response: "successful"}
        }
    }
}