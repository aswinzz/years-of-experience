const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = app => {
  const application = require("../controllers/application.controller.js");
  var router = require("express").Router();

  router.post("/", upload.single('profilePicture'), application.create);
  router.get("/", application.findAll);
  router.get("/:id", application.findOne);
  router.get("/profiles/:id", application.publicProfile);
  router.put("/:id", upload.single('profilePicture'), application.update);
  router.delete("/:id", application.delete);
  router.delete("/", application.deleteAll);

  app.use('/api/candidates', router);
};