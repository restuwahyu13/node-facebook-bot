const puppeteer = require('puppeteer-extra')
const AdblokerAds = require('puppeteer-extra-plugin-adblocker')
const AnonymizeUserAgent = require('puppeteer-extra-plugin-anonymize-ua')
const { PendingXHR } = require('pending-xhr-puppeteer')
const AutoScrollDown = require('puppeteer-autoscroll-down')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

exports.puppeteerPlugin = {
	anonymizeUserAgent: () => puppeteer.use(AnonymizeUserAgent()),
	adblokerAds: () => puppeteer.use(AdblokerAds()),
	pendingXHR: (page) => new PendingXHR(page),
	autoScrollDown: (page, scrollDown, delay) => AutoScrollDown(page, scrollDown, delay),
	stealthPlugin: () => puppeteer.use(StealthPlugin())
}
