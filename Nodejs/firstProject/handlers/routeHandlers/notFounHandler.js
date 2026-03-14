// Title: Not found handler
// Not Found handler
// Author: Alfaz Hosain 
// Date: 3/15/2026

// dependencies
///////


// module scaffolding 

const handler = {};

handler.notFoundHandler = (requestProperties, callback) =>{
    console.log(requestProperties);

    callback(404, {
        message: "This is not found route",
    });
};

module.exports = handler;