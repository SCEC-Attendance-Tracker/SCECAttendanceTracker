# frozen_string_literal: true

module MemberHelper
  def is_owner?(id, session_id)
    id == session_id
  end

  def delete_owner?(id, session_id)
    return link_to('Delete My Profile', delete_member_path(id)) if id == session_id
  end
end
