module Animals
  class PandasController < ApplicationController
    def index
      @data = {
        pandas: Animal.where(type: 'Panda').order(:name)
      }
    end
  end
end
