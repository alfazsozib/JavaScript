// Title : Uptime Monitoring Application
// Description: A REST Full API to monitor up or down time of user defined links
// Author: Alfaz Sozib
// Date: 13/03/2026


// Dependencies
const http = require("http");
const url = require("url");
const {handleReqRes} = require("./helpers/handleReqRes")



// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 5001
};


// create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`Listening to port ${app.config.port}`)
    });
}


// handle request response
app.handleReqRes  = handleReqRes


//start server
app.createServer();