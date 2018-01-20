import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default [
  {
    entry: 'src/main.js',
    dest: 'docs/substrate.js',
    format: 'umd',
    moduleName: 'substrate',
    plugins: [
      resolve(),
      commonjs(),
      babel({ exclude: ['node_modules/**'] })
    ]
  }
];
