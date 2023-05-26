import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { differenceInMonths } from "date-fns"
import type { GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { dehydrate, QueryClient } from "react-query"

import Database from "@modules/Database"

import Pill from "@components/Pill"
import TableDisplayProjectStatus from "@components/TableDisplayProjectStatus"
import { TableFilter, TableFilterGroup } from "@components/TableFilters"
import Tag from "@components/Tag"

import {
  BuildStage,
  CapitalType,
  fetchLiveProjects,
  QUERY_KEY as LIVE_PROJECTS_QUERY_KEY,
  useLiveProjects,
} from "@hooks/api/useLiveProjects"
import { ProjectRecord, ProjectStatus } from "@hooks/api/useProject"

import { countryList } from "@utils/getCountries"
import {
  getTechnologyByValue,
  technologiesChildrenWithParentId,
  technologyFamilyList,
} from "@utils/getTechnologies"
import { capitalForTable } from "@utils/numberFormatting"

/**
 * TODO: Leave this as it is for now as the filters are not completely defined.
 * TODO: This is here for rendering only.
 */
const suggestedFilters: Array<TableFilter> = [
  {
    id: "early_stage_and_rtb",
    label: {
      id: "database.live_projects.filters.pill.early_stage_and_rtb",
      defaultMessage: "Early Stage & RTB",
    },
    value: "f-early_stage_and_rtb",
  },
  {
    id: "equity_raises_and_m_and_a",
    label: {
      id: "database.live_projects.filters.pill.equity_raises_and_m_and_a",
      defaultMessage: "Equity Raises & M&A",
    },
    value: "f-equity_raises_and_m_and_a",
  },
  {
    id: "debt_raises",
    label: {
      id: "database.live_projects.filters.pill.debt_raises",
      defaultMessage: "Debt Raises",
    },
    value: "f-debt_raises",
  },
  {
    id: "europe",
    label: {
      id: "database.live_projects.filters.pill.europe",
      defaultMessage: "Europe",
    },
    value: "f-europe",
  },
  {
    id: "frontier_markets",
    label: {
      id: "database.live_projects.filters.pill.frontier_markets",
      defaultMessage: "Frontier Markets",
    },
    value: "f-frontier_markets",
  },
]

const filters: Array<TableFilterGroup> = [
  {
    id: "technology",
    label: {
      id: "database.live_projects.filters.category.technology",
      defaultMessage: "Technology",
    },
    options: { isSearchable: true },
    sections: technologyFamilyList.map((technologyFamily) => ({
      id: `technology-${technologyFamily.label.id}`,
      name: technologyFamily.label,
      items: technologiesChildrenWithParentId
        .filter(
          (technologyChild) =>
            technologyChild.parentId === technologyFamily.value,
        )
        .map((technologyChild) => ({
          id: `technology-${technologyChild.label.id}`,
          label: technologyChild.label,
          value: technologyChild.value.toString(),
        })),
    })),
  },
  {
    id: "country",
    label: {
      id: "database.live_projects.filters.category.country",
      defaultMessage: "Country",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "country-items",
        items: countryList.map((country, idx) => ({
          ...country,
          id: `country-item-${idx}`,
        })),
      },
    ],
  },
  {
    id: "capital",
    label: {
      id: "database.live_projects.filters.category.capital",
      defaultMessage: "Capital",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "capital-items",
        items: [
          [0, 100000000],
          [100000000, 200000000],
          [200000000, 300000000],
          [300000000, 400000000],
          [400000000, 500000000],
          [500000000, 600000000],
          [600000000, 700000000],
          [700000000, 900000000],
          [800000000, 900000000],
          [900000000, 1000000000],
        ].map((value, idx) => ({
          id: `capital-item-${value}`,
          translatedLabel: value
            .map((v) => `$${capitalForTable(v.toString(), 0)}`)
            .join(" - "),
          value: value.join("-"),
        })),
      },
    ],
  },
  {
    id: "projectstage",
    label: {
      id: "database.live_projects.filters.category.build_stage",
      defaultMessage: "Build Stage",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "projectstage-items",
        items: [
          {
            id: "projectstage-item-0",
            label: {
              id: "database.live_projects.filters.category.build_stage.item.early",
              defaultMessage: "Early",
            },
            value: BuildStage.Early,
          },
          {
            id: "projectstage-item-1",
            label: {
              id: "database.live_projects.filters.category.build_stage.item.shovel",
              defaultMessage: "Shovel",
            },
            value: BuildStage.Shovel,
          },
          {
            id: "projectstage-item-2",
            label: {
              id: "database.live_projects.filters.category.build_stage.item.operational",
              defaultMessage: "Operational",
            },
            value: BuildStage.Operational,
          },
        ],
      },
    ],
  },
  {
    id: "capitaltype",
    label: {
      id: "database.live_projects.filters.category.looking_for",
      defaultMessage: "Looking for",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "capitaltype-items",
        items: [
          {
            id: `capitaltype-item-0`,
            label: {
              id: "capital_type.debt",
              defaultMessage: "Debt",
            },
            value: CapitalType.Debt,
          },
          {
            id: `capitaltype-item-1`,
            label: {
              id: "capital_type.equity",
              defaultMessage: "Equity",
            },
            value: CapitalType.Equity,
          },
          {
            id: `capitaltype-item-2`,
            label: {
              id: "capital_type.acquisition",
              defaultMessage: "Acquisition",
            },
            value: CapitalType.Acquisition,
          },
        ],
      },
    ],
  },
  {
    id: "projectstatus",
    label: {
      id: "database.live_projects.filters.category.pf_nexus_status",
      defaultMessage: "PF Nexus Status",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "projectstatus-items",
        items: [
          {
            id: "projectstatus-item-0",
            translatedLabel: "Pre-register interest",
            value: ProjectStatus.ContractPending,
          },
          {
            id: "projectstatus-item-1",
            translatedLabel: "Introductions Open",
            value: ProjectStatus.Live,
          },
        ],
      },
    ],
  },
]

