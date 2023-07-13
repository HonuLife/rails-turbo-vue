class ImportUsersProgressChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stream_from "import_user_#{param[:user_id]}_progress_channel"
    stream_from 'import_users_progress_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_progress
    ActionCable.server.broadcast 'import_users_progress_channel', { progress: 0 }
  end
end
