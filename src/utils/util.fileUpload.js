const { existsSync } = require('fs')
const { resolve } = require('path')

exports.fileUpload = async ({ page, element, files }) => {
	const filePath = resolve(__dirname.split('\\').slice(0, 4).join('/')) + '/images/'

	const newFiles = files.map((file) => {
		const filePattern = /(jpg|jpeg|png)/gi.test(file)
		const fileExitst = existsSync(filePath + file)
		if (!filePattern) return new TypeError('File image is not support')
		if (!fileExitst) return new Error(`File image is not exitst ${file}`)
		return filePath + file
	})

	await page.waitForSelector(`${element}`)
	const input = await page.$(`${element}`)
	const filesUpload = await Promise.all([...newFiles])
	await input.uploadFile(...filesUpload)
}
