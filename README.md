[![CI](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml/badge.svg)](https://github.com/joekrump/rails-turbo-vue/actions/workflows/rubyonrails.yml)

# Rails + Turbo + Vue

Render your views with Rails and then sprinkle in client-side rendered Vue components where you want them. When Vue components are used, they are dynamically imported and mounted when needed.

## Features

- ✅ Lazy loading of Vue components on pages where you want to use it
- ✅ TypeScript (optional) support
- ✅ [TailwindCSS](https://tailwindcss.com/)
- ✅ [Vite](https://vitejs.dev/) for frontend assets via [Vite Ruby](https://vite-ruby.netlify.app/)
- ✅ Navigation handled with [TurboDrive](https://turbo.hotwired.dev/handbook/drive)
- ✅ System tests driven by [RSpec + Capybara + Playwright](https://playwright-ruby-client.vercel.app/docs/article/api_coverage)
   - [`spec/system/pandas/index_spec.rb`](https://github.com/joekrump/rails-turbo-vue/blob/main/spec/system/pandas/index_spec.rb) can be a helpful example
   - [Ruby Playwright - Page API](https://playwright-ruby-client.vercel.app/docs/api/page)
- ✅ Custom generator for creating a view that loads a Vue component: `rails g view_with_vue index|show|edit|create ROUTE_PATH`. See [more details below](#generate-a-view-that-uses-a-view-component)
- ✅ GitHub actions workflow for running Vitest and Rspec tests

![Homepage](https://github.com/joekrump/rails-turbo-vue/blob/main/spec/expected_screenshots/expected_chromium_home_page_renders_the_home_page_with_the_expected_content_dark.png)

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

### Generate a new scaffold with and have the views styled with TailwindCSS

```bash
rails g scaffold
# Ex. rails g scaffold animal name:string species:string age_years:integer
```

### Generate a view that will mount a Vue.js component

```bash
rails generate view_with_vue index|show|edit|create ROUTE_PATH
# Ex. rails g view_with_vue edit animals/llamas will create the route /animals/llamas/:id/edit with a Vue component that loads on the view for that route.
```

## Details

### Versions of key dependencies:

- Vue@3.3.4
- rails@7.0.6.0
- vite@4.3.3
