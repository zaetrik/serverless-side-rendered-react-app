const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.argv.includes('-p')

module.exports = {
  devtool: prod ? 'source-map' : 'inline-source-map',
  entry: './src/App.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
  ],
}
