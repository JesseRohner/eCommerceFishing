import { isValid } from "date-fns"
import isEqual from "lodash.isequal"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { createContext, ReactNode, useEffect, useState } from "react"
import { MessageDescriptor, useIntl } from "react-intl"

import { FILTER_GROUP_ID_URL_PREFIX } from "@hooks/api/useCompanies"

export type TableFilter = {
  id: string
  label?: MessageDescriptor
  value: string | [number, number]
  valueBoundaries?: [number, number]
  touched?: boolean
}

export type TableFilterGroup = Omit<TableFilter, "value"> & {
  options?: TableFilterGroupOptions
  sections: Array<TableFilterSection>
}

export type TableFilterGroupOptions = {
  isSearchable?: boolean
  hideSelectAllCheckbox?: boolean
  containerHeight?: "default" | "auto"
}

export type TableFilterSection = {
  id: string
  name?: MessageDescriptor
  options?: TableFilterSectionOptions
  items: Array<TableFilterItem>
}

export type TableFilterSectionOptions = {
  isParentControl?: boolean
}

export type TableFilterItem = TableFilter & {
  translatedLabel?: string
  labelValues?: Record<string, string>

  selected?: boolean

  isValid?: boolean
}

export type TableFilterItemWithGroupAndSection = TableFilterItem & {
  _group: TableFilterGroup
  _section: TableFilterSection
}

export type TableFilterStateType = "perm" | "temp"

export type SetFilterItemReturnFn = (
  filterGroupId?: string,
  filterSectionId?: string,
  filterItemId?: string,
  updateIn?: TableFilterStateType,
) => void

export interface TableFiltersContextInterface {
  filters: Array<TableFilterGroup>

  searchValue: string
  setSearchValue: (value: string) => void

  setFilterItem: (
    callback: (filterItem: TableFilterItem) => TableFilterItem,
  ) => SetFilterItemReturnFn

  selectFilter: SetFilterItemReturnFn
  deselectFilter: SetFilterItemReturnFn

  getSelectedFilters: (
    filterGroupId?: string,
    filterSectionId?: string,

    checkIn?: TableFilterStateType,
  ) => {
    selectedItems: Array<TableFilterItemWithGroupAndSection>
    totalItemsCount: number
  }

  isTempEqualToPerm: () => boolean
  isGroupValid: (
    filterGroupId: string,
    checkIn?: TableFilterStateType,
  ) => boolean

  applyTempToPerm: () => void
  applyPermToTemp: () => void

  resetFiltersState: (resetIn?: TableFilterStateType) => void
}

const TableFiltersContext = createContext<TableFiltersContextInterface>(
  undefined!,
)

export const deepUpdateFiltersState =
  (filterGroupList: Array<TableFilterGroup>) =>
  (
    callback: (
      filterGroup: TableFilterGroup,
      filterSection: TableFilterSection,
      filterItem: TableFilterItem,
    ) => TableFilterItem,

    filterGroupId?: string,
    filterSectionId?: string,
    filterItemId?: string,
  ) =>
    filterGroupList.map((filterGroup) => {
      if (filterGroupId && filterGroupId !== filterGroup.id) {
        return filterGroup
      }

      return {
        ...filterGroup,
        sections: filterGroup.sections.map((filterSection) => {
          if (filterSectionId && filterSectionId !== filterSection.id) {
            return filterSection
          }

          return {
            ...filterSection,
            items: filterSection.items.map((filterItem) => {
              if (filterItemId && filterItemId !== filterItem.id) {
                return filterItem
              }

              return callback(filterGroup, filterSection, filterItem)
            }),
          }
        }),
      }
    })

