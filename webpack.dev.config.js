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
      , filename: 'angular-slide-menu.js'
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
  , devtool: 'sourcemap'
  , debug: true
};
