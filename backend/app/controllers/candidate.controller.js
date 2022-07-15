const db = require("../models");
const Candidate = db.candidates;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  console.log(req.file);
  const candidate = {
    name: req.body.name,
    profilePictureType: req.file.mimetype,
    profilePictureName: req.file.originalname,
    profilePictureData: req.file.buffer, 
  };
  Candidate.create(candidate)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate."
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    await Candidate.findAll()
  .then(candidates => {
    console.log(candidates);
   candidates.map(candidate => {
      const candidateImage = candidate.profilePictureData.toString('base64')
      candidate['profilePictureData'] = candidateImage
     });
    return candidates;
   })
   .then(candidates => {
   return res.status(200).json({candidates: candidates})
  })
  } catch (error) {
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