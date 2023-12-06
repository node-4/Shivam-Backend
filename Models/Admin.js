const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})
module.exports = mongoose.model('admin', AdminSchema)
