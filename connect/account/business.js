import { businessAction, destroy, teamAction } from "../../store/actions/business";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";

const api = new Connect(BASE_URL);

export const active_business = () =>
  api.get({
    path: "/business/profile",
    action: businessAction,
  });

export const update_business = (payload) =>
  api.patch({
    path: "/business/profile",
    payload,
    action: businessAction,
  });

export const team_members = () => api.get({
  path: "/business/team",
  action: teamAction
})

export const invite_team = (payload) => api.post({
  path: "/business/invite",
  payload,
})

export const edit_team_role = (payload, id) => api.patch({
  path: `/business/team/${id}`,
  payload,
})

export const delete_team_member = (id) => api.delete({
  path: `/business/team/${id}`,
})

export const destroy_business_memory_leaks = () =>
  api.reduxAction({ action: destroy });
