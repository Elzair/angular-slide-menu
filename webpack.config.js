module.exports = {
    context: __dirname
  , entry: {
      main: [
          __dirname + '/src/angular-slide-menu.js'
        , __dirname + '/src/angular-slide-menu.styl'
      ]
    } 
  , output: {
        path: __dirname + '/dist'
      , filename: 'angular-slide-menu.min.js'
    }
  , module: {
      loaders: [
          {
              test: /\.styl$/
            , loader: 'style-loader!css-loader!stylus-loader'
          }
        , {
              test: /\.css$/
            , loader: 'style-loader!css-loader'
          }
      ]
    }
  , plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            "NODE_ENV": JSON.stringify("production")
          }
        })
      , new webpack.optimize.UglifyJsPlugin()
    ]
};
