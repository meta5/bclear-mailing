module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "import"],
  "rules": {
    "no-unused-vars": "off",
    "no-dupe-class-members": "off",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/unbound-method": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": ["camelCase"],
        "leadingUnderscore": "forbid",
        "trailingUnderscore": "forbid"
      },
      {
        "selector": "variableLike",
        "format": ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"]
      },
      {
        "selector": "memberLike",
        "format": ["UPPER_CASE", "camelCase"],
        "leadingUnderscore": "forbid"
      },
      {
        "selector": "memberLike",
        "modifiers": ["static"],
        "format": ["UPPER_CASE", "camelCase", "PascalCase"],
        "leadingUnderscore": "forbid"
      },
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase", "UPPER_CASE"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      },
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "property",
        "modifiers": ["public"],
        "format": ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "off",
      {
        "overrides": {
          "constructors": "no-public",
          "accessors": "no-public"
        }
      }
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": [
          "public-static-field",
          "protected-static-field",
          "private-static-field",
          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",
          "constructor",
          "public-static-method",
          "protected-static-method",
          "private-static-method",
          "public-abstract-method",
          "protected-abstract-method",
          "private-abstract-method",
          "public-instance-method",
          "protected-instance-method",
          "private-instance-method"
        ]
      }
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        "ignoreParameters": true,
        "ignoreProperties": true
      }
    ],
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "no-useless-escape": "error",
    "quotes": "off",
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-body-style": "error",
    "arrow-parens": ["error", "always"],
    "camelcase": "off",
    "max-depth": [
      "error",
      {
        "max": 2
      }
    ],
    "complexity": [
      "error",
      {
        "max": 10
      }
    ],
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "off",
    "eqeqeq": ["error", "smart"],
    "guard-for-in": "error",
    "id-blacklist": "off",
    "id-match": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "index",
          ["sibling", "parent"],
          "internal",
          "external",
          "builtin"
        ]
      }
    ],
    "max-classes-per-file": ["error", 1],
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "error",
    "no-debugger": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-invalid-this": "error",
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-restricted-syntax": ["error", "ForInStatement"],
    "no-shadow": [
      "error",
      {
        "hoist": "all"
      }
    ],
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      }
    ],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "brace-style": "error",
    "quote-props": ["error", "consistent-as-needed"],
    "radix": "error",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "asyncArrow": "always",
        "named": "never"
      }
    ],
    "eol-last": ["error", "always"],
    "use-isnan": "error",
    "valid-typeof": "error"
  }
};
