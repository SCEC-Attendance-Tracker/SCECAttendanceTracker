# frozen_string_literal: true

module Api
  module V1
    class FeedbacksController < ApplicationController
      respond_to :json

      # GET /feedbacks or /feedbacks.json
      def index
        @feedbacks = Feedback.all
        @event = Event.all
  
        render json: @feedbacks
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
  
      # GET /feedbacks/1/edit
      def edit; end
  
      # POST /feedbacks or /feedbacks.json
      def create
        @feedback = Feedback.new(feedback_params)
        if @feedback.save
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
  