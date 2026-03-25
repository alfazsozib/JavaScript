// Title : Routes
// Description: Application Routes
// Author: Alfaz Sozib
// Date: 13/03/2026

const {sampleHanlder} = require("./handlers/routeHandlers/sampleHandler");
const {userHandler} = require("./handlers/routeHandlers/userHandler");
const {tokenHandler} = require("./handlers/routeHandlers/tokenHandler");


const routes =  {
    sample: sampleHanlder,
    user: userHandler,
    token: tokenHandler
}


module.exports = routes;