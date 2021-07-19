const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  stats: 'minimal',
  entry: path.resolve(__dirname, '../../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../../shopify/assets/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, '../../src/'),
      '@shopify-directory': path.resolve(__dirname, '../../shopify/')
    }
  },
  resolve: {
    extensions: [... '.jsx'] // add jsx to extensions array
  },
  module: {
    rules: [
      // add babel-loader for jsx,
      // remove the same loader from webpack.prod.js
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react' ]
        }
      },
      ...
    ]
  },
  plugins: [
    /**
     * don't clean files with the 'static' keyword in their filename
     * docs: https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!*static*']
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    })
  ]
}