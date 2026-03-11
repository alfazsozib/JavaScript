
const EventEmitter = require('events');

class School extends EventEmitter{

startPeriod(){
    console.log("Period started");

    setTimeout(() => {
    this.emit("bellRing",{
        period: "first",
        time: "10:00"
    });
    }, 3000);

}

}



module.exports = School;