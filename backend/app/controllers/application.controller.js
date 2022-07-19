const db = require("../models");
const Candidate = db.candidates;
const Experience = db.experiences;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  console.log(req.body);
  const candidate = {
    name: req.body.name,
    status: req.body.status || 'private',
    profilePictureType: req.file.mimetype,
    profilePictureName: req.file.originalname,
    profilePictureData: req.file.buffer, 
  };
  const candidateRecord = await Candidate.create(candidate);
  const workExperiences = [];
  req.body.experiences.map(experience => {
    workExperiences.push({
      candidateId: candidateRecord.id,
      title: experience.title,
      company: experience.company,
      companyLogo: experience.companyLogo,
      description: experience.description,
      start: new Date(experience.start),
      end: new Date(experience.end),
      current: experience.current || false
    });
  });
  Experience.bulkCreate(workExperiences);

  res.send(candidateRecord);
};

exports.findAll = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Experience
        },
       ],
      });
    candidates.map(candidate => {
      const candidateImage = candidate.profilePictureData?.toString('base64')
      candidate['profilePictureData'] = candidateImage
    });

    return res.status(200).json({candidates: candidates});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.mesage);
  }
};

exports.findOne = (req, res) => {
  
};

exports.publicProfile = async (req, res) => {
  const candidate = await Candidate.findOne({
    where: { id: req.params.id, status: "public" },
    include: [
      {
        model: Experience
      },
    ]
  });

  if (!candidate) {
    return res.status(404).send("Profile Not Found");
  }

  const candidateImage = candidate.profilePictureData.toString('base64')
  candidate['profilePictureData'] = candidateImage

  res.status(200).json({candidate: candidate});
}

exports.update = async (req, res) => {
  const candidate = await Candidate.findByPk(req.params.id);
  if (!candidate) {
    return res.status(404).send("Candidate Profile Not Found");;
  }

  await Candidate.update(
    {
      name: req.body.name,
      profilePictureType: req.file.mimetype,
      profilePictureName: req.file.originalname,
      profilePictureData: req.file.buffer,
    },
    { where: { id: req.params.id }}
  )

  await Experience.destroy({
    where: {
      candidateId: req.params.id
    },
  });

  const workExperiences = [];
  req.body.experiences.map(experience => {
    workExperiences.push({
      candidateId: candidate.id,
      title: experience.title,
      company: experience.company,
      companyLogo: experience.companyLogo,
      description: experience.description,
      start: new Date(experience.start),
      end: experience.end ? new Date(experience.end) : null,
      current: experience.current === 'true' || false
    });
  });
  Experience.bulkCreate(workExperiences);
  const updatedCandidate = await Candidate.findByPk(req.params.id);

  res.send(updatedCandidate);
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};