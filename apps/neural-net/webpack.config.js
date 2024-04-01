const path = require('path');

module.exports = {
  entry: './neuralnet-component.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/i,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      }
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  experiments: {
    asyncWebAssembly: true
  },

  output: {
    filename: 'neuralnet-bundle.js',
    path: path.resolve(__dirname, ''),
  },

  mode: 'production'
};
