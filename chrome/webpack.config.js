const path = require('path');
const fs = require('fs');
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
    }
};
