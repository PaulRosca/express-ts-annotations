module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', {
      tsConfig: 'tsconfig.esm.json'
    }],
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
