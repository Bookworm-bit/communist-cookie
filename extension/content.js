// content.js

chrome.storage.sync.get('blockedDomains', (data) => {
    const domain = window.location.hostname;
    if (data.blockedDomains.includes(domain)) {
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = 10000;
        overlay.style.color = 'white';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.innerHTML = '<h1>This domain is blocked</h1>';
        document.body.appendChild(overlay);
    }
});