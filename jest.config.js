module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.(d.ts|stories.js)',
    '!src/**/*Styled.js',
    '!src/**/index.js',
    '!src/serviceWorker.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.svg$': '<rootDir>/config/jest/svgTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json|svg)$)':
      '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  watchPlugins: [
    '<rootDir>/node_modules/jest-watch-typeahead/filename.js',
    '<rootDir>/node_modules/jest-watch-typeahead/testname.js'
  ],
  globals: {
    ENVIRONMENT_CONFIGURATION: {}
  }
};
