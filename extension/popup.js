document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');

    // Function to update the points display
    const updatePointsDisplay = () => {
        chrome.storage.sync.get('points', (data) => {
            pointsDisplay.textContent = `Points: ${data.points}`;
        });
    };

    const getDomain = (url) => {
        const urlObject = new URL(url);
        const domain = urlObject.hostname;
        return domain;
    }

    // Initially update the points display
    updatePointsDisplay();

    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');

    blockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.cookies.getAll({ url: tab.url }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'BLOCK_SITE', url: tab.url, cookiesCount }, (response) => {
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
            const tab = tabs[0];
            chrome.cookies.getAll({ url: tab.url }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'UNBLOCK_SITE', url: tab.url, cookiesCount }, (response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    updatePointsDisplay();
                    alert('Site unblocked');
                });
            });
        });
    });
});
