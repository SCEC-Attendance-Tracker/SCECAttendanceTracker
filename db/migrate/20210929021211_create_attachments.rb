class CreateAttachments < ActiveRecord::Migration[6.1]
  def change
    create_table :attachments do |t|
      t.bigint :member_id
      t.string :title
      t.datetime :upload_date
      t.string :url

      t.timestamps
    end
  end
end
