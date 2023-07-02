require 'test_helper'
require 'view_with_vue_generator_helper'
require 'generators/view_with_vue/view_with_vue_generator'

class ViewWithVueGeneratorTest < Rails::Generators::TestCase
  include ViewWithVueGeneratorHelper

  destination "#{Rails.root}/tmp/generators/view_with_vue_generator_test"
  tests ViewWithVueGenerator
  setup :build_app
  teardown :teardown_app

  def generator_output_path
    @generator_output_path ||= "#{Rails.root}/tmp/generators/view_with_vue_generator_test"
  end

  test 'generator runs without errors' do
    assert_nothing_raised do
      run_generator %w[index animals/pandas]

      assert_file(
        "#{generator_output_path}/app/controllers/animals/pandas_controller.rb"
      ) do |content|
        assert_match 'def index;end', content
      end

      assert_file "#{generator_output_path}/config/routes.rb" do |content|
        assert_match "get '/animals/pandas', to: 'animals/pandas#index", content
      end

      expected_view_content = <<~HTML
        <div class="max-w-lg mx-auto mt-16">
          <div id="vue-root"></div>
        </div>
      HTML

      assert_file "#{generator_output_path}/app/views/animals/pandas/index.html.erb",
                  expected_view_content

      expected_vue_component_content = <<~VUE
        <script setup lang="ts">
        // Add your imports here, etc
        </script>

        <template>
          <main>
            <h1>animals/pandas/index</h1>
          </main>
        </template>
      VUE

      assert_file(
        "#{generator_output_path}/app/frontend/entrypoints/views/animals/pandas/Index.vue",
        expected_vue_component_content
      )

      assert_file(
        "#{generator_output_path}/app/frontend/helpers/routes.ts"
      ) do |content|
        assert_match 'const AnimalsPandasIndex = async () =>', content
        assert_match '  (await import("@/entrypoints/views/animals/pandas/Index.vue")).default;', content
        assert_match '  "/animals/pandas": [["#vue-root", AnimalsPandasIndex]],', content
      end
    end
  end
end
