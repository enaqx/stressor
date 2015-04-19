module.exports = {
  entry: './public/js/app.js',
  output: {
    filename: './public/js/bundle.js'       
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'] 
  }
};