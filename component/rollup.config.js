import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const config = {
    input: 'src/Calculator.js',
    external: ['react'],
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        uglify()
    ],
    output: {
        format: 'umd',
        name: 'bundle',
        globals: {
            react: "React"
        }
    }
}
export default config