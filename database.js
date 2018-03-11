const mongoose = require('mongoose')
mongoose.connect(config.dbUri)
const { Schema } = mongoose

const positionSchema = new Schema({
	position: String,
	gradeSpecific: {
		type: Number,
		default: 0
	},
	sectionSpecific: {
		type: String,
		default: ""
	},
	houseSpecific: {
		type: String,
		default: ""
	},
	candidates: [
		{
			candidateId: Schema.Types.ObjectId,
			votes: {
				type: Number,
				default: 0
			}
		}
	]
})

const candidateSchema = new Schema({
	name: String,
	grade: Number,
	section: String,
	house: String,
	tagline: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: ""
	},
	picture: String
})

module.exports = {
	Candidate: mongoose.model('Candidate', candidateSchema),
	Position: mongoose.model('Position', positionSchema)
}