require 'spec_helper'

RSpec.describe 'home page', type: :system do
  it 'renders the home page with the expected content' do
    page.goto('/', waitUntil: "domcontentloaded")

    page.screenshot(path: actual_screenshot_path)

    expect(actual_screenshot_path)
      .to match_screenshot(
        expected_screenshot_path(suffix: nil),
        max_threshold_pct: 2.4
      )

    # Switch to customer prefers dark color scheme (aka dark mode)
    page.emulate_media(colorScheme: 'dark')

    # Test that the page looks correct in dark mode
    page.screenshot(path: actual_screenshot_path(suffix: 'dark'))
    expect(actual_screenshot_path(suffix: 'dark'))
      .to match_screenshot(
        expected_screenshot_path(suffix: 'dark'),
        max_threshold_pct: 2.4
      )
  end
end
