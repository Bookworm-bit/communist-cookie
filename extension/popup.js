// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');

    const updatePointsDisplay = () => {
        chrome.storage.sync.get('points', (data) => {
            pointsDisplay.textContent = `Points: ${data.points}`;
        });
    };

    function getDomain(url) {
        const urlObject = new URL(url);
        return urlObject.hostname;
    }

    updatePointsDisplay();

    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');

    blockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'BLOCK_SITE', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updatePointsDisplay();
                    alert(`Site blocked. Cookies: ${cookiesCount}`);
                });
            });
        });
    });

    unblockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = getDomain(tabs[0].url);
            chrome.cookies.getAll({ domain: domain }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'UNBLOCK_SITE', domain: domain, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updatePointsDisplay();
                    alert(`Site unblocked. Cookies: ${cookiesCount}`);
                });
            });
        });
    });
});

