class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.bigint :member_id
      t.bigint :event_id
      t.boolean :rsvp
      t.boolean :attended

      t.timestamps
    end
  end
end
