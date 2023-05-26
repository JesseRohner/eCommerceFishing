import { MessageDescriptor } from "react-intl"

export type CompanyType = {
  value: number
  label: MessageDescriptor
}

export const companyTypeList: Array<CompanyType> = [
  {
    value: 0,
    label: {
      id: "database.company_type.developer",
      defaultMessage: "Developer",
    },
  },
  {
    value: 1,
    label: {
      id: "database.company_type.investor",
      defaultMessage: "Investor",
    },
  },
  {
    value: 2,
    label: {
      id: "database.company_type.lender",
      defaultMessage: "Lender",
    },
  },
  {
    value: 3,
    label: {
      id: "database.company_type.advisor",
      defaultMessage: "Advisor",
    },
  },
  {
    value: 4,
    label: {
      id: "database.company_type.other",
      defaultMessage: "Other",
    },
  },
]
