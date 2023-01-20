module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', ['pascal-case', 'upper-case', 'lower-case']],
    'jira-issue-in-scope': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'jira-issue-in-scope': ({ scope }) => [
          scope && scope.match(/^((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-[1-9][0-9]*)$/g),
          'scope should contain a JIRA issue number (ex. feat(ABC-123): description and more, more)',
        ],
      },
    },
  ],
};
