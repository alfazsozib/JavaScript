// document.body.appendChild(document.createTextNode("Hey Alfa is here with you!"))
// document.body.style.backgroundColor = '#0006b239';

// recive message from contenScripts.js 
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log(message);

    sendResponse("Thanks!");
})