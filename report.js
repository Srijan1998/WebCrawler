function printReport(pages) {
    const pagesSorted = sortByNumberOfIncomingLinks(pages)
    for (const page in pagesSorted) {
        console.log(`Found ${pagesSorted[page]} internal links to ${page}`)   
    }
}

function sortByNumberOfIncomingLinks(pages) {
    let sortable = []
    for (const page in pages) {
        sortable.push([page, pages[page]])
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let pagesSorted = {}
    sortable.forEach(element => {
        pagesSorted[element[0]] = element[1]
    })
    return pagesSorted
}

exports.sortByNumberOfIncomingLinks = sortByNumberOfIncomingLinks
exports.printReport = printReport