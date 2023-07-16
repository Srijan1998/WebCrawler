const {normalizeURL, getURLsFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizes url https://wagslane.dev/path/', () => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path')
})

test('normalizes url https://waGSlane.dev/path/', () => {
    expect(normalizeURL('https://waGSlane.dev/path/')).toBe('wagslane.dev/path')
})

test('normalizes url http://waGSlane.dev/path/', () => {
    expect(normalizeURL('http://waGSlane.dev/path/')).toBe('wagslane.dev/path')
})

test('normalizes url http://waGSlane.dev/path', () => {
    expect(normalizeURL('http://waGSlane.dev/path')).toBe('wagslane.dev/path')
})

test('relative ruls are converted to absolute urls', () => {
    const htmlBody = '<html><body><a href="/courses"><span>Go to Boot.dev courses</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    console.log(getURLsFromHTML(htmlBody, 'https://boot.dev.com'))
    expect(getURLsFromHTML(htmlBody, 'https://boot.dev.com')).toContain('https://boot.dev.com/courses')
})

test('all urls are fetched', () => {
    const htmlBody = '<html><body><a href="/courses"><span>Go to Boot.dev courses</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    console.log(getURLsFromHTML(htmlBody, 'https://boot.dev.com'))
    expect(getURLsFromHTML(htmlBody, 'https://boot.dev.com')).toContain('https://boot.dev.com/courses')
    expect(getURLsFromHTML(htmlBody, 'https://boot.dev.com')).toContain('https://blog.boot.dev/')
    expect(getURLsFromHTML(htmlBody, 'https://boot.dev.com').length).toBe(2)
})