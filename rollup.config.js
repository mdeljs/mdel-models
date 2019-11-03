import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json'

const models = [
  'item',
  'list',
  'modal',
  'react-history'
];
const overrideTsConfig = {
  compilerOptions: {
    "rootDir": "./src",
    declaration: true
  }
};

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
        tsconfigOverride: overrideTsConfig
      }),
      babel()
    ]
  }
}
