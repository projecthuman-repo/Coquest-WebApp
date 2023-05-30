const {model, Schema} = require('mongoose');

//questID: unique id of the quest
//name: name of the project/program/co-op
//type: is it a project, program, or co-op?
//duration: duration of the quest
//location: location of the quest
//startDate: start date of the quest
//endDate: end date of the quest
//reuqirements: requirements of the quest
//members: list of userID belonging to each member
const regenquestQuestSchema = new Schema({
    questID: String,
    name: String,
    type: String,
    duration: String,
    location: String,
    startDate: String,
    endDate: String,
    requirements: [String],
    members: [String]
});

module.exports = model('regenquestQuest', regenquestQuestSchema);