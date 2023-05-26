import axios from "axios"
import { useMutation } from "react-query"

import { UserRecord } from "@hooks/api/useUserAccess"

export const USER_ENDPOINT_URL = "/users/update"
export const USER_UPDATE_QUERY_KEY = `api${USER_ENDPOINT_URL}`

export const USER_CREATE_INVITES_URL = "/users/invites/create"
export const USER_CREATE_INVITES_QUERY_KEY = `api${USER_CREATE_INVITES_URL}`

export const useUserUpdate = () =>
  useMutation(
    [USER_UPDATE_QUERY_KEY],
    async (
      payload: RequireKeys<
        Pick<
          UserRecord,
          | "id"
          | "firstname"
          | "lastname"
          | "linkedinurl"
          | "jobtitle"
          | "notificationpreferences"
        >,
        "id"
      >,
    ) => await axios.put(USER_ENDPOINT_URL, payload),
  )

export type USER_CREATE_INVITES_PAYLOAD = {
  invites: Array<string>
}

export const useUserCreateInvites = () =>
  useMutation(
    [USER_CREATE_INVITES_QUERY_KEY],
    async (payload: USER_CREATE_INVITES_PAYLOAD) =>
      await axios.post(USER_CREATE_INVITES_URL, payload),
  )
