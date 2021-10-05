# frozen_string_literal: true

module Api
  module V1
    class AttendanceController < ApplicationController
      before_action :set_attendance, only: %i[show edit update destroy]

      # GET /attendances or /attendances.json
      def index
        @attendance = Attendance.all
        @member = Member.all
        @event = Event.all

        render json: @attendence
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
        @attendance = Attendance.new(attendance_params)

        respond_to do |format|
          if @attendance.save
            format.html { redirect_to @attendance, notice: 'Attendance was successfully created.' }
            format.json { render :show, status: :created, location: @attendance }
            render json: @attendance
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @attendance.errors, status: :unprocessable_entity }
            render json: @attendance.errors
          end
        end
      end

      # PATCH/PUT /attendances/1 or /attendances/1.json
      def update
        respond_to do |format|
          if @attendance.update(attendance_params)
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
        params.require(:attendance).permit(:member_id, :event_id)
      end
    end
  end
end
