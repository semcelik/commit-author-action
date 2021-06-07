import formatEmailDomain from './formatEmailDomain';

function filterInvalidEmails(emailDomainInput: string, commitEmails: string[]): string[] {
  const allowedDomains = emailDomainInput.replace(/\s/g, '').split(',').map(formatEmailDomain);

  const invalidEmails = commitEmails.filter((commitEmail) =>
    allowedDomains.every((domain) => !commitEmail.endsWith(domain))
  );

  return invalidEmails;
}

export default filterInvalidEmails;
