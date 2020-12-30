const { resolve } = require('path')

exports.screenshot = async (page, filePath) => {
	await page.screenshot({
		path: resolve(process.cwd(), `${filePath}/screenshoot-${Date.now()}.jpg`),
		quality: 80
	})
}
