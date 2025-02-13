import path from 'path';

export default {
  entry: './src/index.ts', // Entry point
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(process.cwd(), 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match TypeScript files
        exclude: /node_modules/, // Exclude node_modules
        use: 'ts-loader', // Use ts-loader for TypeScript
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve .ts and .js files
  },
  mode: 'development', // Development mode
  devtool: 'source-map', // Generate source maps for debugging
};