import { QueryClient } from "react-query"
import { z } from "zod"

import {
  fetchFindCompaniesByName,
  FIND_BY_NAME_QUERY_KEY,
} from "@hooks/api/useCompanies"

import { countryList } from "./getCountries"

export const email = z
  .string()
  .min(1, { message: "This field is required" })
  .email({ message: "Insert a valid email address" })

export const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })

export const firstName = z
  .string()
  .min(2, { message: "The value should be at least 2 characters long" })
  .max(24, { message: "The value cannot be more than 24 characters long" })
  .refine((firstName) => firstName.match(/^[a-z]+$/i), {
    message: "Only English characters allowed",
  })

export const lastName = z
  .string()
  .min(2, { message: "The value should be at least 2 characters long" })
  .refine((lastName) => lastName.match(/^[a-z]+$/i), {
    message: "Only English characters allowed",
  })

export const countryISO = z
  .string()
  .min(1, { message: "This field is required" })
  .refine((value) => Boolean(countryList.find((c) => c.value === value)), {
    message: "The selected value is invalid",
  })

export const linkedinProfileURL = z
  .string({ invalid_type_error: "Please insert a valid LinkedIn profile URL" })
  .regex(
    /^$|http(s)?:\/\/(www\.)?linkedin.com\/(pub|in|profile)\/[A-z0-9_%-]+/,
    {
      message: "Please insert a valid LinkedIn profile URL",
    },
  )
  .optional()
  .default("")

export const linkedinCompanyURL = z
  .string()
  .regex(/^$|http(s)?:\/\/(www\.)?linkedin.com\/(company)\/[A-z0-9_%-]+/, {
    message: "Please insert a valid LinkedIn company URL",
  })
  .optional()
  .default("")

export const jobTitle = z
  .string()
  .min(2, {
    message: "This field's value should be at least 2 characters long",
  })
  .regex(/^[A-Za-z\s]*$/, {
    message: "Only English characters and space are allowed",
  })

export const companyName = z
  .string()
  .min(2, { message: "The value should be at least 2 characters long" })
  .refine(
    (companyName) => companyName.match(/^[A-Za-z0-9\s\(\)\/\&\'\,\.\-]+/),
    {
      message: "Only English characters allowed",
    },
  )

export const companyNameWithServerValidation = companyName.refine(
  async (companyName) => {
    if (!companyName.length) {
      return false
    }

    const queryClient = new QueryClient()

    const { data: { list = [] } = {} } = await queryClient.fetchQuery(
      [FIND_BY_NAME_QUERY_KEY, companyName],
      () => fetchFindCompaniesByName(companyName),
    )

    const matchingCompany = list.find((i) => i.name === companyName)

    return Boolean(matchingCompany)
  },
  { message: "Company not found" },
)

export const companyDescriptionTags = z
  .string()
  .array()
  .nonempty({ message: "Select at least 1 value" })

export const websiteURL = z
  .string()
  .min(1, { message: "This field is required" })
  .refine(
    (url) =>
      url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      ),
    {
      message: "The value must be a valid website URL",
    },
  )

export const booleanRequiredTrue = z.boolean().refine((v) => v === true, {
  message: "This field is required",
})
