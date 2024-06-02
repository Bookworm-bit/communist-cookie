// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BLOCK_SITE') {
        const { url, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            if (data.blockedSites[getDomain(url)]) {
                sendResponse({ error: 'Site is already blocked' });
                return;
            }

            const updatedPoints = data.points + cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites, [getDomain(url)]: cookiesCount };
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    } else if (message.type === 'UNBLOCK_SITE') {
        const { url, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            if (!data.blockedSites[getDomain(url)]) {
                sendResponse({ error: 'Site is not blocked' });
                return;
            }

            const updatedPoints = data.points - cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites };
            delete updatedBlockedSites[getDomain(url)];
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    }
    return true;
});

function getDomain(url) {
    const urlObject = new URL(url);
    return urlObject.hostname;
}

