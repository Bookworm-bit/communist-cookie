chrome.storage.sync.get('blockedSites', (data) => {
    const currentUrl = window.location.href;
    if (data.blockedSites[currentUrl]) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);
    }
});
