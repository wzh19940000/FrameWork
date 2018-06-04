const fs = require('fs')
const path = require('path')
const ipFilePath = path.resolve(__dirname, 'devServerIP.config')
let ip = ''
if (fs.existsSync(ipFilePath) && fs.statSync(ipFilePath).isFile()) {
	ip = fs.readFileSync(ipFilePath, 'utf8')
} else {
	fs.writeFileSync(ipFilePath, 'localhost:9999', 'utf8')
	throw new Error('确认 `devServerIP.config` 文件里 IP 地址正确')
}

module.exports = {
	devServer: {
		contentBase: './app',
		port: 8899,
		inline: true,
		open: true,
		openPage: '',
		hot: true,
		proxy: {
			"/api/*": {
				target: ip,
				secure: false,
				pathRewrite: {
					"/api": "/"
				}
			}
		},
		overlay: {
			warnings: true,
			errors: true
		}
	}
}