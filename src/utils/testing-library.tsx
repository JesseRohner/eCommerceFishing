import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import { IntlProvider } from "react-intl"
import { QueryClient, QueryClientProvider } from "react-query"

import { AuthContext } from "@services/Auth"
import { ModalManagerProvider } from "@services/ModalManager"

import English from "@public/locales/en.json"

const queryClient = new QueryClient()

const authProviderValueMock = {
  user: {
    firstname: "Test",
    lastname: "Smith",

    jobtitle: "CEO",
    company: "McDonalds",

    linkedinurl: "https://linkedin.com/",

    permissions: ["Dummy", "Permissions"],
  },

  isAuthValid: () => true,
  isUserPremium: () => true,

  isLoginLoading: false,
  isLoginError: false,
  loginError: "",
  login: () => {},

  register: () => {},

  isLogoutLoading: false,
  isLogoutError: false,
  logoutError: "",
  logout: () => {},
}

const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
): RenderResult => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en" messages={English}>
        <AuthContext.Provider value={authProviderValueMock}>
          <ModalManagerProvider>
            <>{children}</>
          </ModalManagerProvider>
        </AuthContext.Provider>
      </IntlProvider>
    </QueryClientProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from "@testing-library/react"
export { render }
