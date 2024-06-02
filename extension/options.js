document.addEventListener('DOMContentLoaded', function () {
    const blockedSitesList = document.getElementById('blockedSitesList');
    const siteInput = document.getElementById('siteInput');
    const addSiteButton = document.getElementById('addSiteButton');

    function updateBlockedSitesList(sites) {
        blockedSitesList.innerHTML = '';
        for (let site of sites) {
            const li = document.createElement('li');
            li.textContent = site;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeBlockedSite(site);
            });
            li.appendChild(removeButton);
            blockedSitesList.appendChild(li);
        }
    }

    function removeBlockedSite(site) {
        chrome.storage.sync.get(['blockedSites'], function (result) {
            const blockedSites = result.blockedSites || [];
            const updatedSites = blockedSites.filter(s => s !== site);
            chrome.storage.sync.set({ blockedSites: updatedSites }, function () {
                updateBlockedSitesList(updatedSites);
            });
        });
    }

    addSiteButton.addEventListener('click', function () {
        const site = siteInput.value.trim();
        if (site) {
            chrome.storage.sync.get(['blockedSites'], function (result) {
                const blockedSites = result.blockedSites || [];
                blockedSites.push(site);
                chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
                    siteInput.value = '';
                    updateBlockedSitesList(blockedSites);
                });
            });
        }
    });

    chrome.storage.sync.get(['blockedSites'], function (result) {
        const blockedSites = result.blockedSites || [];
        updateBlockedSitesList(blockedSites);
    });
});
