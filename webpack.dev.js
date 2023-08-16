const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'hello-world': './src/index.js',
    kiwi: './src/kiwi.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '' //this is not needed since webpack5 but can be used in some custom cases
    //clean: {
    //dry: true - webpack will log which files should be deleted but not remove them
    //keep: /\.css/ - decide which files should be kept
    //}
  },
  mode: 'development',
  devServer: {
    port: 8000,
    static: {
      directory: path.resolve(__dirname, './dist')
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        //with type:asset webpack will automatically decided if he should use resource or inline
        type: 'asset',
        parser: {
          dataUrlCondition: {
            //if the img size is smaller than the 3 kilobytes it will use inline, otherwise resource
            maxSize: 3 * 1024 // 3 kilobytes
          }
        }
      },
      //loads txt file as a js string
      { test: /\.txt/, type: 'asset/source' },
      //css-loader reads content of css file and return this content
      //style-loader take this conteont and injects it into the page using style tags
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //compiles ecmasacript>5 to ecmascript 5
            presets: ['@babel/env'],
            //add if u want to use modern js feature whic is not supported by major browsers yet
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'] //remove all files with nested files in folders
    }),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      meta: {
        description: 'Some description'
      },
      chunks: ['hello-world'],
      filename: 'hello-world.html',
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Kiwi',
      meta: {
        description: 'Some description for kiwi'
      },
      chunks: ['kiwi'],
      filename: 'kiwi.html',
      template: 'index.html'
    })
  ]
};
