require 'spec_helper'

RSpec.describe 'home page', type: :system do
  it 'renders the home page with the expected content' do
    page.goto('/')

    page.screenshot(path: actual_screenshot_path)

    expect(actual_screenshot_path)
      .to match_screenshot(
        expected_screenshot_path(suffix: nil),
        max_threshold_pct: 1.4,
        update: true
      )
  end
end
