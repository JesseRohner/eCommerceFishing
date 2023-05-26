import {
  ColumnDef,
  PaginationState,
  Row,
  VisibilityState,
} from "@tanstack/react-table"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"

import {
  FILTER_GROUP_ID_URL_PREFIX,
  PAGINATION_URL_PREFIX,
} from "@hooks/api/useCompanies"

import Button from "@components/Button"
import ClientOnlyPortal from "@components/ClientOnlyPortal"
import Container from "@components/Container"
import Pagination from "@components/Pagination"
import Table, { TableProps } from "@components/Table"
import TableFilterDeselectors from "@components/TableFilterDeselectors"
import TableFilters, {
  TableFilter,
  TableFilterGroup,
  TableFiltersProps,
  TableFiltersProvider,
} from "@components/TableFilters"

type DatabaseProps<DataType> = TableFiltersProps & {
  suggestedFiltersEnabled?: boolean

  tableOptions?: TableProps<DataType>["options"]

  columns: ColumnDef<DataType>[]
  columnVisibility?: VisibilityState

  onRowClick?: (row: Row<DataType>) => unknown

  data: DataType[]
  dataTotalLength: number
  dataTotalPages: number
  dataIsLoading?: boolean

  suggestedFilters?: Array<TableFilter>
  filters?: Array<TableFilterGroup>

  query: ParsedUrlQuery
}

