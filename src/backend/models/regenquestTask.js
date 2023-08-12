const {model, Schema} = require('mongoose');

//taskID: unique id of the task
//userID: Id of the user that this task currently belongs to
//createdAt: time and date the task was created
//name: name of the task
//description: description of the task
//requirements: list of requirements
//completionStatus: true if task is completed, false if task is not completed
//history: list of userID's of the previous users that worked on this task
const regenquestTaskSchema = new Schema({
    taskID: String,
    userID: String,
    createdAt: String,
    name: String,
    description: String,
    requirements: [String],
    completionStatus: Boolean,
    history: [String]
});

module.exports = model('regenquestTask', regenquestTaskSchema);