var mongoose = require('mongoose');
var Property = mongoose.model('Property');
// var home = mongoose.model('properties')
function propertiesController(){

	this.getHomes = function(req, res){
		// console.log(Property)
		console.log('this is req.body')
		console.log(req.body)
		Property.find({}).exec(function(data,err){
			console.log('returned data')
			 console.log(data);
			if(err){
				console.log(err);
				res.json(err);
			} else {
				res.json(data);
			}
		})
	}
	this.addHome = function(req, res){
		var newProperty = new Property(req.body)
		newProperty.save(function(err,data){
			if(err){
				console.log(err);
			} else {
				res.json(data)
			}
		})
	}
}
module.exports = new propertiesController();
