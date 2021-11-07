require 'csv'

module DatabaseExportHelper
    def export_database() 
        # Export to csv 
        file = "#{Rails.root}/public/data.csv"
        member_table = Member.all;0
        events_table = Event.all;0        
        
        CSV.open( file, 'w' ) do |writer|
            writer << ["Members"]
            writer << member_table.first.attributes.map { |a,v| a }
            member_table.each do |s|
                writer << s.attributes.map { |a,v| v }
            end 
            
            writer << ["Events"]
            writer << events_table.first.attributes.map { |a,v| a }
            events_table.each do |s|
                writer << s.attributes.map { |a,v| v }
            end 
        end
    end 

    def wipe_database() 
        # export and delete info 
        export_database
        Member.where(admin: false).delete_all
        Event.delete_all 
        Feedback.delete_all 
        Attendance.delete_all
        Attachment.delete_all
        AttachmentLink.delete_all
    end 
end