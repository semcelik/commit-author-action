const AT_SIGN = '@';

function formatEmailDomain(value: string): string {
  return value.startsWith(AT_SIGN) ? value : `${AT_SIGN}${value}`;
}

export default formatEmailDomain;
