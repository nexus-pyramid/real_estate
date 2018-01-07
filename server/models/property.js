var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var PropertySchema = new Schema({
	price: Number,
	zip_code: String,
	property_type: String,
	city: String,
	state: String,
	detail: String,
	stories: String,
	garage_capacity: Number,
	acres: Number,
	views: String,
	street_address: String,
    beds: Number,
	baths: Number,
	sqft: Number,
	location: [{type: [Number]}], // [Long, Lat]
	image: String
});
PropertySchema.index({location: '2d'});
mongoose.model('Property', PropertySchema);