export const TableFiltersProvider: React.FC<{
  filters: Array<TableFilterGroup>

  query: ParsedUrlQuery

  children?: ReactNode
}> = ({
  filters: filtersSource,

  query,

  children,
}) => {
  const intl = useIntl()
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>("")

  const initialTableFiltersState = (
    getInitialValuesFromQueryObj: boolean = true,
  ) =>
    deepUpdateFiltersState(filtersSource)((filterGroup, _, filterItem) => ({
      ...filterItem,
      ...(filterItem.label && {
        translatedLabel: intl.formatMessage(
          filterItem.label,
          filterItem.labelValues,
        ),
      }),
      ...(getInitialValuesFromQueryObj && {
        selected: !!(
          query[
            `${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`
          ] as string
        )
          ?.split(",")
          .includes(filterItem.value.toString()),
        touched:
          !!(
            query[
              `${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`
            ] as string
          )
            ?.split(",")
            .includes(filterItem.value.toString()) ||
          (
            query[
              `${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`
            ] as string
          )
            ?.split(",")
            .every((value, idx) =>
              isNaN(Number(value)) || !Array.isArray(filterItem.valueBoundaries)
                ? false
                : idx === 0
                ? filterItem.valueBoundaries[idx] <= Number(value)
                : idx === 1
                ? filterItem.valueBoundaries[idx] >= Number(value)
                : false,
            ),
        value:
          typeof filterItem.valueBoundaries !== "undefined"
            ? (query[
                `${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`
              ] as string)
              ? ((
                  query[
                    `${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`
                  ] as string
                )
                  ?.split(",")
                  .map(Number) as [number, number])
              : filterItem.valueBoundaries
            : filterItem.value,
      }),
    }))

  const [filters, setFilters] = useState<Array<TableFilterGroup>>(
    initialTableFiltersState(true),
  )
  const [filtersTemp, setFiltersTemp] = useState<Array<TableFilterGroup>>(
    initialTableFiltersState(true),
  )

  useEffect(() => {
    const nextQueryObj = filters.reduce(
      (filterGroupAcc, filterGroup) => ({
        ...filterGroupAcc,
        [`${FILTER_GROUP_ID_URL_PREFIX}${filterGroup.id.toLowerCase()}`]:
          filterGroup.sections
            .reduce(
              (filterSectionAcc, filterSection) => [
                ...filterSectionAcc,
                ...filterSection.items
                  .filter(
                    ({ selected, touched, value }) =>
                      touched && (selected || Array.isArray(value)),
                  )
                  .map(({ value }) => value?.toString()),
              ],
              [] as Array<string>,
            )
            .join(","),
      }),
      router.query as Record<string, string>,
    )

    router.query = Object.keys(nextQueryObj)
      .filter((key) => !!nextQueryObj[key])
      .reduce((acc, key) => ({ ...acc, [key]: nextQueryObj[key] }), {})

    if (Object.keys(router.query).length) {
      router.push(router)
    }
  }, [filters])

  useEffect(() => {
    setFilters(initialTableFiltersState(true))
    setFiltersTemp(initialTableFiltersState(true))
  }, [router.asPath])

  const deepUpdateState = deepUpdateFiltersState(filters)
  const deepUpdateStateTemp = deepUpdateFiltersState(filtersTemp)

  const setFilterItem: TableFiltersContextInterface["setFilterItem"] =
    (callback) =>
    (
      filterGroupId?: string,
      filterSectionId?: string,
      fitlerItemId?: string,

      updateIn: TableFilterStateType = "temp",
    ) => {
      const [setFiltersFn, deepUpdateFn] =
        updateIn === "perm"
          ? [setFilters, deepUpdateState]
          : [setFiltersTemp, deepUpdateStateTemp]

      setFiltersFn(
        deepUpdateFn(
          (_, __, filterItem) => callback(filterItem),
          filterGroupId,
          filterSectionId,
          fitlerItemId,
        ),
      )
    }

  const selectFilter: TableFiltersContextInterface["selectFilter"] =
    setFilterItem((filterItem) => ({
      ...filterItem,
      selected: true,
      touched: true,
    }))

  const deselectFilter: TableFiltersContextInterface["deselectFilter"] =
    setFilterItem((filterItem) => ({
      ...filterItem,
      selected: false,
      touched: false,
    }))

  const getSelectedFilters: TableFiltersContextInterface["getSelectedFilters"] =
    (filterGroupId, filterSectionId, checkIn = "temp") => {
      const filterGroupList = checkIn === "perm" ? filters : filtersTemp

      return filterGroupList.reduce(
        (filterGroupAcc, filterGroup) => {
          if (filterGroupId && filterGroupId !== filterGroup.id) {
            return filterGroupAcc
          }

          const { selectedItems, totalItemsCount } =
            filterGroup.sections.reduce(
              (filterSectionAcc, filterSection) => {
                if (filterSectionId && filterSectionId !== filterSection.id) {
                  return filterSectionAcc
                }

                return {
                  selectedItems: [
                    ...filterSectionAcc.selectedItems,
                    ...filterSection.items
                      .filter(
                        ({ selected, touched, value }) =>
                          touched && (selected || Array.isArray(value)),
                      )
                      .map((filterItem) => ({
                        ...filterItem,
                        _group: filterGroup,
                        _section: filterSection,
                      })),
                  ],
                  totalItemsCount:
                    filterSectionAcc.totalItemsCount +
                    filterSection.items.length,
                }
              },
              {
                selectedItems: [] as Array<TableFilterItemWithGroupAndSection>,
                totalItemsCount: 0,
              },
            )

          return {
            selectedItems: [...filterGroupAcc.selectedItems, ...selectedItems],
            totalItemsCount: filterGroupAcc.totalItemsCount + totalItemsCount,
          }
        },
        {
          selectedItems: [] as Array<TableFilterItemWithGroupAndSection>,
          totalItemsCount: 0,
        },
      )
    }

  const isTempEqualToPerm: TableFiltersContextInterface["isTempEqualToPerm"] =
    () => isEqual(filters, filtersTemp)

  const isGroupValid: TableFiltersContextInterface["isGroupValid"] = (
    filterGroupId,

    checkIn = "temp",
  ) => {
    const filterGroupList = checkIn === "perm" ? filters : filtersTemp

    const filterGroup = filterGroupList.find(
      (filterGroup) => filterGroupId === filterGroup.id,
    )

    if (!filterGroup) {
      return false
    }

    return filterGroup.sections.every((filterSection) =>
      filterSection.items
        .filter((filterItem) => Array.isArray(filterItem.value))
        .every(
          (filterItem) =>
            isValid(new Date(Number(filterItem.value[0]), 1, 1)) &&
            isValid(new Date(Number(filterItem.value[1]), 1, 1)) &&
            Number(filterItem.value[0]) <= Number(filterItem.value[1]),
        ),
    )
  }

  const applyTempToPerm: TableFiltersContextInterface["applyTempToPerm"] =
    () => {
      setFilters(filtersTemp)
    }

  const applyPermToTemp: TableFiltersContextInterface["applyPermToTemp"] =
    () => {
      setFiltersTemp(filters)
    }

  const resetFiltersState: TableFiltersContextInterface["resetFiltersState"] = (
    resetIn?: TableFilterStateType,
  ) => {
    if (resetIn === "perm") {
      setFilters(initialTableFiltersState(false))
    } else if (resetIn === "temp") {
      setFiltersTemp(initialTableFiltersState(false))
    } else {
      setFilters(initialTableFiltersState(false))
      setFiltersTemp(initialTableFiltersState(false))
    }
  }

  const providerValue = {
    filters: filtersTemp,

    searchValue,
    setSearchValue,

    setFilterItem,

    selectFilter,
    deselectFilter,

    getSelectedFilters,

    isTempEqualToPerm,
    isGroupValid,

    applyTempToPerm,
    applyPermToTemp,

    resetFiltersState,
  }

  return (
    <TableFiltersContext.Provider value={providerValue}>
      {children}
    </TableFiltersContext.Provider>
  )
}

export default TableFiltersContext
