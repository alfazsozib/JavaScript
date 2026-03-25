// Title: Utilities
// Description: Important utilities functions 
// Author: Alfaz sozib
// Date: 3/19/2026 


// Dependencies
const crypto = require("crypto");
const environments = require("./environment");
const { has } = require("lodash");



// module scaffolding 
const utiilities = {};



// parse json string to object 
utiilities.parseJSON = (jsonString) =>{
    let output = {};
    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    };

    return output;
}

// hash string 
utiilities.hash = (str) =>{
    if(typeof(str)==="string" && str.length > 0){
        let hash = crypto
        .createHmac("sha256", environments.secretKey)
        .update(str)
        .digest('hex');
        return hash;
    }
    else
    {
        return false;
    }
}


// create random string
utiilities.createRandomString = (strlen) => {
    let length = typeof(strlen) === 'number' && strlen > 0 ? strlen : false;

    if(length){
        let possibleCharacters = 'abcdefghjklmnopqurstuvwxyz1234567890';
        let output = '';

        for(let i = 0; i < length; i++){
            let randomCharacter = possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
            output += randomCharacter;
        }

        return output;
    } else {
        return false;
    }
}


// export mdule 
module.exports = utiilities;