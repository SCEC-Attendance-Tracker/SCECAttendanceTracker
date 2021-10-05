class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.bigint :member_id
      t.bigint :event_id

      t.timestamps
    end
  end
end
