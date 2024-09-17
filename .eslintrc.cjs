module.exports = {
  root: true,
  extends: ['eslint-config-airbnb'],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import'
  ],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: '@typescript-eslint/parser',
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/no-unresolved': [0],
    'import/extensions': [
      0,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-extraneous-dependencies': [0],
    'import/prefer-default-export': [0, 'any'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'react/require-default-props': [0],
    'comma-dangle': [2, 'never'],
    semi: [2, 'never'],
    'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    indent: [2, 2, {
      SwitchCase: 1,
      VariableDeclarator: 'first'
    }],
    'no-unused-vars': 0,
    'no-console': 0,
    treatUndefinedAsUnspecified: 0,
    'arrow-body-style': [0, 'never'],
    'no-param-reassign': [0],
    'no-nested-ternary': [0],
    'consistent-return': [0],
    'no-restricted-syntax': [0]
  }
}
