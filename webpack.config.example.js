const path = require("path");

const baseConfig = {
  mode: 'development',
  entry: [path.resolve(__dirname, "./example/src/index.tsx")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./example/dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
 
  devtool: "source-map",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    contentBase: "./example/dist",
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // ここdocker-compose専用の設定と化してしまっているためあとでいい感じにする
        target: 'http://server:3000'
      }
    }
  }
};

module.exports = baseConfig