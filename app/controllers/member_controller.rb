class MemberController < ApplicationController

    has_scope :filter_by_firstName
    has_scope :filter_by_lastName
    has_scope :filter_by_email
    has_scope :filter_by_starts_with

end
