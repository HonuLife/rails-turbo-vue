class ViewWithVueGenerator < Rails::Generators::NamedBase
  desc 'Creates a view that loads a Vue component and a controller that renders the view'

  argument :name, type: :string, required: true
  argument :route_path, type: :string, required: true

  source_root File.expand_path('templates', __dir__)

  def create_controller
    # Call the controller generator

    invoke('controller', [route_path])
  rescue Thor::Error => e
    # If the controller already exists, we don't need to do anything
  end

  def generate_files
    say 'Creating .html.erb file', '✅'
    template 'view_with_vue.html.erb', "app/views/#{route_path}/#{name}.html.erb"
    say 'Creating the .vue file', '✅'
    template 'App.vue.erb', "app/frontend/entrypoints/views/#{route_path}/#{name.capitalize}.vue"
  end

  def modify_file
    say 'Adding the controller method to render the view to the controller file', '✅'
    add_controller_method
    say 'Adding the route for the view to the routes.rb file', '✅'
    add_route_definition
    say 'Adding the frontend route entry', '✅'
    add_route_helper_entry
  end

  private

  def snake_case_to_title_case(snake_case)
    snake_case.split('_').map(&:capitalize).join('')
  end

  def vue_import_name
    @vue_file_name ||=
      snake_case_to_title_case("#{route_path.sub('/', '_')}_#{name}")
  end

  def add_route_helper_entry
    route_helper_path = 'app/frontend/helpers/routes.ts'
    import_entry = <<~CODE
      const #{vue_import_name} = async () =>
        (await import("@/entrypoints/views/#{route_path}/#{name.capitalize}.vue")).default;

    CODE

    result = route_declaration.match(/get '(.*?)'/)
    route_path = result[1] if result

    route_entry = <<~CODE
      \s\s"#{route_path}": [["#vue-root", #{vue_import_name}]],
    CODE

    insert_into_file route_helper_path, import_entry, before: /const routes = \{\n/
    insert_into_file route_helper_path, route_entry, after: /const routes = \{\n/
  end

  def add_controller_method
    controller_path = "app/controllers/#{route_path}_controller.rb"
    method_name = name

    method_declaration = <<~CODE
      \s\sdef #{method_name};end
    CODE

    insert_into_file controller_path, method_declaration, after: /class \w+.*\n/
  end

  def route_declaration
    @route_declaration ||= case name
                           when 'index'
                             "get '/#{route_path}', to: '#{route_path}##{name}'\n"
                           when 'show'
                             "get '/#{route_path}/:id', to: '#{route_path}##{name}'\n"
                           when 'new'
                             "get '/#{route_path}/new', to: '#{route_path}##{name}'\n"
                           when 'edit'
                             "get '/#{route_path}/:id/edit', to: '#{route_path}##{name}'\n"
                           else
                             "get '/#{route_path}/#{name}', to: '#{route_path}##{name}'\n"
                           end
  end

  def add_route_definition
    insert_into_file 'config/routes.rb', after: "Rails.application.routes.draw do\n" do
      <<~CODE
        \s\s#{route_declaration}
      CODE
    end
  end
end
