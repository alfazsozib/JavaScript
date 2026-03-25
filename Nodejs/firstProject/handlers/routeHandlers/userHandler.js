// Title: User Handler Function 
// Description: User Handler 
// Author: Alfaz Sozib 
// Date: 3/19/2026 


// Dependencies 
const data = require("../../lib/data")
const {hash} = require("../../helpers/utilities");
const {parseJSON} = require("../../helpers/utilities")


// Module scaffolding
const handler = {};
handler._users = {};

handler.userHandler = (requestProperties, callback) =>{
    const acceptedMethods = ["get", "post", "put", "delete"];
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
        handler._users[requestProperties.method](requestProperties, callback); 
    }else{
        callback(405);
    }
   
};


handler._users.post = (requestProperties, callback) =>{
    // console.log(requestProperties);
    const firstName =
  typeof requestProperties.body.firstName === "string" &&
  requestProperties.body.firstName.trim().length > 0
    ? requestProperties.body.firstName
    : false;

const lastName =
  typeof requestProperties.body.lastName === "string" &&
  requestProperties.body.lastName.trim().length > 0
    ? requestProperties.body.lastName
    : false;

const phone =
  typeof requestProperties.body.phone === "string" &&
  requestProperties.body.phone.trim().length === 11
    ? requestProperties.body.phone
    : false;

const password =
  typeof requestProperties.body.password === "string" &&
  requestProperties.body.password.trim().length > 0
    ? requestProperties.body.password
    : false;

const toAgreement =
  typeof requestProperties.body.toAgreement === "boolean"
    ? requestProperties.body.toAgreement
    : false;
    
    if(firstName && lastName && phone && password && toAgreement){
        // make sure that the user does not already exist 

        data.read('users',phone, (err, user)=>{
            if(err){
                console.log(hash(password));
                let userObject ={
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    toAgreement

                }
                // console.log(userObject);
                data.create('users',phone,userObject,(err)=>{
                     if(!err){
                        callback(200, {
                            message: "User Created Successfully!",
                        })
                     } else{
                        callback(500, {
                            error: `Could Not Create User ${err}`
                        })
                     }
                })
            }else{
                callback(500,{
                    error:`Server side error ${err}`,
                })
            }
        })
    }else{
        callback(400, {
            error: "You have a problem in your request",
        });
    }
};


// @TODO: Athentication
handler._users.get = (requestProperties, callback) =>{
    // check the phone number is valid 
    const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
        ? requestProperties.queryStringObject.phone
        : false;
    
    if(phone){
        data.read('users',phone, (err, u)=>{
            // using spread operator to immentibly copy the object u  to user variable
            const user = { ... parseJSON(u)};
            if(!err && user){
                delete user.password;
                callback(200, user);
            }else{
               callback(404, {
            "Error":"Requested user not found!"
        })
            }
        })
    }else{
        callback(404, {
            "Error":"Requested user not found!"
        })
    }
    
}

// @TODO: Athentication
handler._users.put = (requestProperties, callback) =>{
     // check the phone number is valid 
    const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;
    const firstName =
  typeof requestProperties.body.firstName === "string" &&
  requestProperties.body.firstName.trim().length > 0
    ? requestProperties.body.firstName
    : false;

    const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
        ? requestProperties.body.lastName
        : false;

    const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;

    if(phone){
        if(firstName || lastName || password){
        
        // lookup the user 

        data.read('users',phone,(err,uData)=>{
            const userData = { ...parseJSON(uData) }
            if(!err && userData){
                if(firstName){
                    userData.firstName = firstName;
                }
                if(lastName){
                    userData.lastName = lastName;
                }
                if(password){
                    userData.password = hash(password);
                }
                data.update('users',phone,userData,(err)=>{
                    if(!err){
                        callback(200, {
                            message:"User was updated successfully",
                        })
                    } else{
                        callback(500, {
                error: "There was a problem in the server side"
            })
                    }
                })
            } else{
                callback(400, {
                error: "You have a problem in your request."
            })
            }
        })

        }else{
            callback(400, {
                error: "You have a problem in your request."
            })
        }

    } else{
        callback(404, "Invalid Number!");
    }

}

// @TODO: Athentication
handler._users.delete = (requestProperties, callback) =>{
    const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;
    if(phone){
        data.read('users',phone,(err,uData)=>{
            if(!err && uData){
                data.delete('users',phone,(err,success)=>{
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