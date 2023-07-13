class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if Rails.cache.read('users/import_progress') != "in_progress"
      ImportContactsJob.perform_later
    end

    Rails.cache.write('users/import_progress', "in_progress")
  end
end
