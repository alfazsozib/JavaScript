const fs = require('fs');
const http = require('http')


const server = http.createServer((req, res)=>{
    const myReadStream = fs.createReadStream(__dirname + "/bigdata.txt", 'utf8');
    myReadStream.pipe(res);
})


server.listen(5001)

console.log('server listening . .. . . . . ')