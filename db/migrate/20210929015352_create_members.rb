class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.boolean :is_admin
      t.boolean :is_member
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :description
      t.boolean :paid_dues
      t.integer :total_attendance
      t.string :img_url

      t.timestamps
    end
  end
end
