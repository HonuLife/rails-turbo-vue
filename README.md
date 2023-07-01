[![CI](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml/badge.svg)](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml)

# Rails + Vue

A starter for working with Rails 7 + Vue 3, using Vite as the frontend build tool.

## Features

- ✅ TypeScript support
- ✅ Conditional loading of Vue on a per view basis.
- ✅ Navigation handled with [TurboDrive](https://turbo.hotwired.dev/handbook/drive)

## Dev

### Setup
```
bin/setup
```

### Run app:
```bash
# requires overmind: https://github.com/DarthSim/overmind
overmind start -f Procfile.dev
```

### Run tests:
```
bin/rails -i test <path_to_test_file>
```

## Details

### Versions of key dependencies:

- vite@4.2.0
- rails@7.0.3.1

TODO:
- [ ] SSR for vue files using this approach? https://www.railsjazz.com/blog/javascript-code-executed-inside-ruby-on-rails-app
