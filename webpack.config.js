const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', 
  
  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "lib"),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=env&presets[]=react&presets[]=es2015&presets[]=stage-2' 
      },
      { 
        test: /\.css$/, 
        use: ['style-loader','css-loader']
      }
      ,
      { 
        test: /\.less$/, 
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader',
          }
        ]
        // use: ['style-loader','css-loader','less-loader'],
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['lib'])
  ]
}
