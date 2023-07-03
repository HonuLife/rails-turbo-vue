class AddTypeToAnimals < ActiveRecord::Migration[7.0]
  def change
    add_column :animals, :type, :string
  end
end
