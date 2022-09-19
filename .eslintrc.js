module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': ['google', 'react-app', 'plugin:react-hooks/recommended'],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'new-cap': 'off',
    'camelcase': 'off',
  },
};
