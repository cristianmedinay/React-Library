import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Extiende las aserciones con jest-dom
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Usa ts-jest para transformar archivos TypeScript
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para manejar archivos de estilo (si los usas)
  },
};

export default config;