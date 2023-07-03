require "rails_helper"

RSpec.describe AnimalsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/animals").to route_to("animals#index")
    end

    it "routes to #new" do
      expect(get: "/animals/new").to route_to("animals#new")
    end

    it "routes to #show" do
      expect(get: "/animals/1").to route_to("animals#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/animals/1/edit").to route_to("animals#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/animals").to route_to("animals#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/animals/1").to route_to("animals#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/animals/1").to route_to("animals#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/animals/1").to route_to("animals#destroy", id: "1")
    end
  end
end
