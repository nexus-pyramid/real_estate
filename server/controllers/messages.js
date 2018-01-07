var mongoose = require('mongoose');
var Message = mongoose.model('Message');

function messagesController(){

	this.create = function(req, res){
		var newMessage = new Message(req.body);
		newMessage.save(function(err, results){
			if(err){
				res.sendStatus(400);
			} else {
				// console.log('aye');
				res.json(results);
			}
		})
	}
}
module.exports = new messagesController();
