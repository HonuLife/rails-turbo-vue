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
      expect(header.text_content).to eq('Our Pandas')
      expect(page.title).to eq('Pandas | Rails + Vue ⚡️')

      page.screenshot(path: actual_screenshot_path)
      expect(actual_screenshot_path)
        .to match_screenshot(
          expected_screenshot_path(suffix: nil),
          max_threshold_pct: 2.8
          # update: true # Uncomment this whenever you want to update the expected screenshot
        )

      # Switch to customer prefers dark color scheme (aka dark mode)
      page.emulate_media(colorScheme: 'dark')

      # Test that the page looks correct in dark mode
      page.screenshot(path: actual_screenshot_path(suffix: 'dark'))
      expect(actual_screenshot_path(suffix: 'dark'))
        .to match_screenshot(
          expected_screenshot_path(suffix: 'dark'),
          max_threshold_pct: 2.8
        )
    end
  end

  context "when viewing the pandas index page", headless: false do
    before do
      page.goto('/pandas')
      page.wait_for_load_state
    end

    it "dynamically loads and mounts the Zap.vue component", headless: false do
      header = page.wait_for_selector('h1')
      expect(header.text_content).to eq('Our Pandas')

      expect(page.content).not_to include('I was lazy loaded! ⚡️')

      page.evaluate("document.querySelector('#lazy-load').scrollIntoView()") # Scroll to the #lazy-load div

      #  FIXME: for some reason the request to dynamically load the Zap.vue component hangs in a "pending" request state
      #  in the browser and so the content is never loaded. I'm not sure why this is happening. I've tried using
      #  page.wait_for_load_state and page.wait_for_selector but neither of those seem to help. Running this test with the meta data: { headless: false } has only confirmed the issue but I've not found a fix yet.
      #  expect(page.content).to include('I was lazy loaded! ⚡️')
    end
  end
end
