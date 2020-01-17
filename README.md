# Gif Guardian Action

> The silent but animated protector of Pull Requests. Automatically label Pull Requests without gifs with this GitHub Action.

## Example Workflow

```yml
name: Pull Requests Must Have GIF

on: 
  pull_request:
    types: [opened, reopened]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Gif Guardian
      uses: jamsinclair/gif-guardian-action@v0.1.1
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        label: "🙅‍♀️ No Gif"
```
