import {
  active_business,
  delete_team_member,
  edit_team_role,
  invite_team,
  team_members,
  update_business,
} from "./business";

export const businessConnect = active_business;
export const updateBusinessConnect = update_business;
export const teamConnect = team_members;
export const inviteTeamConnect = invite_team;
export const updateTeamRoleConnect = edit_team_role;
export const deleteTeamRoleConnect = delete_team_member;
