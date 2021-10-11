class Api::V1::MembersController < ApplicationController
  before_action :set_member, only: [:show, :edit, :update, :destroy]
  def new
    @member = Member.new
  end

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
    render json: {notice: "Account deleted"}
    respond_to do |format|
      format.html {redirect_to members_url, notice: 'Account deleted!'}
      format.json {head :no_content}
    end
  end

  def edit
    @member = Member.find(params[:id])
  end

  def update
    @member = Member.find(params[:id])
    if @member.update(member_params)
      redirect_to(member_path(@member))
    else
      render('edit')
    end
  end

  private
  def member_params
    params.require(:member).permit(:name, :email)
  end

  def set_member
    @member = Member.find(params[:id])
  end
end
