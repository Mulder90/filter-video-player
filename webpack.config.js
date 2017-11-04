const path = require('path');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    bundle: './src/index.js',
    filters: './src/filters.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: PROD ? '[name].min.js' : '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
