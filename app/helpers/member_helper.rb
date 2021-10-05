# frozen_string_literal: true

module MemberHelper
  def is_edit_owner(id, session_id)
    return link_to('Edit My Page', edit_member_path(id)) if id == session_id
  end

  def is_delete_owner(id, session_id)
    return link_to('Delete My Profile', delete_member_path(id)) if id == session_id
  end
end
