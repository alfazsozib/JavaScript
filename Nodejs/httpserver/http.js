const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url ==='/'){
   res.write(`<html>
  <head>
    <body>
      <form action="/process" method="post">
        <input name="message" type="text" />
      </form>
    </body>
  </head>
</html>
`) 
res.end()

}
else if(req.url ==='/process' && req.method==="POST"){
    req.on("data",(chunk)=>{
        console.log(chunk)
 res.write(`Hello ${chunk.toString()}`)
res.end()
    })
   
}else{
    res.write("Not Found");
}
 
    
});


server.on('connection', ()=>{
    console.log("Connected");
})


// define port number || server is a event emitter itself
server.listen(5001);

console.log(`listening on port 5001`);
