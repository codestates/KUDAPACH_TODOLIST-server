/*eslint-disable*/
module.exports = {
  extends: [
    'eslint:recommended', // eslint 권장사항 적용
    'plugin:prettier/recommended', // eslint, prettier 연결
  ],
  parserOptions: {
    ecmaVersion: 2017,
  },
  ignorePatterns: ['node_modules/'],
  env: {
    es6: true,
  },
  rules: {
    'no-console': ['error'], // 콘솔로그 error 처리
    semi: ['error', 'always'], // ; 반드시 존재해야 함
  },
};
