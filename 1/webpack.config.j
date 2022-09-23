const { template } = require('@babel/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
/*подключенные плагины*/

module.exports = {
        stats: {
        children: true,
    },
    entry: path.resolve(__dirname,'./src/index.jsx'), // точка входа
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./build')
    },/*путь куда складываются собранные файлы*/ 

    resolve: {
        extensions: ['.js','.jsx'],
        
    },/*за какими расширениями следит вебпак*/
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use:['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            },
        ],
    },

    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html'
    })],
}