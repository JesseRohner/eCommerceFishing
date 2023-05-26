import flow from "lodash.flow"

export const replaceLastSlash = (value: string, replaceWith = ""): string =>
  value.replace(/\/$/, replaceWith)

export const replaceHttps = (value: string, replaceWith = ""): string =>
  value.replace(/http(s?)\:\/\//, replaceWith)

export const replaceWWW = (value: string, replaceWith = ""): string =>
  value.replace(/(www.)?/, "")

export const parseUrlForInfoDisplay: (value: string) => string = flow([
  replaceHttps,
  replaceWWW,
  replaceLastSlash,
])
