class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    # if Rails.cache.read('users/import_progress') != "in_progress"
    #   ImportContactsJob.perform_later
    # end

    # Rails.cache.write('users/import_progress', "in_progress")
    #
    @data = {
      users: User.all
    }
  end

  def csv_import_modal; end

  def import_from_csv
    @import_result = ::Users::CsvUploadParser.new(params[:users_csv].read).import_users_from_csv
  end
end
