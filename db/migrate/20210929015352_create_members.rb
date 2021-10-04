class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.boolean :admin
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :description
      t.boolean :paid_dues
      t.integer :total_attendance

      t.timestamps
    end
  end
end
