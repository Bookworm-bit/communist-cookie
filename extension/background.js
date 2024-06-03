// background.js!

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ cookies: 0, blockedDomains: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BLOCK_DOMAIN') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['cookies', 'blockedDomains'], (data) => {
            if (data.blockedDomains.includes(domain)) {
                sendResponse({ error: `Domain ${domain} is already blocked` });
                return;
            }

            const updatedCookies = data.cookies + cookiesCount;
            const updatedBlockedDomains = [...data.blockedDomains, domain];
            chrome.storage.sync.set({ cookies: updatedCookies, blockedDomains: updatedBlockedDomains });
            sendResponse({});
        });
    } else if (message.type === 'UNBLOCK_DOMAIN') {
        const { domain, cookiesCount } = message;
        chrome.storage.sync.get(['cookies', 'blockedDomains'], (data) => {
            if (!data.blockedDomains.includes(domain)) {
                sendResponse({ error: `Domain ${domain} is not blocked` });
                return;
            }
            if (data.cookies < cookiesCount * 2) {
                sendResponse({ error: 'Not enough cookies to unblock' });
                return;
            }

            const updatedCookies = data.cookies - (cookiesCount * 2);
            const updatedBlockedDomains = data.blockedDomains.filter((blockedDomain) => blockedDomain !== domain);
            chrome.storage.sync.set({ cookies: updatedCookies, blockedDomains: updatedBlockedDomains });
            sendResponse({});
        });
    }
    return true;
});