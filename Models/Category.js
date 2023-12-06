const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({

	categoryName: {
		type: String,
		required: true
	},
	categoryImg: {
		type: String,
	},
	categoryType: {
		type: String,
		enum: ["ScheduledService", "ValueAddedService", "MechanicalRepair", "CuratedCustomService", "Accessories", "24x7Services"]
	},
}, { timestamp: true })
module.exports = mongoose.model("category", CategorySchema)
