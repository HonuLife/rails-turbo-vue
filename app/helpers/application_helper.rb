module ApplicationHelper
  def add_vue_props(data)
    return unless data

    "data-props=#{data.to_json}"
  end
end
