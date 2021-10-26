const path = require('path');

const def = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'example'),
  },
};

module.exports = (env, options) => {
  if(options.mode === "development") {
    return {
      ...def,
      devtool: 'inline-source-map'
    }
  }
  return def;
};