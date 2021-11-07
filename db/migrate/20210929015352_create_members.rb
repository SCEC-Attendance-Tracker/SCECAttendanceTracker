class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.boolean :admin
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :description
      t.boolean :paid_dues
      t.boolean :member
      t.integer :total_attendance
      t.string :img_url

      t.timestamps
    end
  end
end
