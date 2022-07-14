var webpack = require('webpack')
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        use: 'swc-loader',
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html', // to import index.html file inside index.js
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
  },
}

module.exports = config
