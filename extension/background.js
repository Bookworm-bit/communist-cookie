chrome.storage.sync.get(['blockedSites'], function (result) {
    let blockedSites = result.blockedSites || [];

    function updateBlockedSites() {
        chrome.storage.sync.get(['blockedSites'], function (result) {
            blockedSites = result.blockedSites || [];
        });
    }

    chrome.storage.onChanged.addListener(updateBlockedSites);

    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            for (let site of blockedSites) {
                if (details.url.includes(site)) {
                    return { cancel: true };
                }
            }
            return { cancel: false };
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
    );
});
