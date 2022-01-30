
// esbuild config
module.exports = {
  entry: ['./src/index.tsx'],
  dist: './dist',
  sourcemap: true,
  bundle: true,
  outfile: './dist/index.js',
  target: 'esnext',
  devServer: {
    port: 3000,
    template: './public/index.html'
  }
};
