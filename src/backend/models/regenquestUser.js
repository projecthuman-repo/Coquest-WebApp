const {model, Schema} = require('mongoose');


//userID: a unique ID generated during registeration, used to connect user data to the user
//motive: the motive of the user for joining regenquest, user will pick from a list (volunteer, creating project, ...)
//biography: a biograph of the user
//topics: a list of topics (Strings) that the user is interested in.
//communities: the list of communities that the user has joined.
//skills: A list of skills that the user has, along with the skill level, (Basic, intermediate, Advanced)
//Badges: A list of all the badges the user has earned
//currentLevel: placeholder for user level, will be later calculated 
const regenquestUserSchema = new Schema({
    userID: String,
    motive: String,
    biography: String,
    topics: [String],
    communities: [String],
    skills: [{skillName: String, skillLevel: String}],
    badges: [{badgeName: String, badgeDescription: String}],
    currentLevel: Number
});

module.exports = model('regenquestUser', regenquestUserSchema);