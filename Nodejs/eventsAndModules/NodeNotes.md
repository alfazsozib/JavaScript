core node js modules

1. Path Module
   we can get all the path related information by using that path module
2. Os Module
   by using this module we can get the information about or operating system
3. FS module
   We can use this module to work with files (read, write, create, delete) and many more
   there is 2 options Sync and Async. If we use readFileSync() then its gonna read the file in synchronous way and if we dont use the word Sync then its gonna work Asynchronouse way by default. when we use readFile () then we must use callback function

   fs.readFile('filename', (err, data)=>{
   // other code
   })

4. Event Module
   if we want to do anything which is related to any event then we have to use Event Module
   we have to import it like that const EventEmitter = require('events'); because events module gives us a class so we need to use capital letter for better understanding and then we have to make instances of that Particular class
   const emitter = new EventEmitter(); then we can use the methods using that object
