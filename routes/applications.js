var express = require('express');
var router = express.Router();
var database = require('../libs/database');

router.get('/get-applications', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({status: "NOK", error: "Invalid Authorization."});
  }

  const applications = await database.getApplications();
  res.json({status: "OK", data: applications});
});

router.post('/add-application', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({status: "NOK", error: "Invalid Authorization."});
  }

  const newApp = req.body;
  await database.insertDocument(newApp, "Applications");
  res.json({status: "OK", data: "Application added successfully."});
});

router.post('/update-application', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({status: "NOK", error: "Invalid Authorization."});
  }

  const { id, updatedData } = req.body;
  await database.updateApplication(id, updatedData);
  res.json({status: "OK", data: "Application updated successfully."});
});

router.post('/delete-application', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({status: "NOK", error: "Invalid Authorization."});
  }

  const { id } = req.body;
  await database.deleteDocument(id, "Applications");
  res.json({status: "OK", data: "Application deleted successfully."});
});
module.exports = router;