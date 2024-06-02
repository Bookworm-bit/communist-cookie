// content.js

chrome.storage.sync.get('blockedDomains', (data) => {
    const domain = window.location.hostname;
    if (data.blockedDomains.includes(domain)) {
        alert(`The domain ${domain} is blocked`);
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