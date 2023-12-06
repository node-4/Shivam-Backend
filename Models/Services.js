const mongoose = require('mongoose');
const servicesSchema = new mongoose.Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: "category"
	},
	subCategory: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "subCatgory"
	},
	serviceName: {
		type: String,
	},
	serviceImg: {
		type: String,
	},
	desc: {
		type: Array
	},
	include: [{
		image: {
			type: String,
		},
		name: {
			type: String,
		},
		upto: {
			type: String,
		},
	}],
	additionalService: {
		type: Array
	},
	price: {
		type: String,
	},
	discount: {
		type: String,
		default: 0
	},
	discountActive: {
		type: String,
		default: false
	},
	faq: [{
		question: {
			type: String,
		},
		answer: {
			type: String,
		},
	}],
	ratings: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	}],
}, { timestamps: true })
module.exports = mongoose.model("Services", servicesSchema)