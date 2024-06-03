
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ points: 0, blockedDomains: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BLOCK_DOMAIN') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedDomains'], (data) => {
            if (data.blockedDomains.includes(domain)) {
                sendResponse({ error: `Domain ${domain} is already blocked` });
                return;
            }

            const updatedPoints = data.points + cookiesCount;
            const updatedBlockedDomains = [...data.blockedDomains, domain];
            chrome.storage.sync.set({ points: updatedPoints, blockedDomains: updatedBlockedDomains }, () => {
                sendResponse({});
            });
        });
    } else if (message.type === 'UNBLOCK_DOMAIN') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['points', 'blockedDomains'], (data) => {
            if (!data.blockedDomains.includes(domain)) {
                sendResponse({ error: `Domain ${domain} is not blocked` });
                return;
            }
            if (data.points < cookiesCount * 2) {
                sendResponse({ error: 'Not enough points to unblock' });
                return;
            }

            const updatedPoints = data.points - (cookiesCount * 2);
            const updatedBlockedDomains = data.blockedDomains.filter((blockedDomain) => blockedDomain !== domain);
            chrome.storage.sync.set({ points: updatedPoints, blockedDomains: updatedBlockedDomains }, () => {
                sendResponse({});
            });
        });
    }
    return true;
});
