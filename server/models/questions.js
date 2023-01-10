var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionsSchema = new Schema(
    {
        user_id: {type: Schema.Types.ObjectId, ref: 'users', required: true},
        question: {type: String},
        question_order: {type: Number},
        question: {type: String},
        question_value: {type: String},
        question_type: {type: String},
    }
)

// Virtual for book's URL
questionsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/questions/' + this._id;
    });

//Export model
module.exports = mongoose.model('questions', BookSchema);
