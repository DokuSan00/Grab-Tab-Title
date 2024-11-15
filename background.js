// Background script (background.js)
let isEnabled = false;  // Track whether the extension is enabled or not
browser.runtime.onInstalled.addListener(() => {
    // setActive()
    console.log('Extension installed, state: ', isEnabled);
});

// Listen for the toggle message from popup.js
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getState") {
        
		sendResponse({ enabled: isEnabled });
	}

    if (message.action === "toggleB") {
        isEnabled = !isEnabled;  // Flip the state on toggle

        setActive() // Message content.js
        sendResponse({ enabled: isEnabled }); // Restate UI
    }
	
    if (message.action === "download") {
        let title = message.title;
        if (!title) return true;

        title = formatText(title);
        const blob = new Blob([("Music: " + title)], { type: 'text/plain' });

        browser.downloads.download({
            url: URL.createObjectURL(blob),
            filename: 'tab_title.txt',
            conflictAction: 'overwrite',  // Automatically overwrite if file exists
            saveAs: false                // Don't show Save As dialog
        });
    }

	return true;
});

function formatText(title) {
    title = title.substring(title.length - 10, 0) //remove - Youtube
        .replace(/\(\d+\)/g, '').trim(); // remove notification number
        // (3) aaa - bbb (ccc) - Youtube => aaa - bbb (ccc)
    return title;
}

function setActive() {
    // Send message to content to turn on the observer
    browser.tabs.query({ currentWindow: true }, (tabs) => {
        const tab = tabs[0]; //get first tab : index 0
        browser.tabs.sendMessage(tab.id, { action: "toggle", enabled: isEnabled });
    });
}