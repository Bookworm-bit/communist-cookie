// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const pointsDisplay = document.getElementById('points');

    const updatePointsDisplay = () => {
        chrome.storage.sync.get('points', (data) => {
            pointsDisplay.textContent = `Points: ${data.points}`;
        });
    };

    updatePointsDisplay();

    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');

    blockButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0].url;
            chrome.cookies.getAll({ url: url }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'BLOCK_SITE', url: url, cookiesCount }, (response) => {
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
            const url = tabs[0].url;
            chrome.cookies.getAll({ url: url }, (cookies) => {
                const cookiesCount = cookies.length;
                chrome.runtime.sendMessage({ type: 'UNBLOCK_SITE', url: url, cookiesCount }, (response) => {
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

