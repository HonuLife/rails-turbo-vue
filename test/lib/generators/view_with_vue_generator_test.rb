require "test_helper"
require "view_with_vue_generator_helper"
require "generators/view_with_vue/view_with_vue_generator"

class ViewWithVueGeneratorTest < Rails::Generators::TestCase
  include ViewWithVueGeneratorHelper

destination "#{Rails.root}/tmp/generators/view_with_vue_generator_test"
  tests ViewWithVueGenerator
  setup :build_app
  teardown :teardown_app

  test "generator runs without errors" do
    assert_nothing_raised do
      run_generator ["index", "root"]

      assert_file "#{Rails.root}/tmp/generators/view_with_vue_generator_test/app/controllers/root_controller.rb" do |content|
        assert_match "def index", content
        assert_match "@typescript_entry_file = \"root/index.ts\"", content
      end

      assert_file "#{Rails.root}/tmp/generators/view_with_vue_generator_test/config/routes.rb" do |content|
        assert_match "get '/root', to: 'root#index", content
      end

      expected_view_content = <<~HTML
        <div class="max-w-lg mx-auto mt-16">
          <div id="root-view"></div>
        </div>
      HTML

      assert_file "#{Rails.root}/tmp/generators/view_with_vue_generator_test/app/views/root/index.html.erb", expected_view_content

      expected_vue_component_content = <<~VUE
        <script setup lang="ts">
        // Add your imports here, etc
        </script>

        <template>
          <main>
            <h1>root/index</h1>
          </main>
        </template>
      VUE

      assert_file "#{Rails.root}/tmp/generators/view_with_vue_generator_test/app/frontend/entrypoints/views/root/index/App.vue", expected_vue_component_content

      expected_typescript_entrypoint_content = <<~TYPESCRIPT
        import { mountComponentOnTurboLoad } from "@/helpers/mount-component-on-turbo-load";
        import App from "@/entrypoints/views/root/index/App.vue";

        mountComponentOnTurboLoad(App, "#root-view");
      TYPESCRIPT

      assert_file "#{Rails.root}/tmp/generators/view_with_vue_generator_test/app/frontend/entrypoints/views/root/index.ts", expected_typescript_entrypoint_content
    end
  end
end
