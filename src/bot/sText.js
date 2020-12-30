const puppeteer = require('puppeteer')
const { puppeteerPlugin } = require('../utils/util.puppeteer')
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
		await page.setViewport({ width: 1366, height: 500 })
		await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' })

		/**
		 * @description LOGIN METHOD
		 */

		await page.waitForSelector('input[name="email"]')
		await page.focus('input[name="email"]')
		await page.type('input[name="email"]', 'myaccount@gmail.com', { delay: 50 })
		await page.waitForSelector('input[name="pass"]')
		await page.focus('input[name="pass"]')
		await page.type('input[name="pass"]', 'myaccount12', { delay: 50 })

		/**
		 * @description BOX INPUT STATUS METHOD
		 */

		await page.waitForSelector('button[name="login"]')
		await page.click('button[name="login"]', { delay: 100 })
		await page.waitForNavigation({ waitUntil: 'networkidle2' })
		await page.waitForSelector('div[role="button"] .m9osqain > span')
		await page.click('div[role="button"] .m9osqain > span', { delay: 100 })

		/**
		 * @description TYPING INPUT STATUS METHOD
		 */

		await page.waitForSelector('div[role="presentation"]')
		await page.focus('div[role="presentation"]')
		const textContent = 'nama saya adalah restu wahyu saputra'
		await page.type('div[role="presentation"] span', textContent, {
			delay: 100
		})

		/**
		 * @description PUBLISH STATUS METHOD
		 */

		await page.waitForSelector('div[aria-label="Kirim"] span')
		await page.click('div[aria-label="Kirim"] span', { delay: 300 })

		/**
		 * @description SCRENSHOOY STATUS METHOD
		 */

		await screenshot(page, '../../screenshoot/')

		/**
		 * @description CLOSE BROWSER METHOD
		 */

		await browser.close()
	} catch (err) {
		console.log(`'Puppeteer Error Detected -> ${err}'`)
	}
}

scraperRunner()
