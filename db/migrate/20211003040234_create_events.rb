class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :eventTitle
      t.datetime :eventStartDate
      t.datetime :eventEndDate
      t.string :eventDescription
      t.string :eventLocation

      t.timestamps
    end
  end
end
