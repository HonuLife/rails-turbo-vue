require 'rails_helper'

RSpec.describe "animals/show", type: :view do
  before(:each) do
    assign(:animal, Animal.create!(
      name: "Name",
      age_years: 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/2/)
  end
end
