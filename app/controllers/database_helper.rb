module DatabaseHelper 
    def wipe_database() 
        # export and delete info 
        Member.where(admin: false).delete_all
        Event.delete_all 
        Feedback.delete_all 
        Attendance.delete_all
        Attachment.delete_all
        AttachmentLink.delete_all
    end 
end 