chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let url = new URL(request.redirectUrl);
    if (url.hostname === 'www.physicsandmathstutor.com' && url.pathname === ('/pdf-pages/')) {
        let redirectUrl = decodeURIComponent(url.searchParams.get('pdf'));
        if (redirectUrl) {
            chrome.tabs.update(sender.tab.id, {url: redirectUrl});
        }
    }
});
