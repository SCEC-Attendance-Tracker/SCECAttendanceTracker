# frozen_string_literal: true

class CreateAttachmentLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :attachment_links do |t|
      t.bigint :attatchment_id
      t.bigint :event_id

      t.timestamps
    end
  end
end
