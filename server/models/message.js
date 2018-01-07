var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var MessageSchema = new Schema({
	name: String,
	email: String,
	subject: String
	// content: String
});
mongoose.model('Message', MessageSchema);
