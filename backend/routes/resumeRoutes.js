const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const upload = require("../middleware/upload");

// Create a new resume
router.post("/resumes", upload.single("file"), resumeController.createResume);

// View the resume (preview) in the browser
router.get("/resumes/:email/preview", resumeController.viewResume);

// Download the resume as an attachment
router.get("/resumes/:email/download", resumeController.downloadResume);

// Update an existing resume
router.put(
  "/resumes/:email",
  upload.single("file"),
  resumeController.updateResume
);

// Delete a resume
router.delete("/resumes/:id", resumeController.deleteResume);

// Get all resumes
router.get("/resumes", resumeController.getAllResumes);

module.exports = router;
