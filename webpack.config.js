// webpack.config.js
module.exports = {
    entry: "./scripts/statistics/index.js",
    output: {
        path: __dirname + "/views/scripts/",
        filename: "index.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel",
          query: {
            presets: ["es2015"],
            plugins: ["add-module-exports"]
          }
        }
      ]
    }
};