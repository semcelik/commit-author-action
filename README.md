# commit-author-action

![Test Runner](https://github.com/semcelik/commit-author-action/workflows/Test%20Runner/badge.svg?branch=master)

This action checks commit's email address with given email suffix

## Inputs

### `email_domain`

**Required** The domain of the email. Samples: `"gmail.com"`, `"@gmail.com"`.

### `github_token`

**Required** Github token 

## Outputs

### `is_valid`

**Returns** `true` or `false`

## Example usage

```yaml
uses: semcelik/commit-author-action@master
with:
  email_domain: 'gmail.com'
  github_token: ${{ secrets.GITHUB_TOKEN }}
```
