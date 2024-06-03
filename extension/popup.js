
document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');
    const domainPointsDisplay = document.getElementById('domain-points');
    const changeBlockStatusButton = document.getElementById('change-block-status');

    const updatePointsDisplay = () => {
        chrome.storage.sync.get('points', (data) => {
            pointsDisplay.textContent = `Points: ${data.points || 0}`;
        });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.storage.sync.get('blockedDomains', (data) => {
                    // Check if domain is blocked
                    const blockedDomains = data.blockedDomains || [];
                    const isBlocked = blockedDomains.includes(domain);
                    if (isBlocked) {
                        domainPointsDisplay.textContent = `Points needed to unblock: ${cookiesCount * 2}`;
                        changeBlockStatusButton.textContent = 'Unblock';
                    } else {
                        domainPointsDisplay.textContent = `Points to gain from blocking: ${cookiesCount}`;
                        changeBlockStatusButton.textContent = 'Block';
                    }
                });
            });
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

    const getDomain = (url) => {
        const urlObject = new URL(url);
        return urlObject.hostname;
    };

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

    const handleAction = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.storage.sync.get('blockedDomains', (data) => {
                    const blockedDomains = data.blockedDomains || [];
                    const isBlocked = blockedDomains.includes(domain);
                    chrome.runtime.sendMessage({ type: isBlocked ? 'UNBLOCK_DOMAIN' : 'BLOCK_DOMAIN', domain, cookiesCount }, (response) => {
                        if (response.error) {
                            alert(response.error);
                            return;
                        }
                        updatePointsDisplay();
                        updateBlockedDomains();
                        chrome.tabs.reload(tabs[0].id);
                    });
                });
            });
        });
    };

    changeBlockStatusButton.addEventListener('click', () => {
        chrome.permissions.contains({
            origins: ['<all_urls>']
        }, (result) => {
            if (result) {
                handleAction();
            } else {
                requestPermissions(handleAction);
            }
        });
    });

    updatePointsDisplay();
    updateBlockedDomains();
});
