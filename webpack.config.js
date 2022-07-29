const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      getLocalIdent: (loaderContext, localIdentName, localName) => {
        const fileName = path.basename(loaderContext.resourcePath)
        if (fileName === 'index.scss') {
          return localName
        } else {
          const name = fileName.replace(/\.[^/.]+$/, '')
          return `${name}__${localName}`
          //
        }
      },
    },
  },
}

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'web',
  devServer: {
    port: 3030,
  },
  module: {
    rules: [
      {
        use: 'swc-loader',
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', cssLoader, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
  },
}

module.exports = config
