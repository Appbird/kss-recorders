module.exports = {
    mode: 'development',
  
    entry: './src/ts/client/index.ts',
    output: {
        path: `${__dirname}/public/js`,
        filename: "main.js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };