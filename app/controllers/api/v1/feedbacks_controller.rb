# frozen_string_literal: true

module Api
  module V1
    class FeedbacksController < ApplicationController
      respond_to :json

      # GET /feedbacks or /feedbacks.json
      def index
        if params[:event_id]
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

        event_id = feedback_params['event_id']

        total = 0
        total_rating = 0
        @feedbacks = Feedback.where(event_id: event_id).find_each do |fb|
          total_rating += fb.event_rating_score
          total += 1 
        end
        puts total_rating
        puts total

        @event = Event.find_by(id: event_id)
        if(total == 0)
          @event.update(average_rating: 0)
        else
          avg = total_rating / total
          @event.update(average_rating: avg.round(1))
        end
        respond_with json: @feedback
      end

      # POST /feedbacks or /feedbacks.json
      def create
        @feedback = Feedback.new(feedback_params)
        @feedback.member_id = session[:member_id]

        event_id = feedback_params['event_id']
        if @feedback.save
          total = 0
          total_rating = 0
          @feedbacks = Feedback.where(event_id: event_id).find_each do |fb|
            total_rating += fb.event_rating_score
            total += 1 
          end

          puts params[:event_id]
          @event = Event.find_by(id: event_id)
          if(total == 0)
            @event.update(average_rating: 0)
          else
            avg = total_rating / total
            @event.update(average_rating: avg.round(1))
          end
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
        params.require(:feedback).permit(:event_id, :event_review, :event_rating_score, :id)
      end
    end
  end
end

