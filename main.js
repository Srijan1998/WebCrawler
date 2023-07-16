const {crawlPage} = require('./crawl')
const {printReport} = require('./report')
async function main() {
    if (process.argv.length <= 2 || process.argv.length > 3) {
        console.log('error')
    } else {
        const baseURL = process.argv.at(2)
        console.log(`Crawler is starting for: ${process.argv.at(2)}`)
        const pages = await crawlPage(baseURL, baseURL, {})
        printReport(pages)
    }
}

main()