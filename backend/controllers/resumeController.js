const fs = require("fs");
const Resume = require("../models/resumeModels");

const createResume = (req, res) => {
  const { userEmail } = req.body;
  const file = req.file;

  if (!userEmail || !file) {
    return res.status(400).json({ message: "Missing userEmail or file" });
  }

  const filedata = fs.readFileSync(file.path);

  Resume.create(
    userEmail,
    file.originalname,
    file.path,
    filedata,
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error saving resume", error: err });
      res.status(201).json({ message: "Resume uploaded", id: result.insertId });
    }
  );
};

// View Resume: Open the resume in the browser (preview)
const viewResume = (req, res) => {
  const resumeId = req.params.id;

  Resume.findById(resumeId, (err, resume) => {
    if (err || !resume)
      return res.status(404).json({ message: "Resume not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${resume.filename}"`
    );
    res.send(resume.filedata);
  });
};

// Download Resume: Download the resume with an attachment header
const downloadResume = (req, res) => {
  const resumeId = req.params.id;

  Resume.findById(resumeId, (err, resume) => {
    if (err || !resume)
      return res.status(404).json({ message: "Resume not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.filename}"`
    );
    res.send(resume.filedata);
  });
};

// Delete Resume:
const deleteResume = (req, res) => {
  const resumeId = req.params.id;

  Resume.findById(resumeId, (err, resume) => {
    if (err || !resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    fs.unlink(resume.filepath, (unlinkErr) => {
      if (unlinkErr) {
        return res.status(500).json({ message: "Error deleting file" });
      }

      Resume.deleteById(resumeId, (deleteErr) => {
        if (deleteErr) {
          return res.status(500).json({ message: "Error deleting from DB" });
        }

        res.json({ message: "Resume deleted successfully" });
      });
    });
  });
};

const updateResume = (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const filedata = fs.readFileSync(file.path);

  Resume.update(
    req.params.email,
    file.originalname,
    file.path,
    filedata,
    (err) => {
      if (err) return res.status(500).json({ message: "Update failed" });
      res.json({ message: "Resume updated" });
    }
  );
};

const getAllResumes = (req, res) => {
  Resume.findAll((err, resumes) => {
    if (err) return res.status(500).json({ message: "Error fetching resumes" });
    res.json(resumes);
  });
};

module.exports = {
  createResume,
  downloadResume,
  viewResume,
  deleteResume,
  updateResume,
  getAllResumes,
};
