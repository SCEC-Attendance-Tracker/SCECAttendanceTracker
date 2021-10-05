class CreateFeedbacks < ActiveRecord::Migration[6.1]
  def change
    create_table :feedbacks do |t|
      t.bigint :event_id
      t.string :event_review
      t.integer :event_rating_score

      t.timestamps
    end
  end
end
