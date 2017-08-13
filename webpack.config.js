const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ["babel-polyfill", './js/app.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['8', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2'],
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
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
          'process.env':{
            'NODE_ENV': JSON.stringify('development')
          }
        })
    ]
};
