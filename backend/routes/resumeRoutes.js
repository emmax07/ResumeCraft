const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const upload = require("../middleware/upload");

router.post("/resumes", upload.single("file"), resumeController.createResume);

router.get("/resumes/:id/preview", resumeController.viewResume);

router.get("/resumes/:id/download", resumeController.downloadResume);

router.put(
  "/resumes/:email",
  upload.single("file"),
  resumeController.updateResume
);

router.delete("/resumes/:id", resumeController.deleteResume);

router.get("/resumes", resumeController.getAllResumes);

module.exports = router;
