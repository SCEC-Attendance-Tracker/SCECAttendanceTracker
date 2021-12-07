# frozen_string_literal: true

module Api
  module V1
    class MembersController < ApplicationController
      respond_to :json
      def create
        @member = Member.new(member_params)
        if @member.save
          render json: @member
        else
          render json: @member.errors
        end
      end

      def index
        @members = Member.all.order('id ASC')
        render json: @members
      end

      def show
        @member = Member.find(params[:id])
        if @member
          render json: @member
        else
          render json: @member.errors
        end
      end

      def delete
        @member = Member.find(params[:id])
      end

      def destroy
        @member = Member.find(params[:id])
        @member.destroy
        render json: { notice: 'Account deleted' }
        respond_to do |format|
          format.html { redirect_to members_url, notice: 'Account deleted!' }
          format.json { head :no_content }
        end
      end

      def edit
        @member = Member.find(params[:id])
      end

      def update
        @member = Member.find(params[:id])
        @member.update(member_params)
        puts @member
        respond_with json: @member
      end

      private

      def member_params
        params.require(:member).permit(:first_name, :last_name, :description, :is_member, :paid_dues, :img_url)
      end

      def set_member
        @member = Member.find(params[:id])
      end
    end
  end
end
