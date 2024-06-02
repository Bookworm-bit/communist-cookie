// content.js

chrome.tabs.onupdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get('blockedSites', (data) => {
            const currentDomain = getDomain(window.location.hostname);

            alert(currentDomain);

            for (const domain in data.blockedSites) {
                alert(`Blocked site: ${domain} with ${data.blockedSites[domain]} cookies`);
            }

            if (data.blockedSites[currentDomain]) {
                alert('This site is blocked');
                const overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                overlay.style.zIndex = '9999';
                document.body.appendChild(overlay);
            }
        });
    }
});

// content.js
function getDomain(url) {
    const urlObject = new URL(url);
    return urlObject.hostname;
}