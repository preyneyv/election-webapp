const { Candidate, Position } = include('database')

exports.getCandidates = (req, res) => {
	let { grade, section, house } = req.get

	Position.find()
	.and([
		{ $or: [ {gradeSpecific: 0}, {gradeSpecific: grade} ] },
		{ $or: [ {sectionSpecific: ""}, {sectionSpecific: section} ] },
		{ $or: [ {houseSpecific: ""}, {houseSpecific: house} ] }
	])
	.then((positions) => {
		// Send positions, along with all candidates
		Candidate.find({})
		.then(candidates => res.send({success: true, positions, candidates}))
	})
	.catch(e => {
		// OH NO! Error occured
		res.status(500).send({success:false, message: "unexpected"})
		throw e
	})
}