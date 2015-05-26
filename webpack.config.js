module.exports = {
  entry: './public/js/app.js',
  output: {
    filename: './public/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};
