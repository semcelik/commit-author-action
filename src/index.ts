import { getInput, setOutput, setFailed, info, warning } from '@actions/core';

import { INPUT, OUTPUT } from 'constants/io';
import { GITHUB_EVENT } from 'constants/env';
import getCommitEmails from 'helpers/getCommitEmails';
import formatEmailDomain from 'helpers/formatEmailDomain';

async function checkEmail(): Promise<void> {
  const emailDomainInput = getInput(INPUT.EMAIL_SUFFIX, { required: true });
  const emailDomain = formatEmailDomain(emailDomainInput);
  info(`Email domain: ${emailDomain}`);

  const commitEmails = await getCommitEmails(GITHUB_EVENT);

  if (!commitEmails) {
    return warning('Could not found emails');
  }
  info(`Emails to check: ${commitEmails}`);

  const invalidEmails = commitEmails.filter((email) => !email.endsWith(emailDomain));

  handleSetOutput(invalidEmails, emailDomain);
}

function handleSetOutput(invalidEmails: string[], emailDomain: string): void {
  const isValid = invalidEmails.length === 0;

  setOutput(OUTPUT.IS_VALID, isValid);

  if (isValid) {
    return info('Emails are valid');
  }

  warning(
    `Invalid emails found. Invalid emails: ${invalidEmails}. It should be end with ${emailDomain}`
  );
}

checkEmail().catch((error) => {
  setFailed(error.message);
});

export default checkEmail;
