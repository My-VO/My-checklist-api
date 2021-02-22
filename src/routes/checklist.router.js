const express = require("express");

const authMid = require("../utils/jwt.utils");

const checklistController = require('../controllers/checklist.controller')

const { OK, CREATED } = require("../helpers/status_code");
const { request, response } = require("express");

const checklistRouter = express.Router();

checklistRouter.get("/user/checklist", authMid.authenticateJWT, async (request, response) => {
    const checklistFound = await checklistController.getChecklist(request);

    response.status(OK);
    response.json(checklistFound);
})

checklistRouter.post("/user/checklist", authMid.authenticateJWT, async (request, response) => {
    //console.log({request})
    const { userId } = request.user;
    
    const newChecklist = await checklistController.addChecklist(request.body, userId);

    return response.status(CREATED).json(newChecklist);
})

module.exports = checklistRouter;