const columnHelper = createColumnHelper<ProjectRecord>()

const columns: ColumnDef<ProjectRecord, any>[] = [
  columnHelper.accessor("publicid", {}),
  columnHelper.accessor("featured", {}),
  columnHelper.accessor("created_on", {}),
  columnHelper.accessor("title", {
    header: "Project",
    size: 278,
    cell: ({ getValue, row }) => (
      <div className="space-y-0.5">
        <>
          <div className="absolute -top-px leading-3 space-x-1">
            <>
              {row.getValue("featured") && <Tag value="Featured" />}
              {row.getValue("created_on") &&
                differenceInMonths(
                  new Date(row.getValue("created_on")),
                  new Date(),
                ) === 0 && <Tag value="New" colourScheme="green" />}
            </>
          </div>

          <strong className="text-sm text-blue-900 leading-4 tracking-[0.16px] font-medium">
            {getValue()}
          </strong>

          {row.getValue("details") && (
            <p className="text-xs text-blue-600">
              {((row.getValue("details") as string) || "").substring(0, 35)}...
            </p>
          )}
        </>
      </div>
    ),
  }),
  columnHelper.accessor("details", {}),
  columnHelper.accessor("technology", {
    cell: ({ getValue }) => {
      const cellValue = getValue()

      if (!cellValue) {
        return "-"
      }

      const matchingTechnology = getTechnologyByValue(cellValue)

      if (!matchingTechnology) {
        return "-"
      }

      return (
        <Pill>
          <FormattedMessage {...matchingTechnology.label} />
        </Pill>
      )
    },
    size: 180,
  }),
  columnHelper.accessor("country", {}),
  columnHelper.accessor("capital", {
    cell: ({ getValue }) =>
      getValue() ? (
        <>
          <p className="text-blue-900 font-medium text-sm leading-4 tracking-[0.15px] -mb-1">
            ${capitalForTable(getValue())}
          </p>
          <sub className="text-xs leading-4 tracking-[0.8px]">USD</sub>
        </>
      ) : (
        "-"
      ),
  }),
  columnHelper.accessor("projectstage", {
    header: "Build Stage",
  }),
  columnHelper.accessor("capitaltype", {
    header: "Looking for",
    cell: ({ getValue }) => (getValue() ? getValue().join(", ") : "-"),
  }),
  columnHelper.accessor("projectstatus", {
    header: "Status",
    cell: ({ getValue }) =>
      getValue() ? <TableDisplayProjectStatus type={getValue()} /> : "-",
  }),
]

const LiveProjects: NextPage = ({ query }: any) => {
  const intl = useIntl()
  const router = useRouter()
  const {
    data: {
      data: {
        list = [],
        page: { total_items = 25, total_pages = 0 } = {},
      } = {},
    } = {},
    isLoading,
    dataUpdatedAt,
  } = useLiveProjects(query)
  const [dataTotalLength, setDataTotalLength] = useState(total_items)
  const [dataTotalPages, setDataTotalPages] = useState(total_pages)

  useEffect(() => {
    if (!isLoading) {
      setDataTotalLength(total_items)
      setDataTotalPages(total_pages)
    }
  }, [dataUpdatedAt])

  const columnVisibility: { [k in keyof ProjectRecord]?: boolean } = {
    publicid: false,
    featured: false,
    created_on: false,
    details: false,
  }

  return (
    <Database
      suggestedFilters={suggestedFilters}
      filters={filters}
      data={list}
      dataTotalLength={dataTotalLength}
      dataTotalPages={dataTotalPages}
      dataIsLoading={isLoading}
      columns={columns}
      columnVisibility={columnVisibility}
      onRowClick={(row) => {
        const projectId = row.getValue("publicid")

        if (projectId) {
          router.push(`/project/${projectId}`)
        }
      }}
      query={query}
      tableOptions={{ size: "lg", hasFirstColDivider: false }}
      filtersEnabled
    />
  )
}

export const getServerSideProps = async ({
  query: _query,
}: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()

  const query = {
    "p.page": "1",
    "p.size": "25",
    ..._query,
  }

  await queryClient.prefetchQuery([LIVE_PROJECTS_QUERY_KEY, query], () =>
    fetchLiveProjects(query),
  )

  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default LiveProjects
