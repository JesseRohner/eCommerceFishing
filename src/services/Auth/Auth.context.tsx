import isEqual from "lodash.isequal"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  LOGIN_PAYLOAD,
  useLogin,
  useLogout,
  UserRecord,
  useSessionCheck,
} from "@hooks/api/useUserAccess"

export interface AuthContextInterface {
  user: UserRecord

  isAuthValid: () => boolean
  isUserPremium: () => boolean

  isLoginLoading?: boolean
  isLoginError?: boolean
  loginError?: any
  login: (data: LOGIN_PAYLOAD) => void

  isRegisterLoading?: boolean
  isRegisterError?: boolean
  registerError?: any
  register: () => void

  isLogoutLoading?: boolean
  isLogoutError?: boolean
  logoutLoading?: any
  logout: () => void
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserRecord>({})
  const {
    data: sessionCheckData,
    isLoading: isSessionCheckLoading,
    isError: isSessionCheckError,
  } = useSessionCheck()
  const {
    data: loginData,
    mutate: loginRequest,
    isLoading: isLoginLoading,
    isError: isLoginError,
    error: loginError,
  } = useLogin()
  const {
    status: logoutStatus,
    data: logoutData,
    mutate: logoutRequest,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
    error: logoutError,
  } = useLogout()

  useEffect(() => {
    if (
      sessionCheckData?.user &&
      !isSessionCheckLoading &&
      !isSessionCheckError
    ) {
      if (
        Object.keys(sessionCheckData.user) &&
        !isEqual(user, sessionCheckData.user as UserRecord)
      ) {
        setUser(sessionCheckData.user)
      }
    }
  }, [sessionCheckData, isSessionCheckLoading, isSessionCheckLoading])

  useEffect(() => {
    if (loginData && loginData?.user && !isLoginLoading && !isLoginError) {
      setUser(loginData.user)
    }
  }, [loginData, isLoginLoading, isLoginError])

  useEffect(() => {
    if (
      logoutStatus === "success" &&
      !!logoutData?.message &&
      !isLogoutLoading &&
      !isLogoutError
    ) {
      setUser({})
    }
  }, [logoutStatus, logoutData, isLogoutLoading, isLogoutError])

  const isAuthValid = () => Object.keys(user).length > 0

  const isUserPremium = () => Boolean(user?.permissions?.includes("DBPro"))

  const login: AuthContextInterface["login"] = (data) => {
    if (isAuthValid()) {
      const ERROR_MESSAGE =
        "Tried to login with already existing session. Aborting new login."

      console.log(ERROR_MESSAGE)

      return
    }

    loginRequest(data)
  }

  const register = () => {}

  const logout: AuthContextInterface["logout"] = () => {
    if (!isAuthValid()) {
      const ERROR_MESSAGE =
        "Tried to logout without an existing session. Aborting redundant logout."

      console.log(ERROR_MESSAGE)
      return
    }

    logoutRequest()
  }

  const providerValue = useMemo<AuthContextInterface>(
    () => ({
      user,

      isAuthValid,
      isUserPremium,

      isLoginLoading,
      isLoginError,
      loginError,
      login,

      register,

      isLogoutLoading,
      isLogoutError,
      logoutError,
      logout,
    }),
    [user, isLoginLoading, isLoginError, isLogoutLoading, isLogoutError],
  )

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
