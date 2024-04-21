const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'extension')
    }
};