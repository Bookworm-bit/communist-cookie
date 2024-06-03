document.addEventListener('DOMContentLoaded', () => {
    const cookiesDisplay = document.getElementById('cookies');
    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');

    const updateCookiesDisplay = () => {
        chrome.storage.sync.get('cookies', (data) => {
            cookiesDisplay.textContent = `Cookies: ${data.cookies || 0}`;
        });
    };

    const updateBlockedDomains = () => {
        chrome.storage.sync.get('blockedDomains', (data) => {
            const blockedDomainsList = document.getElementById('blocked-domains');
            blockedDomainsList.innerHTML = '';
            const domains = data.blockedDomains || [];
            domains.forEach((domain) => {
                const domainElement = document.createElement('li');
                domainElement.textContent = domain;
                blockedDomainsList.appendChild(domainElement);
            });
        });
    };

    function getDomain(url) {
        const urlObject = new URL(url);
        return urlObject.hostname;
    }

    const requestPermissions = (callback) => {
        chrome.permissions.request({
            origins: ['<all_urls>']
        }, (granted) => {
            if (granted) {
                alert('Permissions granted');
                if (callback) callback();
            } else {
                alert('Permissions not granted');
            }
        });
    };

    const handleBlockDomain = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'BLOCK_DOMAIN', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updateCookiesDisplay();
                    updateBlockedDomains();
                    chrome.tabs.reload(tabs[0].id);
                });
            });
        });
    };

    const handleUnblockDomain = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'UNBLOCK_DOMAIN', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updateCookiesDisplay();
                    updateBlockedDomains();
                    chrome.tabs.reload(tabs[0].id);
                });
            });
        });
    };

    blockButton.addEventListener('click', () => {
        chrome.permissions.contains({
            origins: ['<all_urls>']
        }, (result) => {
            if (result) {
                handleBlockDomain();
            } else {
                requestPermissions(handleBlockDomain);
            }
        });
    });

    unblockButton.addEventListener('click', () => {
        chrome.permissions.contains({
            origins: ['<all_urls>']
        }, (result) => {
            if (result) {
                handleUnblockDomain();
            } else {
                requestPermissions(handleUnblockDomain);
            }
        });
    });

    updateCookiesDisplay();
    updateBlockedDomains();
});
