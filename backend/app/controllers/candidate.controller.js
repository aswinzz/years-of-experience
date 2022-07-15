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
      const candidateImage = candidate.profilePictureData.toString('base64')
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

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};