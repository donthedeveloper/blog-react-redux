module.exports = {
  entry: './browser/src/react-redux/index.js',
  output: {
    path: __dirname + '/browser/public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude:
          /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}