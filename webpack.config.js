const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist'),
        clean: true // 다시 빌드했을 때 해당 디렉터리 비우고 다시 만들지 여부
    },
    devtool: 'source-map', // source-map 파일 만들지
    mode: 'development',
    devServer: {
        host:'localhost',
        port: '3001',
        open: true,
        watchFiles: 'index.html'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'keyboard',
            template: "./index.html",
            inject: 'body', // 파일을 빌드했을 때 바디 부분에 넣을지 헤더에 넣을지 설정하는 부분(기본은 head)
            favicon: "./favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}