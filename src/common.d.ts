import English from "@public/locales/en.json"

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof English
    }
  }

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

  type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> &
        Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]

  type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
    Omit<T, K> extends infer O
    ? { [P in keyof O]: O[P] }
    : never

  type PFNResponse<T = void> = {
    message?: string
    data?: T
  }

  type PFNUserResponse<T = void> = {
    message?: string
    user?: T
  }
}
