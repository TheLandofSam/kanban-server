import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	boardId: { type: ObjectId, ref: models.board.name, required: true },
  listId: { type: ObjectId, ref: models.list.name, required: true},
  taskId: {type: ObjectId, ref: models.task.name, required: true}
});

module.exports = mongoose.model(models.comment.name, schema);