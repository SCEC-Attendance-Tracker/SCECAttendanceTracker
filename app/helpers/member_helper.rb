module MemberHelper
  def is_edit_owner(id, session_id)
    if id == session_id
      return link_to('Edit My Page', edit_member_path(id))
    end
  end

  def is_delete_owner(id, session_id)
    if id == session_id
      return link_to('Delete My Profile', delete_member_path(id))
    end
  end
end
