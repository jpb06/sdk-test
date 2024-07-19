import path from 'node:path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    WidgetSdk: './src/sdk/index.ts',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.build.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.webpack.build.json',
      }),
    ],
  },
  output: {
    clean: true,
    filename: 'sdk.webpack.min.js',
    library: {
      name: 'WidgetSdk',
      type: 'umd',
      export: 'default',
    },
    path: `${path.resolve('.')}/public/libs`,
  },
};

export default config;
