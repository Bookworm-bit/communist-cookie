chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BLOCK_SITE') {
        const { url, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            // Check if site is already blocked
            if (data.blockedSites[url]) {
                sendResponse({ error: 'Site is already blocked' });
                return;
            }

            const updatedPoints = data.points + cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites, [url]: cookiesCount };
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    } else if (message.type === 'UNBLOCK_SITE') {
        const { url, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedSites'], (data) => {
            // Check if site is not blocked
            if (!data.blockedSites[url]) {
                sendResponse({ error: 'Site is not blocked' });
                return;
            }

            const updatedPoints = data.points - cookiesCount;
            const updatedBlockedSites = { ...data.blockedSites };
            delete updatedBlockedSites[url];
            chrome.storage.sync.set({ points: updatedPoints, blockedSites: updatedBlockedSites });
            sendResponse({});
        });
    }
    return true; // Keep the messaging channel open for sendResponse
});