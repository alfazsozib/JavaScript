// Title : Uptime Monitoring Application
// Description: A REST Full API to monitor up or down time of user defined links
// Author: Alfaz Sozib
// Date: 13/03/2026


// Dependencies
const http = require("http");
const url = require("url");
const {handleReqRes} = require("./helpers/handleReqRes")
const environment = require("./helpers/environment")
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 5001
};


// testing file system 
// @todo pore muche dibo 
data.create('test','newFile', {'name':"Bangladesh", "lang":"bangla"}, function(err){
    // console.log('Error was', err);
})

// to read file 
data.read('test','newFile', function(err,data){
    // console.log('Error was', data);
})


// to update file 
data.update('test','newFile', {'name':'Englandesh','lang':'English'},(err)=>{
    console.log(err);
})

// delete existing file 
data.delete('test', 'newFile', (err)=>{
    // console.log(err);
})

// create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, ()=>{
        console.log(`Listening to port ${environment.port}`)
    });
}


// handle request response
app.handleReqRes  = handleReqRes


//start server
app.createServer();