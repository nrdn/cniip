var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var userSchema = new Schema({
		login: String,
		password: String,
		email: String,
		status: {type: String, default: 'User'},
		date: {type: Date, default: Date.now},
});

var publishSchema = new Schema({
	title: String,
	description: String,
});

var authorSchema = new Schema({
	name: String,
	photo: String,
	publishes: [{ type: Schema.Types.ObjectId, ref: 'Publish' }]
});

var workSchema = new Schema({
	title: String,
	description: String,
	category: String
});

var eventSchema = new Schema({
	title: String,
	description: String,
	category: String
});

var pressSchema = new Schema({
	author: String,
	description: String,
	link: String
});

var licenseSchema = new Schema({
	title: String,
	image: String
});


module.exports.User = mongoose.model('User', userSchema);
module.exports.Publish = mongoose.model('Publish', publishSchema);
module.exports.Author = mongoose.model('Author', authorSchema);
module.exports.Work = mongoose.model('Work', workSchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.Press = mongoose.model('Press', pressSchema);
module.exports.License = mongoose.model('License', licenseSchema);