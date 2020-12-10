# commit-author-action

![Test Runner](https://github.com/semcelik/commit-author-action/workflows/Test%20Runner/badge.svg?branch=master)

This action checks commit's email address with given email suffix

## Inputs

### `email_suffix`

**Required** The suffix of the email pattern. Sample `"gmail.com"`.

## Outputs

### `is_valid`

**Returns** `true` or `false`

## Example usage

```yaml
uses: semcelik/commit-author-action@master
with:
  email_suffix: 'gmail.com'
```
