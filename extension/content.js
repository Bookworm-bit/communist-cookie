
chrome.storage.sync.get('blockedDomains', (data) => {
    const domain = window.location.hostname;
    if (data.blockedDomains.includes(domain)) {
        window.stop();
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 10000,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });
        overlay.innerHTML = '<h1>This domain is blocked</h1>';
        document.body.appendChild(overlay);
    }
});
