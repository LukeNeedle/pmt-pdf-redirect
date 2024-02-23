function redirectUrl(details) {
    const url = new URL(details.url);
    if (url.hostname === 'www.physicsandmathstutor.com' && url.pathname === '/pdf-pages/') {
        const redirectUrl = decodeURIComponent(url.searchParams.get('pdf'));
        return { redirectUrl: redirectUrl };
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    redirectUrl,
    { urls: ['*://www.physicsandmathstutor.com/pdf-pages/*'], types: ['main_frame'] },
    ['blocking']
);