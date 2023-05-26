import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import type { GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { IntlShape, useIntl } from "react-intl"
import { dehydrate, QueryClient } from "react-query"

import Database from "@modules/Database"

import TableCompanyReputation from "@components/TableCompanyReputation"
import { TableFilter, TableFilterGroup } from "@components/TableFilters"

import useAuth from "@services/Auth/Auth.context"

import {
  CompanyRecord,
  fetchCompanies,
  filterUnacceptedQueryParams,
  QUERY_KEY as COMPANIES_ENDPOINT_KEY,
  TechnologyFamily,
  useCompanies,
} from "@hooks/api/useCompanies"

import { countryList } from "@utils/getCountries"
import { getRegionByValue, Region, regionList } from "@utils/getRegions"
import {
  getTechnologyFamilyByValue,
  technologyFamilyList,
} from "@utils/getTechnologies"

import TickCircleIcon from "@public/icons/tick-circle.svg"

/**
 * TODO: Leave this as it is for now as the filters are not completely defined.
 * TODO: This is here for rendering only.
 */
const suggestedFilters: Array<TableFilter> = [
  {
    id: "solar_developers",
    label: {
      id: "database.filters.pill.solar_developers",
      defaultMessage: "Solar Developers",
    },
    value: "f-solar_developers",
  },
  {
    id: "wind_developers",
    label: {
      id: "database.filters.pill.wind_developers",
      defaultMessage: "Wind Developers",
    },
    value: "f-wind_developers",
  },
  {
    id: "other_renewables_developers",
    label: {
      id: "database.filters.pill.other_renewables_developers",
      defaultMessage: "Other Renewables Developers",
    },
    value: "f-other_renewables_developers",
  },
  {
    id: "non_renewables_developers",
    label: {
      id: "database.filters.pill.non_renewables_developers",
      defaultMessage: "Non Renewables Developers",
    },
    value: "f-non_renewables_developers",
  },
  {
    id: "infrastructure_developers",
    label: {
      id: "database.filters.pill.infrastructure_developers",
      defaultMessage: "Infrastructure Developers",
    },
    value: "f-infrastructure_developers",
  },
]

const filters: Array<TableFilterGroup> = [
  {
    id: "reputation",
    label: {
      id: "database.filters.category.reputation",
      defaultMessage: "Reputation",
    },
    options: { isSearchable: true },
    sections: [],
  },
  {
    id: "technology_families",
    label: {
      id: "database.filters.category.technologies",
      defaultMessage: "Technologies",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "technologies-items",
        items: technologyFamilyList.map((t, idx) => ({
          id: `technologies-item-${idx}`,
          ...t,
        })),
      },
    ],
  },
  {
    id: "regions",
    label: {
      id: "database.filters.category.regions",
      defaultMessage: "Regions",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "regions-items",
        items: regionList.map((region, idx) => ({
          id: `regions-item-${idx}`,
          label: region.label,
          value: region.value.toString(),
        })),
      },
    ],
  },
  {
    id: "headquarters",
    label: {
      id: "database.filters.category.hq",
      defaultMessage: "HQ",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "hq-items",
        items: countryList.map((country, idx) => ({
          ...country,
          id: `hq-item-${idx}`,
        })),
      },
    ],
  },
  {
    id: "founded",
    label: {
      id: "database.filters.category.founded",
      defaultMessage: "Founded",
    },
    options: {
      isSearchable: false,
      hideSelectAllCheckbox: true,
      containerHeight: "auto",
    },
    sections: [
      {
        id: "founded-range",
        items: [
          {
            id: "founded-range-item",
            value: [1900, new Date().getFullYear()],
            valueBoundaries: [1900, new Date().getFullYear()],
          },
        ],
      },
    ],
  },
  {
    id: "headcount",
    label: {
      id: "database.filters.category.headcount",
      defaultMessage: "Headcount",
    },
    options: { isSearchable: true },
    sections: [
      {
        id: "headcount-items",
        items: [
          "0-1",
          "2-10",
          "11-50",
          "51-200",
          "201-500",
          "501-1000",
          "1001-5000",
          "5001-10000",
          "10001+",
        ].map((count, idx) => ({
          id: `headcount-item-${idx}`,
          label: {
            id: "database.filters.category.headcount.item",
            defaultMessage: "{employeeCount} employees",
          },
          labelValues: { employeeCount: count },
          value: idx.toString(),
        })),
      },
    ],
  },
]

