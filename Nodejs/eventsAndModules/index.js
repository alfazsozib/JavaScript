const path = require('path');
const os = require('os');
const fs = require('fs');
const School = require('./eventP');
// const emitter = new EventEmitter();


// fs.readFile("myfile.txt", (err, data)=>{
//     console.log(data.toString())
// });

// console.log("hello world"); 

const scl = new School();

// register a event listener
scl.on("bellRing", ({period, time})=>{
    console.log(`Period: ${period}, Time: ${time}`);
});
scl.startPeriod();