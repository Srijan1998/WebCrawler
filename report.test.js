const {test, expect} = require('@jest/globals')
const {sortByNumberOfIncomingLinks} = require('./report')

test ('Test sorting of pages', () => {
    const pages = {'https://abc.com': 5, 'https://cde.com': 10, 'https:fgh.com': 6}
    const pagesSorted = {'https://cde.com': 10, 'https:fgh.com': 6, 'https://abc.com': 5}
    const pagesSortedReturned = sortByNumberOfIncomingLinks(pages)
    expect(pagesSortedReturned).toEqual(pagesSorted)
})