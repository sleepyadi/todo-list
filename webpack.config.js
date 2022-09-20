const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },

    devtool: 'inline-source-map',

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo List',
            filename: 'index.html',
            template: './src/template.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/i,
                type: 'asset/resource'
            },
        ]
    },

    optimization: {
        // should have the entire runtime in a single chunk probably
        runtimeChunk: "single"
    }
}