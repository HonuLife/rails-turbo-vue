require 'chunky_png'
require 'open3'
require './spec/support/helpers/screenshot_helper'
class ScreenshotMatcher
  include ChunkyPNG::Color
  include Helpers::ScreenshotHelper

  attr_accessor :images, :diff_file_path, :max_threshold_pct, :percentage_diff, :page, :actual_png_path,
                :expected_png_path

  def initialize(actual_png_path, expected_png_path, max_threshold_pct = 0, page:)
    @screenshot_path = 'tmp/screenshots'
    @max_threshold_pct = max_threshold_pct
    # page is needed for Helpers::ScreenshotHelper.screenshot_file_name
    @page = page
    @actual_png_path = actual_png_path
    @expected_png_path = expected_png_path

    if !actual_png_path.end_with?('.png') || !expected_png_path.end_with?('.png')
      raise 'Actual and expected screenshots must be PNGs'
    end

    @images = {
      actual: ChunkyPNG::Image.from_file(actual_png_path),
      expected: ChunkyPNG::Image.from_file(expected_png_path)
    }
  end

  def get_pixel_diff
    output = ChunkyPNG::Image.new(@images[:actual].width, @images[:expected].width, WHITE)
    diff = []
    # Credit to https://jeffkreeftmeijer.com/ruby-compare-images/ for the algorithm used here
    @images[:actual].height.times do |y|
      @images[:actual].row(y).each_with_index do |pixel, x|
        next if pixel == @images[:expected][x, y]

        score = Math.sqrt(
          (r(@images[:expected][x, y]) - r(pixel))**2 +
          (g(@images[:expected][x, y]) - g(pixel))**2 +
          (b(@images[:expected][x, y]) - b(pixel))**2
        ) / Math.sqrt(MAX**2 * 3)

        output[x, y] = rgb(
          r(pixel) + r(@images[:expected][x, y]) - 2 * [r(pixel), r(@images[:expected][x, y])].min,
          g(pixel) + g(@images[:expected][x, y]) - 2 * [g(pixel), g(@images[:expected][x, y])].min,
          b(pixel) + b(@images[:expected][x, y]) - 2 * [b(pixel), b(@images[:expected][x, y])].min
        )
        diff << score
      end
    end

    {
      diff: diff,
      output: output
    }
  end

  def compare
    images_match = false
    result = get_pixel_diff

    if result[:diff].empty?
      images_match = true

      return images_match
    end

    @percentage_diff = (result[:diff].inject do |sum, value|
                          sum + value
                        end / @images[:actual].pixels.length) * 100

    if @percentage_diff > @max_threshold_pct
      @diff_file_path = "#{@screenshot_path}/#{screenshot_file_name(prefix: 'diff')}"
      result[:output].save(diff_file_path)

      Open3.popen2("cp -f #{actual_png_path} #{expected_png_path} #{@screenshot_path}") { |_, stderr, wait_thr| }
    else
      images_match = true
    end

    images_match
  end
end

RSpec::Matchers.define :match_screenshot do |expected_screenshot_path, max_threshold_pct: 0, update: false|
  match do |actual_screenshot_path|
    page.save_screenshot(expected_screenshot_path) if update

    @matcher = ScreenshotMatcher.new(
      actual_screenshot_path.to_s,
      expected_screenshot_path.to_s,
      max_threshold_pct,
      page: page
    )
    @matcher.compare
  end

  failure_message do |actual_screenshot_path|
    <<~MESSAGE
      Expected that screenshots would match
      Image changed (%):   #{@matcher.percentage_diff}%
      Actual screenshot:   #{actual_screenshot_path}
      Expected screenshot: #{expected_screenshot_path}
      Diff:                #{@matcher.diff_file_path}
    MESSAGE
  end
end
