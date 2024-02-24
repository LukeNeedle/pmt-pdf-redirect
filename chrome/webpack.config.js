const path = require('path');
const ChromeExtensionWebpackPlugin = require('chrome-extension-webpack-plugin');
const version = fs.readFileSync(path.resolve(__dirname, '../version.txt'), 'utf8').trim();

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },    
    plugins: [
        new ChromeExtensionWebpackPlugin({
            "manifest_version":  3,
            "name": "PMT PDF Redirector",
            "version": version,
            "description": "This extension redirects you to the pdf file on <a href='https://www.physicsandmathstutor.com/'>physics and maths tutor's website</a> based on the pdf that you are currenty viewing.",
            "permissions": [
                "webRequest",
                "declarativeNetRequest"
            ],
            "background": {
                "service_worker": "src/background.js"
            },
            "icons": {
                "48": "icon.png"
            },
            "declarative_net_request": {
                "rule_resources": [{
                    "id": "rules",
                    "enabled": true,
                    "path": "src/rules.json"
                }]
            },
            "content_scripts": [
                {
                    "matches": ["*://www.physicsandmathstutor.com/pdf-pages/*"],
                    "js": ["src/content.js"]
                }
            ]
        }
        ),
    ]
};
