import { getInput, setOutput, setFailed, info, warning } from '@actions/core';
import { context } from '@actions/github';

type TCommit = {
  author: {
    name: string;
    email: string;
  };
};

const INPUT = {
  EMAIL_SUFFIX: 'email_suffix',
};

const OUTPUT = {
  IS_VALID: 'is_valid',
};

async function checkEmail() {
  const emailSuffix = getInput(INPUT.EMAIL_SUFFIX);

  const commits: TCommit[] = context.payload.commits;

  const commitEmails = commits.map((commit) => commit.author.email);

  info(`Email prefix pattern: ${emailSuffix}`);
  info(`Emails to check: ${commitEmails.join(', ')}`);

  const invalidEmails = commitEmails.filter((email) => !email.endsWith(emailSuffix));

  if (invalidEmails.length === 0) {
    setOutput(OUTPUT.IS_VALID, true);
    return info('Author email is valid');
  }

  const errorMessage = `Author email is invalid. Found: ${invalidEmails.join(
    ', '
  )}it should be MAIL_PREFIX@${emailSuffix}`;
  setOutput(OUTPUT.IS_VALID, false);
  warning(errorMessage);
}

checkEmail().catch((error) => {
  setFailed(error);
});
