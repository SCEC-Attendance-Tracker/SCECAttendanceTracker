class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start_date
      t.datetime :end_date
      t.string :google_event_id
      t.string :description
      t.string :location
      t.string :code

      t.timestamps
    end
  end
end
