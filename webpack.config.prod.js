const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ["babel-polyfill", './js/app.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2'],
            }
        }, {
            test: /\.svg$/,
            loader: 'raw-loader'
        }]
    },
    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compess: true,
                    output: {
                        comments: false
                    },
                    compress: {
                        dead_code: true,
                        drop_console: true
                    }
                }
            })
        ]
    }
};
