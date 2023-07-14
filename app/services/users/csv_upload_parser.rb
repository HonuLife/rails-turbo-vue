require 'csv'

module Users

  class CsvUploadParser
    def initialize(csv_string)
      @csv_string = csv_string
    end

    def import_users_from_csv
      errors = {}
      successfully_imported_count = 0
      row_index = 1
      header_rows_count = 1

      total = @csv_string.lines.count - header_rows_count

      CSV.parse(@csv_string, headers: true) do |row|
        user = User.create(
          email: row["Email"],
          password: row["Password"],
          password_confirmation: row["Password"]
        )

        if user.valid?
          user.save
          successfully_imported_count += 1
        else
          errors["Row #{row_index}"] = user.errors.objects.first.full_message
        end

        row_index += 1
        processed_count = row_index - header_rows_count

        # ActionCable.server.broadcast 'import_users_progress_channel', { pct_complete: percentage_complete(processed_count, total) }
        Turbo::StreamsChannel.broadcast_replace_later_to(
          :users,
          target: "users_progress_bar",
          partial: "users/progress_bar",
          locals: {
            processed_count: processed_count,
            total: total,
            percentage_complete: percentage_complete(processed_count, total)
          }
        )
      end

      {
        errors: errors,
        successfully_imported_count: successfully_imported_count
      }
    end

    private

    def percentage_complete(row_index, total)
      ((row_index.to_f / total.to_f) * 100).round(2)
    end
  end
end
