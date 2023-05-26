import axios from "axios"
import { useMutation, useQuery } from "react-query"

const SESSION_CHECK_ENDPOINT = "/access/session"
const SESSION_QUERY_KEY = `api${SESSION_CHECK_ENDPOINT}`

const REGISTRATION_ENDPOINT = "/access/register"
const REGISTRATION_QUERY_KEY = `api${REGISTRATION_ENDPOINT}`

const LOGIN_ENDPOINT = "/access/login"
const LOGIN_QUERY_KEY = `api${LOGIN_ENDPOINT}`

const LOGOUT_ENDPOINT = "/access/logout"
const LOGOUT_QUERY_KEY = `api${LOGOUT_ENDPOINT}`

const EMAIL_VERIFICATION_REQUEST_ENDPOINT = "/access/email/resendverification"
const EMAIL_VERIFICATION_REQUEST_QUERY_KEY = `api${EMAIL_VERIFICATION_REQUEST_ENDPOINT}`

const EMAIL_VERIFICATION_SEND_TOKEN_ENDPOINT = "/access/email/verify"
const EMAIL_VERIFICATION_SEND_TOKEN_QUERY_KEY = `api${EMAIL_VERIFICATION_SEND_TOKEN_ENDPOINT}`

export enum UserNotificationType {
  Account = "Account",
  Intro = "Intro",
  Reminders = "Reminders",
  Matches = "Matches",
  Product = "Product",
  Community = "Community",
}

export type UserRecord = {
  id?: number

  firstname?: string
  lastname?: string

  email?: string
  emailverified?: "Yes" | "No"

  country?: string

  jobtitle?: string
  company?: string

  linkedinurl?: string

  permissions?: Array<string>

  notificationpreferences?: Array<UserNotificationType>
}

export type LOGIN_PAYLOAD = Required<Pick<UserRecord, "email">> & {
  password: string
}

export type REGISTRATION_PAYLOAD = Required<
  Pick<
    UserRecord,
    "firstname" | "lastname" | "email" | "country" | "linkedinurl"
  >
> & { password: string }

export type REGISTRATION_UPDATE_PAYLOAD =
  | (Pick<UserRecord, "jobtitle"> & {
      companyid: number
    })
  | {
      acceptedterms: "Yes" | "No"
      acceptedrisk: "Yes" | "No"
    }

export type EMAIL_VERIFICATION_REQUEST_PAYLOAD = {
  email?: string
}

export type EMAIL_VERIFICATION_SEND_TOKEN_PAYLOAD = {
  email: string
  token: string
}

export const fetchSessionCheck = async () => {
  const { data } = await axios.get<PFNUserResponse<UserRecord>>(
    SESSION_CHECK_ENDPOINT,
  )

  return data
}

export const useSessionCheck = (
  { refetchInterval }: { refetchInterval: number | false | Function } = {
    refetchInterval: false,
  },
) =>
  useQuery([SESSION_QUERY_KEY], fetchSessionCheck, {
    refetchInterval: refetchInterval as any,
  })

export const postRegistration = async (payload: REGISTRATION_PAYLOAD) => {
  const { data } = await axios.post(REGISTRATION_ENDPOINT, payload)

  return data
}

export const useRegistration = () =>
  useMutation([REGISTRATION_QUERY_KEY], postRegistration)

export const putRegistration = async (payload: REGISTRATION_UPDATE_PAYLOAD) => {
  const { data } = await axios.put(REGISTRATION_ENDPOINT, payload)

  return data
}

export const useUpdateRegistration = () =>
  useMutation([REGISTRATION_QUERY_KEY], putRegistration)

export const fetchLogin = async (payload: LOGIN_PAYLOAD) => {
  const { data } = await axios.post<PFNUserResponse<UserRecord>>(
    `${LOGIN_ENDPOINT}`,
    payload,
  )

  return data
}

export const useLogin = () => useMutation([LOGIN_QUERY_KEY], fetchLogin)

export const fetchLogout = async () => {
  const { data } = await axios.post<PFNUserResponse>(LOGOUT_ENDPOINT)

  return data
}

export const useLogout = () => useMutation([LOGOUT_QUERY_KEY], fetchLogout)

export const postEmailVerification = async (
  payload?: EMAIL_VERIFICATION_REQUEST_PAYLOAD,
) => {
  const { data } = await axios.post(
    EMAIL_VERIFICATION_REQUEST_ENDPOINT,
    payload,
  )

  return data
}

export const useEmailVerificationRequest = () =>
  useMutation([EMAIL_VERIFICATION_REQUEST_QUERY_KEY], postEmailVerification)

export const postEmailVerificationToken = async (
  payload: EMAIL_VERIFICATION_SEND_TOKEN_PAYLOAD,
) => {
  const { data } = await axios.post<PFNResponse>(
    EMAIL_VERIFICATION_SEND_TOKEN_ENDPOINT,
    payload,
  )

  return data
}

export const useEmailVerificationTokenRequest = () =>
  useMutation(
    [EMAIL_VERIFICATION_SEND_TOKEN_QUERY_KEY],
    postEmailVerificationToken,
  )
