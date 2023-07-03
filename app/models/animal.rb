class Animal < ApplicationRecord
  validates :name, presence: true
  validates :age_years, presence: true, numericality: { greater_than: 0 }
  validates :type, presence: true

  self.inheritance_column = :_type_disabled
end
