const puppeteer = require('puppeteer')
const { puppeteerPlugin } = require('../utils/util.puppeteer')
const { fileUpload } = require('../utils/util.fileUpload')
const { screenshot } = require('../utils/util.screenShoot')

const scraperRunner = async () => {
	try {
		/**
		 * @description INITIALIZE ALL PLUGIN MIDDLEWARE
		 */

		puppeteerPlugin.stealthPlugin()
		puppeteerPlugin.adblokerAds()
		puppeteerPlugin.anonymizeUserAgent()

		/**
		 * @description INITIALIZE PUPPETEER
		 */

		const browser = await puppeteer.launch({
			headless: false,
			args: ['--no-sandbox', '--allow-third-party-modules', '--start-maximized'],
			slowMo: 10
		})

		const context = await browser.createIncognitoBrowserContext()
		const page = await context.newPage()
		await page.setBypassCSP(true)
		await page.setViewport({ width: 1366, height: 500 })
		await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' })

		/**
		 * @description LOGIN METHOD
		 */
		await page.waitForSelector('input[name="email"]')
		await page.focus('input[name="email"]')
		await page.type('input[name="email"]', 'myaccount@gmail.com', { delay: 25 })
		await page.waitForSelector('input[name="pass"]')
		await page.focus('input[name="pass"]')
		await page.type('input[name="pass"]', 'myaccount12', { delay: 25 })
		await page.waitForSelector('button[name="login"]')
		await page.click('button[name="login"]', { delay: 50 })

		/**
		 * @description CREATE STATUS STORY METHOD
		 */

		await page.waitForSelector('div[class="sj5x9vvc cxgpxx05"] a')
		await page.click('div[class="sj5x9vvc cxgpxx05"] a')

		/**
		 * @description FILE STORY UPLOAD METHOD
		 */

		await page.waitForNavigation({ waitUntil: 'networkidle2' })
		await fileUpload({
			page,
			element: 'div[role="main"] > div[class="i1fnvgqd j83agx80"] > input[type="file"]',
			files: ['nodejs.jpeg']
		})

		/**
		 * @description STORY CAPTION IMAGE METHOD
		 */

		await page.waitForSelector('div[class="cp6p5cpd qypqp5cg"] div[aria-label="Bagikan ke Cerita"]')
		await page.click('div[class="cp6p5cpd qypqp5cg"] div[aria-label="Bagikan ke Cerita"]')

		/**
		 * @description SCREENSHOOT PAGE METHOD
		 */

		await screenshot(page, '../../screenshoot')

		// await browser.close()
	} catch (err) {
		console.log(`'Puppeteer Error Detected -> ${err}'`)
	}
}

scraperRunner()
