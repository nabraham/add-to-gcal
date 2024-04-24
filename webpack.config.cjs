const path = require('path');

module.exports = {
    entry: './dist/src/background/index.js',
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'dist')
    }
};