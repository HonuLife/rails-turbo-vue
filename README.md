[![CI](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml/badge.svg)](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml)

# Rails + Vue

A starter for working with Rails 7 + Vue 3, using Vite as the frontend build tool.

## Features

- ✅ Conditioanlly load Vue on pages
- ✅ TypeScript support
- ✅ Navigation handled with [TurboDrive](https://turbo.hotwired.dev/handbook/drive)
- ✅ System tests driven by RSpec + Capybara + Playwright
- ✅ Custom generator for creating a view that loads a Vue component

## Dev

### Setup
```bash
bin/setup
```

### Run app:
```bash
bin/dev
```

### Run tests:

#### Rails tests (including system/e2e tests)
```bash
rspec
```

#### Frontend (unit and component tests with Vitest)

```bash
yarn test
```

### Generate a view that uses a view component

```bash
rails generate view_with_vue NAME ROUTE_PATH
```

## Details

### Versions of key dependencies:

- vite@4.2.0
- rails@7.0.3.1

TODO:
- [ ] SSR for vue files using this approach? https://www.railsjazz.com/blog/javascript-code-executed-inside-ruby-on-rails-app
