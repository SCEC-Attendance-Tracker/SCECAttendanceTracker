# frozen_string_literal: true

module Api
  module V1
    class FeedbacksController < ApplicationController
      respond_to :json

      # GET /feedbacks or /feedbacks.json
      def index
        if params[:average_rating]
          total_rating = 0
          total = 0
          @feedbacks = Feedback.where(event_id: params[:event_id]).find_each do |fb|
            total_rating += fb.event_rating_score
            total += 1 
          end
          
          avg = total_rating/total
          render json: {average_rating: avg}
        elsif params[:event_id]
          @feedback = Feedback.find_by(event_id: params[:event_id], member_id: session[:member_id])
          render json: @feedback
        else
          @feedbacks = Feedback.all
          render json: @feedbacks
        end
      end
  
      # GET /feedbacks/1 or /feedbacks/1.json
      def show
        if @feedback
          render json: @feedback
        else
          render json: @feedback.errors
        end
      end
  
      # GET /feedbacks/new
      def new
        @feedback = Feedback.new
      end
  
      # PUT /feedbacks/1
      def update
        @feedback = Feedback.find_by(id: params[:id], member_id: session[:member_id])
        puts @feedback
        @feedback.update(feedback_params)
        puts @feedback
        respond_with json: @feedback
      end

      # POST /feedbacks or /feedbacks.json
      def create
        @feedback = Feedback.new(feedback_params)
        @feedback.member_id = session[:member_id]
        if @feedback.save
          puts @feedback
          render json: @feedback
        else
          render json: @feedback.errors
        end
      end
  
      private
      # Only allow a list of trusted parameters through.
      def feedback_params
        params.require(:feedback).permit(:event_id, :event_review, :event_rating_score)
      end

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
  end
end

