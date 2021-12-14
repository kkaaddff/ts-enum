// jest.config.ts
import type { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  testEnvironment: 'node',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
}

export default config
