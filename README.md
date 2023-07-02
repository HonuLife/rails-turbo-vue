[![CI](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml/badge.svg)](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml)

# Rails + Vue

A starter for working with [Rails 7](https://guides.rubyonrails.org/) + [Vue 3](https://vuejs.org/).

## Features

- ✅ Render parts of views on the clientside with [Vue.js]([url](https://vuejs.org/)) if you want.
- ✅ TypeScript support
- ✅ [TailwindCSS](https://tailwindcss.com/)
- ✅ [Vite](https://vitejs.dev/) for frontend assets via [Vite Ruby](https://vite-ruby.netlify.app/)
- ✅ Navigation handled with [TurboDrive](https://turbo.hotwired.dev/handbook/drive)
- ✅ System tests driven by [RSpec + Capybara + Playwright](https://playwright-ruby-client.vercel.app/docs/article/api_coverage)
   - [`spec/system/pandas/index_spec.rb`](https://github.com/joekrump/rails-turbo-vue/blob/main/spec/system/pandas/index_spec.rb) can be a helpful example.
   - [ruby playwright page methods](https://github.com/YusukeIwaki/playwright-ruby-client/blob/7c4651e224977aa5b2e1837d7fb964c4957b34a9/lib/playwright/channel_owners/page.rb)
- ✅ Custom generator for creating a view that loads a Vue component: `rails g view_with_vue index|show|edit|create ROUTE_PATH`. See [more details below](#generate-a-view-that-uses-a-view-component)

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
rails generate view_with_vue index|show|edit|create ROUTE_PATH
# Ex. rails g view_with_vue edit animals/llamas will create the route /animals/llamas/:id/edit with a Vue component that loads on the view for that route.
```

## Details

### Versions of key dependencies:

- Vue@3.3.4
- rails@7.0.6.0
- vite@4.3.3

TODO:
- [ ] SSR for vue files using this approach? https://www.railsjazz.com/blog/javascript-code-executed-inside-ruby-on-rails-app
