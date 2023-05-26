import { withContexts } from "@storybook/addon-contexts/react"
import { addDecorator } from "@storybook/react"

import contexts from "./contexts"
import reactIntl from "./reactIntl"

import "@styles/globals.css"

export const parameters = {
  // Locale config - Start
  reactIntl,
  locale: reactIntl.defaultLocale,
  locales: {
    en: "English",
  },
  // Locale config - End

  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(withContexts(contexts))
