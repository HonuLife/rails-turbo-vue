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
    say 'Creating .html.erb file', :green
    template 'view_with_vue.html.erb', "app/views/#{route_path}/#{name}.html.erb"
    say 'Creating the App.vue file', :green
    template 'App.vue.erb', "app/frontend/entrypoints/views/#{route_path}/#{name}/App.vue"
    say 'Creating the .ts file that will mount the .vue component', :green
    template 'view_with_vue.ts.erb', "app/frontend/entrypoints/views/#{route_path}/#{name}.ts"
  end

  def modify_file
    say 'Adding the controller method to render the view to the controller file', :green
    add_controller_method
    say 'Adding the route for the view to the routes.rb file', :green
    add_route_definition
  end

  private

  def add_controller_method
    controller_path = "app/controllers/#{route_path}_controller.rb"
    method_name = name
    method_body = "@typescript_entry_file = \"#{route_path}/#{name}.ts\""

    method_declaration = <<~CODE
      \s\sdef #{method_name}
        \s\s#{method_body}
      \s\send
    CODE

    insert_into_file controller_path, method_declaration, after: /class \w+.*\n/
  end

  def add_route_definition
    route_declaration = case name
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

    insert_into_file 'config/routes.rb', after: "Rails.application.routes.draw do\n" do
      <<~CODE
        \s\s#{route_declaration}
      CODE
    end
  end
end
