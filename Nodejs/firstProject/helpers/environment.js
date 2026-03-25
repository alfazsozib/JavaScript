// Title : Environments
// Description: Handle all environment related things
// Author: Alfaz Sozib
// Date: 17/03/2026


// module scaffolding 
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: "ilovemycat"
};

environments.production = {
    port: 5000,
    envName: "production",
    secretKey: "ilovemycat"
}


// determine which environment was passed 

const currentEnv = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : 'staging';

const environmentToExport = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging;


module.exports = environmentToExport;