const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _root = path.resolve(__dirname, './');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);

  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  mode: 'development',

  entry: {
    polyfills: './src/polyfills.ts',
    app: './src/main.ts'
  },

  output: {
    path: root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js'
  },

  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial'
    }
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.ts'],

    alias: {
        '@components': root('src', 'components'),
        '@services': root('src', 'services'),
        '@models': root('src', 'models'),
        '@modules': root('src', 'modules'),
        '@ui': root('src', 'modules', 'ui'),
        '@pipes': root('src', 'pipes'),
        '@const': root('src', 'const'),
        '@interfaces': root('src', 'interfaces'),
        '@helpers': root('src', 'helpers')
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        loader: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader'
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
        /\@angular(\\|\/)core(\\|\/)fesm5/,
        root('dist'),
        {}
    ),

    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),

    new webpack.DefinePlugin({
      ENV_PRODUCTION: false,
    })
  ],

  devServer: {
    historyApiFallback: true,
  }
};