const {JSDOM} = require('jsdom')
function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedURL = urlObj.hostname + urlObj.pathname
    normalizedURL = normalizedURL.endsWith('/') ? normalizedURL.substring(0, normalizedURL.length - 1) : normalizedURL
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const aTags = dom.window.document.querySelectorAll("a")
    let urls = []
    aTags.forEach(element => {
        const url = element.href
        try {
            const urlObj = new URL(url)
            urls.push(element.href)
        } catch (error) {
            urls.push(baseURL + element.href)
        } 
    });
    return urls
}

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    
    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages
    }
    try {
        const resp = await fetch(currentURL, {
            method: 'GET',
            mode: 'cors'
        })
        if (resp.status >= 400) {
            console.log('Error while fetching page code >= 400')
        } else if (resp.headers.get('Content-Type').includes('text/html') == false) {
            console.log('Error while fetching page content not html')
        } else {
            const html = await resp.text()
            const urls = getURLsFromHTML(html, baseURL)
            for (const url of urls) {
                if (normalizeURL(url) in pages) {
                    pages[normalizeURL(url)]++
                } else {
                    pages[normalizeURL(url)] = 1
                    pages = await crawlPage(baseURL, url, pages)
                }
            }
        }
        return pages
    } catch(error) {
        console.log(`error generated: ${error}`)
        return pages
    }
    
}

exports.normalizeURL = normalizeURL
exports.getURLsFromHTML = getURLsFromHTML
exports.crawlPage = crawlPage