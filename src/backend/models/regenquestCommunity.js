const {model, Schema} = require('mongoose');

//communityID: unique id of the community
//name: name of the community
//description: of the community
//members: list of userID of people in the community
//theme: theme of the community
const regenquestCommunitySchema = new Schema({
    communityID: String,
    name: String,
    description: String,
    members: [String],
    theme: String
});

module.exports = model('regenquestCommunity', regenquestCommunitySchema);