const columnHelper = createColumnHelper<CompanyRecord>()

const getTranslatedColumns = (
  intl: IntlShape,
): ColumnDef<CompanyRecord, any>[] => [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("reviewed_on", {}),
  columnHelper.accessor("name", {
    id: "name_mobile_visible",
    size: 224,
    cell: ({ getValue, row }) => (
      <span className="font-medium text-blue-900">
        <>
          {getValue()}
          {row.getValue("reviewed_on") && (
            <TickCircleIcon className="inline-flex -mt-0.5 ml-1 fill-green-600 [&_circle]:fill-blue-900 w-5 h-5" />
          )}
        </>
      </span>
    ),
  }),
  columnHelper.accessor("reputation", {
    size: 112,
    cell: ({ getValue, row }) => {
      // TODO: Get rid of this
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()

      const { ["p.page"]: currentPage = 1, ["p.size"]: pageSize = 25 } =
        router.query

      return (
        <TableCompanyReputation
          index={row.index + 1 + (Number(currentPage) - 1) * Number(pageSize)}
          value={getValue()}
        />
      )
    },
  }),
  columnHelper.accessor("name", {
    id: "name_mobile_hidden",
    size: 224,
    cell: ({ getValue, row }) => (
      <span className="font-medium text-blue-900">
        <>
          {getValue()}
          {row.getValue("reviewed_on") && (
            <TickCircleIcon className="inline-flex -mt-0.5 ml-1 fill-green-600 [&_circle]:fill-blue-900 w-5 h-5" />
          )}
        </>
      </span>
    ),
  }),
  columnHelper.accessor("type", {
    size: 120,
    cell: ({ getValue }) => getValue().join(", ") || "-",
  }),
  columnHelper.accessor("technology_families", {
    id: "technologies",
    size: 260,
    header: "Technologies",
    cell: ({ getValue }) => {
      const value = getValue()

      return Array.isArray(value) && value.length
        ? (value as Array<TechnologyFamily>)
            .map(getTechnologyFamilyByValue)
            .filter(Boolean)
            .map((t) => intl.formatMessage(t!.label))
            .join(", ")
        : "-"
    },
  }),
  columnHelper.accessor("regions", {
    size: 240,
    cell: ({ getValue }) =>
      getValue()
        ? getValue()
            .map(getRegionByValue)
            .map(({ label }: Region) => intl.formatMessage(label))
            .join(", ")
        : "-",
  }),
  columnHelper.accessor("hq_text", {
    size: 200,
    header: "HQ",
    cell: ({ getValue }) => getValue() || "-",
  }),
]

const Lenders: NextPage = ({ query }: any) => {
  const intl = useIntl()
  const router = useRouter()
  const { isAuthValid } = useAuth()
  const {
    data: {
      data: {
        list = [],
        page: { total_items = 25, total_pages = 0 } = {},
      } = {},
    } = {},
    isLoading,
    dataUpdatedAt,
  } = useCompanies(query)
  const [dataTotalLength, setDataTotalLength] = useState(total_items)
  const [dataTotalPages, setDataTotalPages] = useState(total_pages)
  const columns = useMemo(() => getTranslatedColumns(intl), [intl])

  useEffect(() => {
    if (!isLoading) {
      setDataTotalLength(total_items)
      setDataTotalPages(total_pages)
    }
  }, [dataUpdatedAt])

  const columnVisibility: { [k in keyof CompanyRecord]?: boolean } = {
    id: false,
    reviewed_on: false,
  }

  // Temporary value
  const isPremium = true

  const filtersEnabled = isAuthValid() && isPremium

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
        const companyId = row.getValue("id")

        if (companyId) {
          router.push(`/company/${companyId}`)
        }
      }}
      hasSearch
      filtersEnabled={filtersEnabled}
      query={query}
    />
  )
}

export const getServerSideProps = async ({
  query: _query,
}: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()

  // TODO: Get rid of this hack
  const query = {
    "p.page": "1",
    "p.size": "25",
    ..._query,
    "f.type": "Lender",
  }

  await queryClient.prefetchQuery(
    [COMPANIES_ENDPOINT_KEY, filterUnacceptedQueryParams(query)],
    () => fetchCompanies(query),
  )

  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Lenders
