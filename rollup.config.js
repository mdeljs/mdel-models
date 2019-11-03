import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json'

const overrideTsConfig = {
  compilerOptions: {
    "rootDir": "./src",
    declaration: true
  }
};

export default [
  {
    input: 'src/index.ts',
    output: {file: 'es/index.js', format: 'es'},
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
]
