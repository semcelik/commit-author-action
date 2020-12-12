# commit-author-action

![Test Runner](https://github.com/semcelik/commit-author-action/workflows/Test%20Runner/badge.svg?branch=master)

Checks commit's email with a given email domain.

**NOTE:** This action should be used with `pull_request` or `push` event

## Inputs

### `email_domain`

**Required** The domain of the email. Samples: `"gmail.com"`, `"@gmail.com"`.

### `github_token`

**Required** Github token

### `error_on_fail`

**Default** `"true"`

`"true"` Throws an error and fails workflow

`"false"` Doesn't fails workflow, writes invalid emails as a warning

## Outputs

### `is_valid`

**Returns** `true` or `false`

## Example Usage

```yaml
uses: semcelik/commit-author-action@master
with:
  email_domain: 'gmail.com'
  github_token: ${{ secrets.GITHUB_TOKEN }}
  error_on_fail: 'false'
```

## Usage Samples

- On Success
  ![image](https://user-images.githubusercontent.com/25296714/101996418-31762080-3ce3-11eb-8727-d9fdaac2de70.png)

- On Fail
    - `error_on_fail` is true
      ![image](https://user-images.githubusercontent.com/25296714/101996282-1951d180-3ce2-11eb-8cef-e2c362ae7eb4.png)

    - `error_on_fail` is false
      ![image](https://user-images.githubusercontent.com/25296714/101996335-9ed58180-3ce2-11eb-8335-cc1cccb039e1.png)
