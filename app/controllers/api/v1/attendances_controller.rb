module Api
  module V1
    class AttendancesController < ApplicationController
      respond_to :json
      
      # POST /attendances or /attendances.json
      def create
        @attendance = Attendance.new(attendance_params)
        
        
        if @attendance.save 
          render json: @attendance 
        else 
          render json: @attendance.errors 
        end
      end
      
      # GET /attendances or /attendances.json
      def index
        @attendance = Attendance.all

        render json: @attendence
      end

      # GET /attendances/new
      def new
        @params = request.query_parameters
        
        @attendance = Attendance.where(member_id: session[:member_id], event_id: @params['event_id']).first
        @attendance ||= Attendance.new(member_id: session[:member_id], event_id: @params['event_id'])
          
        if @params['mark']
          @attendance.toggle(:attended)
        end
          
        @attendance.save
        
        #@attendance = Attendance.new
        #@params = request.query_parameters
        #@attendance.event_id = @params['event_id']
        @attendance.member_id = session[:member_id]
        
      end

      # PATCH/PUT /attendances/1 or /attendances/1.json
      def update
        @attendance = Attendance.find(params[:id])
        puts @attendance
        @attendance.update(attendance_params)
        puts @attendance
        respond_with json: @attendance
      end

      # DELETE /attendances/1 or /attendances/1.json
      def destroy
        @attendance.destroy
        respond_to do |format|
          format.html { redirect_to attendances_url, notice: 'Attendance was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_attendance
        @attendance = Attendance.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def attendance_params
        params.require(:attendance).permit(:member_id, :event_id, :attended, :rsvp)
      end
    end
  end
end
