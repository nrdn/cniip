var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var userSchema = new Schema({
		login: String,
		password: String,
		email: String,
		status: {type: String, default: 'User'},
		exercises: [{
			exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
			status: Boolean
		}],
		date: {type: Date, default: Date.now},
});



module.exports.User = mongoose.model('User', userSchema);