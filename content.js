let observer;
let prev_title = ""; // memorise the previous/current title to check if changed


// Listen for messages from the background script to toggle the extension
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "toggle") {
        isEnabled = message.enabled;
        
        // If disabled, stop observing title changes
        if (observer) {
            observer.disconnect();
        }

        // If enabled, start observing title changes
        if (isEnabled) {
            startObserving();
        }
    }
});

// Function to start observing title changes
function startObserving() {
    observer = new MutationObserver(() => {
        if (!isGoodLink()) return true;

        const title = document.title;
        if (prev_title == title) return true;

        prev_title = title;
        browser.runtime.sendMessage({ action: 'download', title });
    });

    observer.observe(document.querySelector('title'), { childList: true });
}

function isGoodLink() {
    link = document.URL.split("/")[3].trim();
    if (!link) return false;
    if (link.substring(0, 3) != "wat") return false;
    //if not watch then return false, (shorten to wat)

    return true;
}