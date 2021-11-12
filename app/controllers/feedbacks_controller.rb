# frozen_string_literal: true

class FeedbacksController < ApplicationController
  before_action :set_feedback, only: %i[show edit update destroy]
  before_action :set_event, only: %i[show edit update destroy]

  # GET /feedbacks or /feedbacks.json
  def index
    @feedbacks = Feedback.all
    @event = Event.all

    @event = Event.where(id: params[:id]) if params[:id]
    @feedback = Feedback.where(event_id: @event.ids) # .where(:event_id => @event.ids)
  end

  # GET /feedbacks/1 or /feedbacks/1.json
  def show; end

  # GET /feedbacks/new
  def new
    @feedback = Feedback.new
  end

  # GET /feedbacks/1/edit
  def edit; end

  # POST /feedbacks or /feedbacks.json
  def create
    @feedback = Feedback.new(feedback_params)
    @event = Event.find(params[:event_id])
    member_attend = Attendance.where(event_id: @event.id, member_id: session[:member_id]).exists?
    if member_attend == true
      @feedback = @event.feedbacks.create(feedback_params)
      redirect_to event_path(@event)
    else
      respond_to do |format|
        format.html { redirect_to new_attendance_path({ event_id: @event.id }), notice: 'Need to mark attendence' }
      end
    end
  end

  # PATCH/PUT /feedbacks/1 or /feedbacks/1.json
  def update
    respond_to do |format|
      if @feedback.update(feedback_params)
        format.html { redirect_to @event, notice: 'Feedback was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @feedback.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /feedbacks/1 or /feedbacks/1.json
  def destroy
    @feedback.destroy
    respond_to do |format|
      format.html { redirect_to @event, notice: 'Feedback was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:event_id])
  end

  def set_feedback
    set_event
    @feedback = @event.feedbacks.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def feedback_params
    params.require(:feedback).permit(:event_id, :event_review, :event_rating_score)
  end
end
