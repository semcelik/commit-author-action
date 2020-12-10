module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && yarn build && git add .',
    'pre-push': 'yarn test',
  },
};
