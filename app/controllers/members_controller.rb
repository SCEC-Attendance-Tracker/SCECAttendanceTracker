class MembersController < ApplicationController
  skip_before_action :authenticate_member!, :only => [:new]

  def new
    @params = request.query_parameters
    @member = Member.find_by(email: @params['email'])
  end

  def create
    @member = Member.find_by(email: member_params[:email])

    if @member.update(member_params)
      redirect_to(root_path)
    else

      render('new')
    end
  end

  def index
    @member = Member.order('id ASC')
  end

  def show
    @member = Member.find(params[:id])
  end

  def delete
    @member = Member.find(params[:id])
  end

  def destroy
    @member = Member.find(params[:id])
    @member.destroy
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
    params.require(:member).permit(:first_name, :last_name, :email, :description)
  end

  def set_member
    @member = Member.find(params[:id])
  end


end