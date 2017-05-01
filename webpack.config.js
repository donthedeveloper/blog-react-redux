module.exports = {
  entry: './browser/src/react-redux/index.js',
  output: {
    path: __dirname + '/browser/public/js',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude:
          /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          failOnError: true,
          failOnWarning: false
        }
      },
      {
        test: /jsx?$/,
        exclude:
          /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
}
