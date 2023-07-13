class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    Rails.cache.fetch('users/import_progress', expires_in: 2.minutes) do
      ImportContactsJob.perform_later

      true
    end
  end
end
