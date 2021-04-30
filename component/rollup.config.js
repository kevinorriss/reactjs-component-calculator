import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

const config = {
    input: 'src/Calculator.js',
    plugins: [
        postcss({
            extensions: [ '.css' ],
        }),
        babel({
            exclude: "node_modules/**",
            babelHelpers: 'bundled'
        }),
        nodeResolve(),
        commonjs(),
        terser(),
        uglify()
    ],
    output: {
        format: 'umd',
        name: 'bundle'
    }
}
export default config