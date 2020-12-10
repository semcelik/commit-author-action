import { getInput, info, setFailed, setOutput, warning } from '@actions/core';
import { context } from '@actions/github';

import checkEmail from '.';

import Mock = jest.Mock;

describe('commit-author-action', () => {
  afterEach(() => {
    context.payload = {};
  });

  function prepareEmails(emails: string[]): void {
    context.payload = {
      commits: emails.map((email) => ({
        author: {
          name: 'semcelik',
          email,
        },
      })),
    };
  }

  it('should add @ to email_prefix if it is not given', () => {
    (getInput as Mock).mockReturnValue('gmail.com');
    prepareEmails(['a@gmail.com']);

    checkEmail();
    expect(info).toHaveBeenNthCalledWith(1, 'Email prefix pattern: @gmail.com');
  });

  it('should not add @ to email_prefix if it is already given', () => {
    (getInput as Mock).mockReturnValue('@gmail.com');
    prepareEmails(['a@gmail.com']);

    checkEmail();
    expect(info).toHaveBeenNthCalledWith(1, 'Email prefix pattern: @gmail.com');
  });

  it('should have valid info messages', () => {
    (getInput as Mock).mockReturnValue('test.com');
    prepareEmails(['a@test.com', 'b@test.com']);

    checkEmail();

    expect(info).toHaveBeenNthCalledWith(1, 'Email prefix pattern: @test.com');
    expect(info).toHaveBeenNthCalledWith(2, 'Emails to check: a@test.com, b@test.com');
    expect(info).toHaveBeenNthCalledWith(3, 'Author email is valid');

    expect(setOutput).toHaveBeenCalledWith('is_valid', true);
  });

  const validTestData = [
    ['test.com', ['a@test.com', 'semcelik@test.com', 'test@test.com']],
    ['@test.com', ['a@test.com', 'semcelik@test.com', 'test@test.com']],
    ['gmail.com', ['a@gmail.com', 'semcelik@gmail.com', 'test@gmail.com']],
    ['@gmail.com', ['a@gmail.com', 'semcelik@gmail.com', 'test@gmail.com']],
    ['semcelik.io', ['a@semcelik.io', 'semcelik@semcelik.io', 'test@semcelik.io']],
    ['@semcelik.io', ['a@semcelik.io', 'semcelik@semcelik.io', 'test@semcelik.io']],
  ];

  it.each(validTestData)('%s suffix should be valid for %s emails', (emailSuffix, inputs) => {
    (getInput as Mock).mockReturnValue(emailSuffix);
    prepareEmails(inputs as string[]);

    checkEmail();

    expect(info).toBeCalledTimes(3);
    expect(info).toHaveBeenNthCalledWith(1, expect.stringMatching(/Email prefix pattern: @/));
    expect(info).toHaveBeenNthCalledWith(2, `Emails to check: ${(inputs as string[]).join(', ')}`);
    expect(info).toHaveBeenNthCalledWith(3, 'Author email is valid');

    expect(setOutput).toBeCalledTimes(1);
    expect(setOutput).toHaveBeenCalledWith('is_valid', true);

    expect(setFailed).toBeCalledTimes(0);
  });

  const invalidTestData = [
    [['a@test2.com', 'a@test.com'], ['a@test2.com']],
    [['a@test.com', 'abc1@3test.com', 'abc@test.com'], ['abc1@3test.com']],
    [['a@abc.com'], ['a@abc.com']],
    [['a@test.com', 'a444@test.com', 'a123@test.com', 'ab@test5.com'], ['ab@test5.com']],
    [
      ['a@test2.com', 'a@test2.com'],
      ['a@test2.com', 'a@test2.com'],
    ],
    [
      [
        'a@test-wrong.com',
        'a@test-wrong2.com',
        'a@test-wrong3.com',
        'a@test-wrong4.com',
        'a@test.com',
      ],
      ['a@test-wrong.com', 'a@test-wrong2.com', 'a@test-wrong3.com', 'a@test-wrong4.com'],
    ],
  ];

  it.each(invalidTestData)('emails with %s should be invalid because of %s', (input, output) => {
    (getInput as Mock).mockReturnValue('test.com');
    prepareEmails(input);

    checkEmail();

    expect(info).toBeCalledTimes(2);
    expect(info).toHaveBeenNthCalledWith(1, 'Email prefix pattern: @test.com');
    expect(info).toHaveBeenNthCalledWith(2, `Emails to check: ${input.join(', ')}`);

    expect(warning).toBeCalledTimes(1);
    expect(warning).toHaveBeenCalledWith(
      `Author email is invalid. Found: ${output.join(', ')}. It should be end with @test.com`
    );

    expect(setOutput).toBeCalledTimes(1);
    expect(setOutput).toHaveBeenCalledWith('is_valid', false);

    expect(setFailed).toBeCalledTimes(0);
  });
});
