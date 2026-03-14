// Title : Sample Handler
// Description: Sample Handler
// Author: Alfaz Sozib
// Date: 13/03/2026



// module scaffolding

const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);

    callback(200, {
        message: "This is a sample url",
    });
};

module.exports = handler;