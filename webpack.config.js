const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/' //this is not needed since webpack5 but can be used in some custom cases
  },
  mode: 'none',
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
      }
    ]
  }
};
