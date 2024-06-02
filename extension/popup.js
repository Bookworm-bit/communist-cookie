// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');

    const updatePointsDisplay = () => {
        chrome.storage.sync.get('points', (data) => {
            pointsDisplay.textContent = `Points: ${data.points}`;
        });
    };

    const updateBlockedDomains = () => {
        chrome.storage.sync.get('blockedDomains', (data) => {
            const blockedDomainsList = document.getElementById('blocked-domains');
            blockedDomainsList.innerHTML = '';
            data['blocked-domains'].forEach((domain) => {
                const domainElement = document.createElement('li');
                domainElement.textContent = domain;
                blockedDomainsList.appendChild(domainElement);
            });
        });
    }

    function getDomain(url) {
        const urlObject = new URL(url);
        return urlObject.hostname;
    }

    updatePointsDisplay();
    updateBlockedDomains();

    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');

    blockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'BLOCK_DOMAIN', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updatePointsDisplay();
                    updateBlockedDomains();
                    alert(`Domain blocked. Cookies: ${cookiesCount}`)
                });
            });
        });
    });

    unblockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'UNBLOCK_DOMAIN', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updatePointsDisplay();
                    updateBlockedDomains();
                    alert(`Domain unblocked. Cookies: ${cookiesCount}`);
                });
            });
        });
    });
});

