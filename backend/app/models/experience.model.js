module.exports = (sequelize, Sequelize) => {
	const Experience = sequelize.define("experience", {
		candidateId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'candidates',
                key: 'id'
            }
        },
        title: {
			type: Sequelize.STRING
		},
        company: {
			type: Sequelize.STRING
		},
        companyLogo: {
			type: Sequelize.STRING
		},
        description: {
			type: Sequelize.TEXT('tiny')
		},
        start: {
            type: Sequelize.DATEONLY
        },
        end: {
            type: Sequelize.DATEONLY
        },
        current: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
	});

	return Experience;
};