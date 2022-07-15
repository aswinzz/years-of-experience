module.exports = (sequelize, Sequelize) => {
	const Candidate = sequelize.define("candidate", {
		name: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.ENUM("private", "public"),
			defaultValue: "private",
		},
		profilePictureType: Sequelize.STRING,
		profilePictureName: Sequelize.STRING,
		profilePictureData: Sequelize.BLOB('long')
	});

	return Candidate;
};