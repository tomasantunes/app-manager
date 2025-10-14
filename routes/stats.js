var express = require('express');
var router = express.Router();
var database = require('../libs/database');

router.get('/get-app-numbers', async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.status(401).json({status: "NOK", error: "Invalid Authorization."});
    }

    var apps = await database.getApplications();

    var totalApps = apps.length;
    var compliantApps = apps.filter(app => { 
        return app.backend_updated && app.frontend_updated && app.online && app.has_repo && app.has_backup && app.has_docs;
    }).length;
    var backendOutdatedApps = apps.filter(app => !app.backend_updated).length;
    var frontendOutdatedApps = apps.filter(app => !app.frontend_updated).length;
    var offlineApps = apps.filter(app => !app.online).length;
    var noRepoApps = apps.filter(app => !app.has_repo).length;
    var noBackupApps = apps.filter(app => !app.has_backup).length;
    var noDocsApps = apps.filter(app => !app.has_docs).length;

    res.json({status: "OK", data: {
        totalApps,
        compliantApps,
        backendOutdatedApps,
        frontendOutdatedApps,
        offlineApps,
        noRepoApps,
        noBackupApps,
        noDocsApps
    }});
});

module.exports = router;