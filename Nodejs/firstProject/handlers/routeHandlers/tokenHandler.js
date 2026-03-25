// Title : Token Handler
// Description: Token Handler
// Author: Alfaz Sozib
// Date: 20/03/2026



// Dependencies 
const data = require("../../lib/data")
const {hash, createRandomString} = require("../../helpers/utilities");
const {parseJSON} = require("../../helpers/utilities");


// module scaffolding

const handler = {};
handler._token = {};


handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
        handler._token[requestProperties.method](requestProperties, callback); 
    }else{
        callback(405);
    }
};


handler._token.post = (requestProperties, callback) =>{
    // Create token

    console.log(requestProperties)
    const phone = typeof(requestProperties.body.phone)==="string" && requestProperties.body.phone.trim().length ===11 ? requestProperties.body.phone : false;

    const password = typeof(requestProperties.body.password) ==='string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if(phone && password){
        data.read('users',phone, (err, userData)=>{
            // let userData = parseJSON(uData);
            let hashedPassword = hash(password);
            if(hashedPassword === parseJSON(userData).password){
                let tokenId = createRandomString(20);
                let expires = Date.now() + 60*0*1000;

                let tokenObject = {
                    phone,
                    'id':tokenId,
                    expires
                }

                console.log(tokenObject);
                data.create('tokens', tokenId, tokenObject, (err)=>{
                    if(!err){
                        callback(200, tokenObject);
                    }else{
                        callback(500,{
                            error:"There was a problem in the server",
                        })
                    }
                })
            }else{
                callback(400, {
                    error: "Password is not valid",
                })
            }
        })
    }else{
        callback(400, {
            error: `You have a problem in your request`,
        })
    }
    
}


handler._token.get = (requestProperties, callback) =>{
// check the phone number is valid 
    const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
        ? requestProperties.queryStringObject.id
        : false;
    
    if(id){
        data.read('tokens',id, (err, tokenData)=>{
            // using spread operator to immentibly copy the object u  to user variable
            const token  = { ... parseJSON(tokenData)};
            if(!err && token){
                callback(200, token)
            }else{
               callback(404, {
            "Error":"Requested token not found!"
        })
            }
        })
    }else{
        callback(404, {
            "Error":"Requested token not found!"
        })
    }
    
}


handler._token.put = (requestProperties, callback) =>{
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
        ? requestProperties.body.id
        : false;
    
    const extend = typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true ? true : false;
    console.log(id)
    console.log(extend)
    if(id && extend){
        data.read('tokens',id, (err, tokenData)=>{
            let tokenObject = parseJSON(tokenData)
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.noow() + 60 * 60 * 1000;

                // store the updated data 
                data.update('tokens',id,tokenObject,(err)=>{
                    if(!err){

                    }else{
                        callback(500,{
                    error: "Server side error on tokenHandler",
                })
                    }
                })
            }else{
                callback(404,{
                    error: "Token Already Expired"
                })
            }
        })
    }else{
        callback(404, {
            error: `there was a problem in your request`
        })
    }
}


handler._token.delete = (requestProperties, callback) =>{
 const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
        ? requestProperties.body.id
        : false;
    console.log(requestProperties)
    if(id){
        data.read('tokens',id,(err,uData)=>{
            console.log(uData)
            if(!err && uData){
                data.delete('tokens',id,(err,success)=>{
                    if(err){
                        callback(500,{
                            "Error":"Something went wrong!"
                        })
                    }else{
                        callback(200,{
                            "Sucess":"User Deleted!"
                        })
                    }
                })
            }else{
                callback(500, {
                    "Error":"Serverside Error!"
                })
            }
        })
    } else{
        callback(400, {
            "error": "There was a problem!"
        })
    }
}


module.exports = handler;