import axios from "axios"
import { ParsedUrlQuery } from "querystring"
import { useMutation, useQuery } from "react-query"

export const ENDPOINT_URL = "/companies"
export const QUERY_KEY = "api/companies"

export const FIND_BY_NAME_ENDPOINT = `${ENDPOINT_URL}/findbyname`
export const FIND_BY_NAME_QUERY_KEY = `api/${FIND_BY_NAME_ENDPOINT}`

export const COMPANIES_CREATE_ENDPOINT = `${ENDPOINT_URL}/create`
export const COMPANIES_CREATE_QUERY_KEY = `api/${COMPANIES_CREATE_ENDPOINT}`

// Accepted Query Param Prefixes - Start
export const FILTER_GROUP_ID_URL_PREFIX = "f."
export const SEARCH_URL_PREFIX = "s."
export const PAGINATION_URL_PREFIX = "p."
export const ORDER_URL_PREFIX = "o."
// Accepted Query Param Prefixes - End

export enum TechnologyFamily {
  // Solar
  Solar = "Solar",
  // Wind
  Wind = "Wind",
  // Other Renewables
  Other = "Other",
  // Energy Storage
  Energy = "Energy",
  // Non-Renewable Energy
  NonRen = "NonRen",
  // Infrastructure & Other
  Infra = "Infra",
}

export enum TechnologyFamilySolar {
  // Solar PV - Utility-scale
  SolPVUti = "SolPVUti",
  // Solar PV - C&I
  SolPVCIn = "SolPVCIn",
  // Solar PV - Residential
  SolPVRes = "SolPVRes",
  // Solar CSP
  SolCSPow = "SolCSPow",
}

export enum TechnologyFamilyWind {
  // Onshore Wind
  WinOnsho = "WinOnsho",
  // Offshore Wind - Fixed
  WinOfFix = "WinOfFix",
  // Offshore Wind - Floating
  WinOfFlo = "WinOfFlo",
}

export enum TechnologyFamilyOther {
  // Geothermal",
  OthGeoth = "OthGeoth",
  // Hydrogen Production",
  OthHydPr = "OthHydPr",
  // Anaerobic Digestion
  OthAnaer = "OthAnaer",
  // Biogass
  OthBioga = "OthBioga",
  // Biomass
  OthBioma = "OthBioma",
  // Combined Heat & Power (CHP)
  OthCHPow = "OthCHPow",
  // Energy from Waste (EfW / WtE)
  OthEfWas = "OthEfWas",
  // OthTidal / Marine Energy
  OthTidal = "OthTidal",
  // Hybrid Plants
  OthHybPl = "OthHybPl",
  // Hydropower
  OthHydPw = "OthHydPw",
  // Other Renewables
  OthRenew = "OthRenew",
}

export enum TechnologyFamilyEnergy {
  // Battery Storage
  EneBatSt = "EneBatSt",
  // Fuel Cells
  EneFuCel = "EneFuCel",
  // Hydrogen Storage
  EneHydro = "EneHydro",
  // Other Energy Storage
  EneOther = "EneOther",
}

export enum TechnologyFamilyInfra {
  // Electric Vehicle (EV)
  InfEleVe = "InfEleVe",
  // Energy Balancing
  InfEnBal = "InfEnBal",
  // Energy Distribution / Grids
  InfEnDis = "InfEnDis",
  // Energy Efficiency
  InfEnEff = "InfEnEff",
  // Heat Networks
  InfHeNet = "InfHeNet",
  // Other Infrastructure
  InfOther = "InfOther",
}

export type CompanyRecord = {
  id: number
  name?: string
  type?: Array<string>
  description?: string
  founded_year?: string
  icon_url: string

  website?: string
  linkedin_page?: string

  regions?: Array<number>

  reputation?: number
  technology_families?: Array<TechnologyFamily>
  sectors?: string

  employee_band?: string

  hq_text?: string
  hq_iso?: string

  reviewed_on?: string
}

export enum CompanyPersona {
  IPP = "IPP",
  CleanEnergy = "CleanEnergy",
  EarlyDeveloper = "EarlyDeveloper",
  Utility = "Utility",
  FundManager = "FundManager",
  SovereignWealth = "SovereignWealth",
  FamilyOffice = "FamilyOffice",
  PensionFund = "PensionFund",
  Bank = "Bank",
  DebtFund = "DebtFund",
  DFI = "DFI",
  ECA = "ECA",
  Other = "Other",
}

