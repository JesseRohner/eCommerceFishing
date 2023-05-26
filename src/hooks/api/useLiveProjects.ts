import axios from "axios"
import { ParsedUrlQuery } from "querystring"
import { useQuery } from "react-query"

import { ProjectRecord } from "./useProject"

export const QUERY_KEY = "api/live-projects"
export const ENDPOINT_URL = "/projects/search"

export enum BuildStage {
  Early = "Early",
  Shovel = "Shovel",
  Operational = "Operational",
}

export enum CapitalType {
  Debt = "Debt",
  Equity = "Equity",
  Acquisition = "Acquisition",
}

export const fetchLiveProjects = async (queryObj: ParsedUrlQuery = {}) => {
  const payloadObj: { [key in string]: string } = {}

  let capitalRangeObj: { [key in string]: string } = {}

  if (queryObj["p.page"]) {
    payloadObj["_page"] = queryObj["p.page"] as string
  }

  if (queryObj["p.size"]) {
    payloadObj["_per_page"] = queryObj["p.size"] as string
  }

  const dbQueryParams = Object.keys(queryObj)
    .filter((key) => key.startsWith("f.") && key !== "f.capital")
    .reduce(
      (acc, key) => ({
        ...acc,
        [key.replace("f.", "")]: (queryObj[key] as string)!
          .split(",")
          .map((value) => (isNaN(Number(value)) ? value : Number(value))),
      }),
      {},
    )

  if (queryObj["f.capital"]) {
    const selectedCapitalFiltersBoundaries = (queryObj["f.capital"] as string)
      .split(",")
      .reduce<Record<string, number | null>>(
        (acc, currRange) => {
          const [min, max] = currRange.split("-").map(Number)

          return {
            ...acc,
            ...((acc.min === null || min < acc.min) && { min }),
            ...((acc.max === null || max > acc.max) && { max }),
          }
        },
        { min: null, max: null },
      )

    capitalRangeObj.capitalticketmin =
      selectedCapitalFiltersBoundaries.min!.toString()
    capitalRangeObj.capitalticketmax =
      selectedCapitalFiltersBoundaries.max!.toString()
  }

  if (
    Object.keys(dbQueryParams).length ||
    Object.keys(capitalRangeObj).length
  ) {
    payloadObj["_where"] = JSON.stringify({
      ...dbQueryParams,
      ...capitalRangeObj,
    })
  }

  const { data } = await axios.get<
    PFNResponse<{
      list: Array<ProjectRecord>
      page: {
        page_number?: number
        page_size?: number
        total_items?: number
        total_pages?: number
      }
    }>
  >(ENDPOINT_URL, {
    params: payloadObj,
  })

  return data
}

export const useLiveProjects = (queryObj: ParsedUrlQuery) =>
  useQuery([QUERY_KEY, queryObj], () => fetchLiveProjects(queryObj))
