// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve as _resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: _resolve(__dirname, 'src', 'index'),
  output: {
    path: _resolve(__dirname, 'dist'),
  },
  plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
