var path = require("path");

module.exports = {

  webpack: (config, { dev }) => {
      config.module.rules.push(
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(otf|eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: 'file-loader?limit=30000&name=[name].[ext]'
        }
      );
      return config;
  }
};
