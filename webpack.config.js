const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: './src/electron.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        resolve: {
            extensions: ['.ts', '.css', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'electron.js'
        }
    },
    {
        mode: 'development',
        entry: './src/App.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.tsx$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.css', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'App.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }
];