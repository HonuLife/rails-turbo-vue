require 'spec_helper'

RSpec.describe 'home page', type: :system do
  context 'when navigating from the home page to the pandas index page' do
    before do
      page.goto('/')
      page.wait_for_load_state
    end

    it 'renders the pandas index page with the expected content' do
      page.wait_for_selector('header').owner_frame.get_by_text('Pandas').click

      page.wait_for_load_state

      header = page.wait_for_selector('h1')
      expect(header.text_content).to eq('MOAR PANDAS!!!')

      page.screenshot(path: actual_screenshot_path)
      expect(actual_screenshot_path)
        .to match_screenshot(
          expected_screenshot_path(suffix: nil),
          max_threshold_pct: 1.0
        )

      # Tet that the page looks correct in dark mode
      page.emulate_media(colorScheme: 'dark')

      page.screenshot(path: actual_screenshot_path(suffix: 'dark'))
      expect(actual_screenshot_path(suffix: 'dark'))
        .to match_screenshot(
          expected_screenshot_path(suffix: 'dark'),
          max_threshold_pct: 1.0
        )
    end
  end
end
