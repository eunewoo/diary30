var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionsSchema = new Schema(
    {
        user_id: {type: Schema.Types.ObjectId, ref: 'users', required: true},
        question: {type: String},
        question_selection: {type: Array},
        question_type: {type: String},
        question_answers: {type: Array},
    }
)

// Virtual for book's URL
questionsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/questions/' + this._id;
    });

//Export model
module.exports = mongoose.model('questions', questionsSchema);
