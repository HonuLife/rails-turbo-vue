class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if Rails.cache.read('users/import_progress') != "in_progress"
      Rails.logger.info "************************Importing contacts...*******************"
      ImportContactsJob.perform_later
    end

    Rails.cache.write('users/import_progress', "in_progress", expires_in: 1.minute)
  end
end
