# frozen_string_literal: true

module Api
  module V1
    class AttendancesController < ApplicationController
      before_action :set_attendance, only: %i[show edit update destroy]
      respond_to :json

      # GET /attendances or /attendances.json
      def index
        attendances = []
        if params.key?('member_id') && params.key?('event_id') # For code entry fetch
          @event = Event.find(params[:event_id])
          if @event.attendances.exists?(member_id: params[:member_id])
            attendances = @event.attendances
          end
          # @attendances = Attendance
          #   .joins(Event)
          #   .where(events: { event_id: params[:event_id] })
          #   .where(attendances: { member_id: params[:member_id] })
          # puts @attendances
          # render json: @attendances
        else 
          @events = Event.all
          @events.each {|e| attendances << e.attendances }
        end
        render json: attendances
      end

      # GET /attendances/1 or /attendances/1.json
      def show
        if @attendance
          render json: @attendance
        else
          render json: @attendance.errors
        end
      end

      # GET /attendances/new
      def new
        @attendance = Attendance.new
      end

      # GET /attendances/1/edit
      def edit; end

      # POST /attendances or /attendances.json
      def create
        @event = Event.find(attendance_params[:event_id])
        @event.attendances << Attendance.new(attendance_params)

        if @event.save
          member = Member.find(attendance_params[:member_id])
          member.update(total_attendance: member.total_attendance + 1)
          render json: @event
        else
          render json: @event.errors
        end
      end

      # PATCH/PUT /attendances/1 or /attendances/1.json
      def update
        respond_to do |format|
          if @attendance.update(attendance_params)
            if attendance_params[:attended]
              member = Member.find(attendance_params[:member_id])
              member.update(total_attendance: member.total_attendance + 1)
            end
            format.html { redirect_to @attendance, notice: 'Attendance was successfully updated.' }
            format.json { render :show, status: :ok, location: @attendance }
            render json: @attendance
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @attendance.errors, status: :unprocessable_entity }
            render json: @attendance.errors
          end
        end
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
