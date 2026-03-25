chrome.tabs.onActivated.addListener((tab)=>{
    chrome.tabs.get(tab.tabId, (currentTabData)=>{
       if (currentTabData.url ==="https://www.google.com/"){

        // inject content script from Bg 
            chrome.scripting.executeScript({
                target:{ tabId: currentTabData.id },
                files: ["contentScript.js"]
            })

            // send message from background page to contenScript.js 
            setTimeout(()=>{
                // for background we have to use chrome.tabs from contentScript it will be chrome.runtime 
                chrome.tabs.sendMessage(
                    tab.tabId,
                    "Hello its Alfaz From Bg page",
                    (response)=>{
                        console.log(response);
                    }
                )
            },2000)
       }
    });
})

