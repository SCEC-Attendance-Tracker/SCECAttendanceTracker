class SettingsController < ApplicationController
    def show
        puts session[:member_id]
        @member = Member.find(session[:member_id])

        # if @member.admin == false 
        #     redirect_to(root_path)
        # end 

        # if @member.admin == nil 
        #     redirect_to(root_path)
        # end 

        export_database
    end

    private 

    def export_database() 
        # Export to csv 
        file = "#{Rails.root}/public/SCECDATA.csv"
        member_table = Member.all
        events_table = Event.all
        attendance_table = Attendance.all
        feedbacks_table = Feedback.all        
        
        CSV.open( file, 'w' ) do |writer|
            writer << ['Members']
            writer << member_table.first.attributes.map { |a,v| a }
            member_table.each do |s|
                writer << s.attributes.map { |a,v| v }
            end 

            writer << ['Events']
            writer << events_table.first.attributes.map { |a,v| a }
            events_table.each do |s|
                writer << s.attributes.map { |a,v| v }
            end 

            writer << ['Event Feedback']
            writer << feedbacks_table.first.attributes.map { |a,v| a }
            events_table.each do |s| 
                feedbacks_for_event = Feedback.where(event_id: s.id)
                writer << [s.title]
                feedbacks_for_event.each do |t|
                    writer << t.attributes.map { |b, w| w }
                end 
            end
        end
    end 
end