export const filterUnacceptedQueryParams = (
  queryObj: ParsedUrlQuery = {},
): ParsedUrlQuery => {
  return Object.keys(queryObj)
    .filter((key) =>
      [
        FILTER_GROUP_ID_URL_PREFIX,
        SEARCH_URL_PREFIX,
        PAGINATION_URL_PREFIX,
        ORDER_URL_PREFIX,
      ].some((prefix) => key.startsWith(prefix)),
    )
    .reduce((acc, key) => ({ ...acc, [key]: queryObj[key] }), {})
}

export const fetchCompany = async (companyId: string) => {
  const { data } = await axios.get<PFNResponse<CompanyRecord>>(
    `${ENDPOINT_URL}/${companyId}`,
  )

  return data
}

export const fetchCompanies = async (queryObj: ParsedUrlQuery = {}) => {
  const acceptedQueryObj = filterUnacceptedQueryParams(queryObj)
  const mappedQueryObj: { [key in string]: string } = {}

  // Pagination Query parameters - Start
  if (acceptedQueryObj["p.page"]) {
    mappedQueryObj["_page"] = acceptedQueryObj["p.page"] as string
  }

  if (acceptedQueryObj["p.size"]) {
    mappedQueryObj["_per_page"] = acceptedQueryObj["p.size"] as string
  }
  // Pagination Query parameters - End

  if (acceptedQueryObj["o.order"]) {
    mappedQueryObj["_order"] = acceptedQueryObj["o.order"] as string
  }

  if (acceptedQueryObj["o.sort"]) {
    mappedQueryObj["_sort"] = acceptedQueryObj["o.sort"] as string
  }

  // Table Filter parameters - Start
  const dbQueryParams = Object.keys(acceptedQueryObj)
    .filter((key) => key.startsWith(FILTER_GROUP_ID_URL_PREFIX))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key.replace(FILTER_GROUP_ID_URL_PREFIX, "")]: (acceptedQueryObj[
          key
        ] as string)!
          .split(",")
          .map((value) => (isNaN(Number(value)) ? value : Number(value))),
      }),
      {},
    )

  if (Object.keys(dbQueryParams).length) {
    mappedQueryObj["_where"] = JSON.stringify(dbQueryParams)
  }
  // Table Filter parameters - End

  const { data } = await axios.get<
    PFNResponse<{
      list: Array<CompanyRecord>
      page: {
        page_number?: number
        page_size?: number
        total_items?: number
        total_pages?: number
      }
    }>
  >(ENDPOINT_URL, {
    params: mappedQueryObj,
  })

  return data
}

export const fetchFindCompaniesByName = async (name: string) => {
  const { data } = await axios.get<PFNResponse<{ list: Array<CompanyRecord> }>>(
    FIND_BY_NAME_ENDPOINT,
    {
      params: { _page: 1, _per_page: 100, _where: { name } },
    },
  )

  return data
}

export const useCompany = (companyId: string) =>
  useQuery([`${QUERY_KEY}/${companyId}`], () => fetchCompany(companyId))

export const useCompanies = (queryObj: ParsedUrlQuery) => {
  const acceptedQueryObj = filterUnacceptedQueryParams(queryObj)

  return useQuery([QUERY_KEY, acceptedQueryObj], () => fetchCompanies(queryObj))
}

export const useFindCompaniesByName = (name: string, enabled?: boolean) =>
  useQuery(
    [FIND_BY_NAME_QUERY_KEY, name],
    () => fetchFindCompaniesByName(name),
    { enabled: enabled ?? true },
  )

export type COMPANY_CREATE_PAYLOAD = {
  name: string
  website: string
  linkedin_page?: string
  persona: Array<CompanyPersona>
}

export const useCompanyCreate = () =>
  useMutation(
    [COMPANIES_CREATE_QUERY_KEY],
    async (payload: COMPANY_CREATE_PAYLOAD) =>
      await axios.post<{ company?: Pick<CompanyRecord, "id" | "name"> }>(
        COMPANIES_CREATE_ENDPOINT,
        payload,
      ),
  )
