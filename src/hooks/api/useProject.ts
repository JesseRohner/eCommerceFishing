import axios from "axios"
import { useQuery } from "react-query"

import {
  TechnologyFamilyEnergy,
  TechnologyFamilyInfra,
  TechnologyFamilyOther,
  TechnologyFamilySolar,
  TechnologyFamilyWind,
} from "@hooks/api/useCompanies"

export const QUERY_KEY = "api/project"
export const ENDPOINT_URL = "/projects/publicid"

export enum ProjectStatus {
  Unapproved = "Unapproved",
  NotSuitable = "Not-Suitable",

  Live = "Live",
  Draft = "Draft",

  ContractPending = "Contract-Pending",
  ContractDeclined = "Contract-Declined",

  ClosedSuccess = "Closed-Success",
  ClosedElsewhere = "Closed-Elsewhere",
  ClosedAborted = "Closed-Aborted",
}

export type ProjectRecord = {
  publicid?: string

  featured?: boolean
  created_on?: string

  title?: string
  details?: string
  technology?:
    | TechnologyFamilyEnergy
    | TechnologyFamilyInfra
    | TechnologyFamilyOther
    | TechnologyFamilySolar
    | TechnologyFamilyWind
  country?: string
  capital?: string
  capitaltype?: Array<string>
  projectstage?: string
  projectstatus?: ProjectStatus

  use_of_funds?: string

  debt_arranged?: {
    equityarranged: number
    equityraising: number
    debtarranged: number
    debtraising: number
  }

  financialmodel?: "Yes" | "No"
  sale?: "Yes" | "No"
  advisorintros?: "Restrict" | "Open"

  mwh_pa_selling?: number
  mwp_generation?: number
  mwh_pa_production?: number

  investor_epc?: "Yes" | "No"

  offtake?: string
  offtake_party?: string

  ppa_take_pay?: "Yes" | "No"
  ppa_tariff?: number
  ppa_length?: number

  usertype?: "Project"
}

export const fetchProject = async (projectId: string) => {
  const { data } = await axios.get<PFNResponse<ProjectRecord>>(ENDPOINT_URL, {
    params: {
      publicid: projectId,
    },
  })

  return data
}

export const useProject = (projectId: string) =>
  useQuery([QUERY_KEY, projectId], () => fetchProject(projectId))
