import formatEmailDomain from '../formatEmailDomain';

describe('formatEmailDomain', () => {
  const withAtSignTestData = [
    ['@gmail.com', '@gmail.com'],
    ['@test.com', '@test.com'],
    ['@semcelik.com', '@semcelik.com'],
    ['@test.io', '@test.io'],
    ['@hotmail.com', '@hotmail.com'],
  ];
  const withoutAtSignTestdata = [
    ['gmail.com', '@gmail.com'],
    ['test.com', '@test.com'],
    ['semcelik.com', '@semcelik.com'],
    ['test.io', '@test.io'],
    ['hotmail.com', '@hotmail.com'],
  ];

  const withoutAtSignTestData = [...withAtSignTestData, ...withoutAtSignTestdata];

  it.each(withoutAtSignTestData)('formatEmailDomain("%s") should return "%s"', (input, output) => {
    expect(formatEmailDomain(input)).toBe(output);
  });
});
