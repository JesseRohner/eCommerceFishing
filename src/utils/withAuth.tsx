import { NextPage } from "next"

import LoginModal from "@modals/Login"

import useAuth from "@services/Auth/Auth.context"
import { show } from "@services/ModalManager"

const withAuth = (Component: NextPage) => {
  const Auth = (props: any) => {
    const { isAuthValid } = useAuth()

    if (!isAuthValid()) {
      // @ts-ignore
      show(LoginModal, { canBeClosed: false })
    }

    return <Component {...props} />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default withAuth
