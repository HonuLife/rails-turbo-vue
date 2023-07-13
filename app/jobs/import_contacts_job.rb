class ImportContactsJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    100.times do |i|
      ActionCable.server.broadcast 'import_users_progress_channel', { progress: i + 1 }
      sleep 0.1
    end

    Rails.cache.delete('users/import_progress')
  end
end
