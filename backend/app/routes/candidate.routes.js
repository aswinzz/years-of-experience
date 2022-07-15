const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = app => {
  const candidates = require("../controllers/candidate.controller.js");
  var router = require("express").Router();

  router.post("/", upload.single('profilePicture'), candidates.create);
  router.get("/", candidates.findAll);
  router.get("/:id", candidates.findOne);
  router.put("/:id", candidates.update);
  router.delete("/:id", candidates.delete);
  router.delete("/", candidates.deleteAll);

  app.use('/api/candidates', router);
};