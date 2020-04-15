module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 debugger
    indent: ['error', 2, { // 强制使用一致的缩进
      SwitchCase: 1,
      ArrayExpression: 1,
      ObjectExpression: 1
    }],
    quotes: ['warn', 'single'], // 强制使用一致的反勾号、双引号或单引号
    semi: ['error', 'always', // 要求在语句末尾使用分号
      {
        omitLastInOneLineBlock: false
      }
    ],
    'semi-spacing': ['error', // 强制分号之前或之后使用一致的空格
      {
        before: false,
        after: true
      }
    ],
    'semi-style': 'error', //  强制分号出现在句子末尾
    eqeqeq: 'error', // 要求使用 === 和 !==
    // "camelcase": ["error", { // 强制使用骆驼拼写法命名约定
    //   "properties": "never" // 不检查属性名称
    // }],
    'comma-dangle': ['error', 'never'], // 禁用拖尾逗号
    'comma-spacing': ['error', { // 强制在逗号前后使用一致的空格
      before: false,
      after: true
    }],
    'comma-style': ['error', 'last'], // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'eol-last': ['error', 'always'], // 要求在非空文件末尾至少存在一行空行
    'func-call-spacing': ['error', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'space-before-function-paren': ['error', 'always'], // 要求或禁止函数圆括号之前有一个空格
    'lines-around-comment': ['error', {
      beforeBlockComment: false, // 要求在块级注释之前有一空行
      beforeLineComment: false // 要求在行级注释之前有一空行
    }]
  }
};
