const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'ws-server.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};