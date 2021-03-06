const { flatten } = require('../util')

exports.parser = 'typescript-eslint-parser'

exports.plugins = [
  'typescript',
  'babel',
  'node',

  'mocha',
  'react',

  'react-perf',
  'optimize-regex',

  'eslint-comments',
  'prettier',
  'standard',
  'unicorn',
  'import',
]

exports.extends = [
  'plugin:unicorn/recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/electron',

  'standard',

  'prettier',
  'prettier/react',
]

exports.env = {
  browser: true,
  node: true,
  es6: true,
}

const e = 'error'
const w = 'warn'
const o = 'off'

exports.rules = flatten({
  /////////////
  // PLUGINS //
  /////////////
  desktop: {
    no: {
      'insecure-random': e,
      'stateless-class': e,
    },
    'promise-must-complete': e,
  },

  typescript: {
    'interface-name-prefix': [e, 'always'],
    'explicit-member-accessibility': e,
    no: {
      'angle-bracket-type-assertion': e,
      'unused-vars': e,
      'array-constructor': e,
      'use-before-define': [
        e,
        {
          functions: false,
          variables: false,
          typedefs: false,
        },
      ],
    },
    'member-ordering': [
      e,
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'instance-field',

          'public-field',
          'protected-field',
          'private-field',
          'field',

          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',

          'constructor', // moved after static methods

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'instance-method',

          'public-method',
          'protected-method',
          'private-method',
          'method',
        ],
      },
    ],
    'prefer-namespace-keyword': e,
    'class-name-casing': e,
    'type-annotation-spacing': e,
  },

  babel: {
    'no-invalid-this': e,
  },

  react: {
    'jsx-boolean-value': [e, 'always'],
    'jsx-key': e,
    'jsx-no-bind': e,
    'no-string-refs': e,
  },

  unicorn: {
    'number-literal-case': o,
    'explicit-length-check': o,
    'catch-error-name': o,
  },

  import: {
    extensions: e,
    'newline-after-import': e,
    no: {
      amd: e,
      commonjs: e,
      duplicates: e,
      'absolute-path': e,
      'webpack-loader-syntax': e,
      'extraneous-dependencies': e,

      'dynamic-require': w,
      'mutable-exports': w,
    },
  },

  mocha: {
    'handle-done-callback': e,
    no: {
      'identical-title': e,
      'exclusive-tests': e,
      'return-and-callback': e,
      'sibling-hooks': e,
      'global-tests': e,
      'nested-tests': e,

      'top-level-hooks': w,
      'pending-tests': w,
      'skipped-tests': w,
    },

    'max-top-level-suites': w,
  },

  node: {
    no: {
      'deprecated-api': e,
    },
  },

  'optimize-regex/optimize-regex': e,
  'react-perf': {
    'jsx-no-new-array-as-prop': e,
    'jsx-no-new-function-as-prop': e,
    'jsx-no-jsx-as-prop': e,
  },

  'eslint-comments': {
    no: {
      'duplicate-disable': e,
      'unlimited-disable': e,
      'unused-disable': e,
      'unused-enable': e,
    },
  },

  /////////////
  // BUILTIN //
  /////////////
  no: {
    sync: e,
    var: e,
    'array-constructor': o, // covered by ts/no-array-constructor above
    'unused-vars': o, // Covered by ts/no-unused-vars above
    /// blocked by https://github.com/eslint/eslint/issues/9095
    // fallthrough: e,
    ///
  },
  'prefer-const': e,

  /////////////
  // SPECIAL //
  /////////////
  'prettier/prettier': [
    e,
    {
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
      parser: 'typescript',
    },
  ],
  'no-restricted-syntax': [
    e,
    // TSLint: no-default-export
    {
      selector: 'ExportDefaultDeclaration',
      message: 'Use of default exports is forbidden',
    },
  ],
  'id-blacklist': [e, ...'any number string boolean never'.split(' ')],
})

exports.parserOptions = {
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const extensions = ['.js', '.ts', '.tsx']
exports.settings = flatten({
  import: {
    extensions,
    resolver: {
      node: {
        extensions,
      },
    },
    parsers: {
      espree: ['.js'],
    },
  },
})
