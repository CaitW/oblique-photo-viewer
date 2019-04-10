const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ['./js/app.jsx']
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
            exclude: /node_modules/
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
