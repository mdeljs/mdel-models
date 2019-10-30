import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json'

const models = [
  'item',
  'modal'
];

export default models.map(fileName => createCompilerOptions(fileName))

function createCompilerOptions(fileName) {
  return {
    input: `src/${fileName}.ts`,
    output: {file: `es/${fileName}.js`, format: 'es'},
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      }),
      babel()
    ]
  }
}
