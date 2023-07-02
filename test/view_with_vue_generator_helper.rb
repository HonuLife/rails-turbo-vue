ROOT_PATH = File.expand_path('../', __dir__)

module ViewWithVueGeneratorHelper
  def app_template_path
    "#{ROOT_PATH}/test/lib/generators/templates/rails_app"
  end

  def tmp_path(*args)
    @tmp_path ||= "#{ROOT_PATH}/tmp/generators/view_with_vue_generator_test"
    File.join(@tmp_path, *args)
  end

  def app_path(*_args)
    path = tmp_path
    if block_given?
      yield path
    else
      path
    end
  end

  def build_app
    FileUtils.rm_rf(app_path)
    FileUtils.mkdir_p(app_path)
    puts "Creating a new Rails app in #{app_path}", '✅'
    FileUtils.cp_r(Dir.glob("#{app_template_path}/*"), app_path)
  end

  def teardown_app
    FileUtils.rm_rf(tmp_path)
  end
end
