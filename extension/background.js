// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BLOCK_SITE') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            if (data.blockedSites[domain]) {
                sendResponse({ error: 'Site is already blocked' });
                return;
            }

            const updatedPoints = data.points + cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites, [domain]: cookiesCount };
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    } else if (message.type === 'UNBLOCK_SITE') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            if (!data.blockedSites[domain]) {
                sendResponse({ error: 'Site is not blocked' });
                return;
            }

            const updatedPoints = data.points - cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites };
            delete updatedBlockedSites[domain];
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    }
    return true;
});