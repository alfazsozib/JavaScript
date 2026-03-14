// Title : Handle Req and Res 
// Description: Handle Req and Res
// Author: Alfaz Sozib
// Date: 13/03/2026

const {StringDecoder} = require("string_decoder");
const routes = require("../routes");
const {notFoundHandler} = require("../handlers/routeHandlers/notFounHandler");
const url = require("url");
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) =>{
    // request handling 
    // get the url and parse it 

    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query; 
    const headersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }
  

    const decoder = new StringDecoder
    ('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};
        
        const payloadString = JSON.stringify(payload);


        // return the final response 
        res.writeHead(statusCode);
        res.end(payloadString);
    
    });

    req.on("data",(buffer)=>{
        realData += decoder.write();
    })

    req.on('end',()=>{
        realData += decoder.end();
        res.end("Hello World!");

    })
}

module.exports = handler;

