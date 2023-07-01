RSpec.configure do |config|
  # Make methods such as vite_asset_path (from the vite_rails gem) available in RSpec tests
  config.include ViteRails::TagHelpers
end
