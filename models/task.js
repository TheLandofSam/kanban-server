import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	//description removed in favor of one field: name
	created: { type: Number, default: Date.now() },
	// Relations
	boardId: { type: ObjectId, ref: models.board.name, required: true },
	listId: { type: ObjectId, ref: models.list.name},
	comments: [{ type: ObjectId, ref: models.comment.name}]
});
schema.pre('remove', function (next){
  Comments.find({taskId: this._id}).remove().exec(next)
})

module.exports = mongoose.model(models.task.name, schema);