const Database = <DataType,>({
  columns,
  columnVisibility,

  onRowClick,

  data,
  dataTotalLength,
  dataTotalPages,
  dataIsLoading,

  suggestedFilters,
  filters = [],

  tableOptions,

  query,

  hasSearch,

  // TODO: Remove default value once auth is added
  searchEnabled = true,
  // TODO: Remove default value once auth is added
  suggestedFiltersEnabled = true,
  filtersEnabled,
}: DatabaseProps<DataType>) => {
  const router = useRouter()

  const {
    [`${PAGINATION_URL_PREFIX}page`]: currentPageQP,
    [`${PAGINATION_URL_PREFIX}size`]: pageSizeQP,
  } = query

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: isNaN(Number(currentPageQP)) ? 0 : Number(currentPageQP) - 1,
    pageSize: isNaN(Number(pageSizeQP)) ? 25 : Number(pageSizeQP),
  })

  useEffect(() => {
    const {
      [`${PAGINATION_URL_PREFIX}page`]: currentPageQP,
      [`${PAGINATION_URL_PREFIX}size`]: pageSizeQP,
    } = router.query

    let nextPaginationState = { ...pagination }
    let nextCurrentPage = Number(currentPageQP) - 1

    if (currentPageQP && nextCurrentPage !== pagination.pageIndex) {
      nextPaginationState = {
        ...nextPaginationState,
        pageIndex: nextCurrentPage,
      }
    }

    if (pageSizeQP && Number(pageSizeQP) !== pagination.pageSize) {
      nextPaginationState = {
        ...nextPaginationState,
        pageSize: Number(pageSizeQP),
      }
    }

    if (
      nextPaginationState.pageIndex !== pagination.pageIndex ||
      nextPaginationState.pageSize !== pagination.pageSize
    ) {
      setPagination(nextPaginationState as PaginationState)
    }
  }, [router.query])

  const displayCurrentPage = pagination.pageIndex * pagination.pageSize + 1
  let displayPageSize =
    pagination.pageIndex * pagination.pageSize + pagination.pageSize

  displayPageSize =
    displayPageSize < dataTotalLength ? displayPageSize : dataTotalLength

  const paginationState = useMemo(
    () => (
      <FormattedMessage
        id="database.pagination.state"
        defaultMessage="Showing {currentPage} - {pageSize} of {dataLength} companies"
        values={{
          currentPage: displayCurrentPage,
          pageSize: displayPageSize,
          dataLength: dataTotalLength,
        }}
      />
    ),
    [displayCurrentPage, displayPageSize, dataTotalLength],
  )

  useEffect(() => {
    if (dataTotalPages > 0) {
      const currentPageQP = router.query["p.page"]

      const newPageIndexValue =
        Number(router.query["p.page"]) - 1 >= dataTotalPages
          ? "1"
          : (pagination.pageIndex + 1).toString()

      let shouldPushRouterQuery = false

      if (currentPageQP) {
        if (newPageIndexValue !== currentPageQP) {
          router.query = {
            ...router.query,
            "p.page": newPageIndexValue,
          }

          shouldPushRouterQuery = true
        }
      } else {
        router.query = {
          ...router.query,
          "p.page": "1",
        }

        shouldPushRouterQuery = true
      }

      if (shouldPushRouterQuery) {
        router.push(router)
      }
    }
  }, [pagination.pageIndex, pagination.pageSize, dataTotalPages])

  const hasSelectedFilters = Boolean(
    Object.keys(router.query).filter((key) =>
      key.startsWith(FILTER_GROUP_ID_URL_PREFIX),
    ).length,
  )

  return (
    <TableFiltersProvider filters={filters} query={query}>
      {suggestedFilters?.length && (
        <Container className="mt-4 hidden sm:block">
          <div className="flex flex-wrap space-x-2">
            {suggestedFilters.map(({ id, label }) => (
              <Button
                key={`boolean-filter-button-${id}`}
                shape="pill"
                colourScheme="white"
                isDisabled
              >
                <FormattedMessage {...label} />
              </Button>
            ))}
          </div>
        </Container>
      )}

      {(hasSearch || filters?.length) && (
        <Container className="mt-4 sticky sm:static left-0 right-0">
          <TableFilters
            hasSearch={hasSearch}
            searchEnabled={searchEnabled}
            filtersEnabled={filtersEnabled}
          />
        </Container>
      )}

      {hasSelectedFilters && (
        <Container className="mt-4 sm:mt-5 sticky sm:static left-0 right-0">
          <TableFilterDeselectors />
        </Container>
      )}

      <Container className="mt-4 sm:mt-5 text-sm text-blue-600 sticky sm:static left-0 right-0">
        <div className="flex items-center">
          {paginationState}

          {/* TODO: Uncomment once the functionality is defined */}
          {/* <div className="hidden sm:flex flex-grow justify-end space-x-3">
            <Button>
              <FormattedMessage
                id="database.project_alert.set_project_alert_button"
                defaultMessage="Set Project Alert"
              />
            </Button>
            <Button colourScheme="white" leftIcon={<BellIcon />}>
              <FormattedMessage
                id="database.project_alert.project_alerts_button"
                defaultMessage="Project Alerts"
              />
            </Button>
          </div> */}
        </div>
      </Container>

      <Container className="mt-4 sm:mt-5 pb-7">
        <Table
          data={data}
          dataIsLoading={dataIsLoading}
          columns={columns}
          columnVisibility={columnVisibility}
          onRowClick={onRowClick}
          pagination={pagination}
          options={tableOptions}
        />
      </Container>

      <ClientOnlyPortal selector="#fixed-bottom">
        <div className="w-full border-t border-t-blue-100 text-sm text-blue-600 py-3">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Pagination
                  currentPage={pagination.pageIndex + 1}
                  totalItems={dataTotalLength}
                  itemsPerPage={pagination.pageSize}
                  onPageChange={(page: number) =>
                    setPagination({
                      pageIndex: page - 1,
                      pageSize: pagination.pageSize,
                    })
                  }
                />

                <span className="ml-4">
                  <div className="hidden sm:block">{paginationState}</div>
                  <div className="sm:hidden">
                    <FormattedMessage
                      id="database.pagination.mobile.state"
                      defaultMessage="{currentPage} - {pageSize} of {dataLength}"
                      values={{
                        currentPage: displayCurrentPage,
                        pageSize: displayPageSize,
                        dataLength: dataTotalLength,
                      }}
                    />
                  </div>
                </span>
              </div>

              <div>
                <FormattedMessage
                  id="database.pagination.items_per_page"
                  defaultMessage="Items per page"
                />
                : {pagination.pageSize}
              </div>
            </div>
          </Container>
        </div>
      </ClientOnlyPortal>
    </TableFiltersProvider>
  )
}

export default Database
