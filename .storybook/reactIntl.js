const locales = ["en"]

const messages = locales.reduce(
  (acc, lang) => ({
    ...acc,
    [lang]: require(`../public/locales/${lang}.json`),
  }),
  {},
)

export default {
  defaultLocale: "en",
  locales,
  messages,
}
