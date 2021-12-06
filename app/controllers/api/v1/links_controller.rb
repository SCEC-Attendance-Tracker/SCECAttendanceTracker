# frozen_string_literal: true

module Api
    module V1
      class LinksController < ApplicationController
        respond_to :json
        def create
          @link = Link.new(link_params)
          if @link.save
            render json: @link
          else
            render json: @link.errors
          end
        end
  
        def index
          @links = Link.all.order('id ASC')
          render json: @links
        end
  
        def show
          @link = Link.find(params[:id])
          if @link
            render json: @link
          else
            render json: @link.errors
          end
        end
  
        def delete
          @link = Link.find(params[:id])
        end
  
        def destroy
          @link = Link.find(params[:id])
          @link.destroy
          render json: { notice: 'Link deleted' }
          respond_to do |format|
            format.html { redirect_to links_url, notice: 'Link deleted!' }
            format.json { head :no_content }
          end
        end
  
        def edit
          @link = link.find(params[:id])
        end
  
        def update
          @link = Link.find(params[:id])
          puts @link
          @link.update(link_params)
          puts @link
          respond_with json: @link
        end
  
        private
  
        def link_params
          params.require(:link).permit(:name, :url, :description)
        end
  
        def set_link
          @link = Link.find(params[:id])
        end
      end
    end
  end
  