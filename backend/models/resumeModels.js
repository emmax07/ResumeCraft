const db = require("../config/db");

const create = (user_email, filename, filepath, filedata, callback) => {
  const query =
    "INSERT INTO resumes (user_email, filename, filepath, filedata) VALUES (?, ?, ?, ?)";
  db.query(query, [user_email, filename, filepath, filedata], callback);
};

const findByEmail = (email, callback) => {
  const query = "SELECT * FROM resumes WHERE user_email = ?";
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0)
      return callback(err || new Error("Not found"), null);
    callback(null, results[0]);
  });
};

const findAll = (callback) => {
  const query = "SELECT * FROM resumes";
  db.query(query, callback);
};

const update = (user_email, filename, filepath, filedata, callback) => {
  const query =
    "UPDATE resumes SET filename = ?, filepath = ?, filedata = ? WHERE user_email = ?";
  db.query(query, [filename, filepath, filedata, user_email], callback);
};

const findById = (id, callback) => {
  const query = "SELECT * FROM resumes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err || results.length === 0)
      return callback(err || new Error("Not found"), null);
    callback(null, results[0]);
  });
};

const deleteById = (id, callback) => {
  const query = "DELETE FROM resumes WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  create,
  findByEmail,
  findAll,
  update,
  findById,
  deleteById,
};
