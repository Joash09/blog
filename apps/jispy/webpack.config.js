const path = require('path');

module.exports = {
  entry: './jispy-component.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /assets\/\.js/,
        use: 'exports-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'jispy-bundle.js',
    path: path.resolve(__dirname, ''),
  },

  experiments: {
    asyncWebAssembly: true
  },

  mode: 'production'
};
