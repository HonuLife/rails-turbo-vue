module Helpers
  module ScreenshotHelper
    def screenshot_file_name(suffix: nil, prefix: nil)
      if prefix.nil? && suffix.nil?
        "#{current_browser_name}_#{snake_case_test_description}.png"
      elsif prefix.nil?
        "#{current_browser_name}_#{snake_case_test_description}_#{suffix}.png"
      elsif suffix.nil?
        "#{prefix}_#{current_browser_name}_#{snake_case_test_description}.png"
      else
        "#{prefix}_#{current_browser_name}_#{snake_case_test_description}_#{suffix}.png"
      end
    end

    def snake_case_test_description
      RSpec.current_example.full_description.downcase.gsub(/\s/, '_')
    end

    def expected_screenshot_path(suffix: nil, prefix: nil)
      Rails.root.join('spec', 'expected_screenshots',
                      "expected_#{screenshot_file_name(suffix: suffix, prefix: prefix)}")
    end

    def actual_screenshot_path(suffix: nil, prefix: nil)
      Capybara.save_path.join("actual_#{screenshot_file_name(suffix: suffix, prefix: prefix)}")
    end

    def current_browser_name
      if page.respond_to?(:driver)
        page.driver.options[:capabilities].options[:browser_name]
      else
        page.context.browser.browser_type.name
      end
    end
  end
end

RSpec.configure do |config|
  config.include Helpers::ScreenshotHelper, type: :system
end
