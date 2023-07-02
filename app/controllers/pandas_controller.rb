class PandasController < ApplicationController
  def index
    @data = {
      pandas: [
        { name: 'Bamboo', age: 10 },
        { name: 'Rolls', age: 20 },
        { name: 'Marty', age: 30 },
      ]
    }
  end
end
