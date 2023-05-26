import cx from "classnames"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Popover } from "react-tiny-popover"

import Badge from "@components/Badge"
import Button from "@components/Button"
import Checkbox from "@components/Checkbox"
import Input from "@components/Input"

import UpgradeToPremium from "@modals/UpgradeToPremium"

import { show } from "@services/ModalManager"

import { SEARCH_URL_PREFIX } from "@hooks/api/useCompanies"

import FilterPopoverContent from "./FilterPopoverContent.component"

import TableFiltersContext from "./TableFilters.context"

import ChevronIcon from "@public/icons/chevron-down-small.svg"
import FiltersIcon from "@public/icons/filters.svg"
import LockIcon from "@public/icons/lock.svg"
import SearchIcon from "@public/icons/search.svg"

export type TableFiltersProps = {
  hasSearch?: boolean

  searchEnabled?: boolean
  filtersEnabled?: boolean
}

const TableFilters: React.FC<TableFiltersProps> = ({
  hasSearch,

  searchEnabled: _searchEnabled,
  filtersEnabled,
}) => {
  const searchEnabled = false

  const intl = useIntl()
  const router = useRouter()
  const tableFiltersContext = useContext(TableFiltersContext)
  const [isMobileFilterPopoverShown, setIsMobileFilterPopoverShown] =
    useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>(
    (router.query[`${SEARCH_URL_PREFIX}query`] as string) || "",
  )
  const [openFilterIdDesktop, setOpenFilterIdDesktop] = useState<string>("")
  const [openFilterIdMobile, setOpenFilterIdMobile] = useState<string>("")

  useEffect(() => {
    tableFiltersContext.applyPermToTemp()
  }, [openFilterIdDesktop, isMobileFilterPopoverShown])

  // useEffect(() => {
  //   router.query = {
  //     ...router.query,
  //     [`${SEARCH_URL_PREFIX}query`]: searchValue,
  //   }

  //   router.push(router)
  // }, [searchValue])

  const { selectedItems: selectedItemsPerm } =
    tableFiltersContext.getSelectedFilters(undefined, undefined, "perm")

  const {
    selectedItems: selectedItemsTemp,
    totalItemsCount: totalItemsCountTemp,
  } = tableFiltersContext.getSelectedFilters()

  const searchPlaceholder = useMemo(
    () =>
      intl.formatMessage({
        id: "database.filters.search.placeholder",
        defaultMessage: "Search",
      }),
    ["database.filters.search.placeholder"],
  )

  // Icons - Start
  const searchIcon = searchEnabled ? (
    <SearchIcon />
  ) : (
    <LockIcon className="w-6 h-6" />
  )

  const filterButtonIcon = (rotateChevron: boolean) =>
    filtersEnabled ? (
      <ChevronIcon
        className={cx("fill-transparent -ml-1 mr-1", {
          "rotate-180": rotateChevron,
        })}
      />
    ) : (
      <LockIcon className="w-6 h-6 fill-blue-500 -ml-0.5 mr-1" />
    )

  const mobileFiltersButtonIcon = filtersEnabled ? (
    <FiltersIcon className="fill-blue-600" />
  ) : (
    <LockIcon className="w-6 h-6 fill-blue-600 -mx-1" />
  )
  // Icons - End

  const closeMobileFilterPopover = () => {
    setIsMobileFilterPopoverShown(false)
    setOpenFilterIdMobile("")

    tableFiltersContext.setSearchValue("")
  }

  return (
    <div className="flex bg-white px-4 py-[14px] shadow-md rounded-lg sm:overflow-x-auto">
      {/* Database Search - Start */}
      {hasSearch && (
        <div className="mr-3 sm:min-w-[220px] w-full sm:w-auto">
          <Input
            id="table-search"
            size="lg-mobile"
            leftIcon={searchIcon}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            isDisabled={!searchEnabled}
            // noDisabledStyles={!searchEnabled}
          />
        </div>
      )}
      {/* Database Search - End */}

      {Boolean(tableFiltersContext.filters.length) && (
        <>
          <div className="hidden sm:block sm:space-x-3 first-of-type:ml-0 whitespace-nowrap">
            {tableFiltersContext.filters.map(
              ({ id: filterGroupId, label, sections, options }) => {
                const { selectedItems: groupSelectedItems } =
                  tableFiltersContext.getSelectedFilters(
                    filterGroupId,
                    undefined,
                    "perm",
                  )

                return (
                  <Popover
                    key={`filter-popover-${filterGroupId}`}
                    align="start"
                    positions={["bottom"]}
                    padding={8}
                    containerClassName="z-10"
                    isOpen={openFilterIdDesktop === filterGroupId}
                    onClickOutside={() => {
                      setOpenFilterIdDesktop("")

                      tableFiltersContext.setSearchValue("")
                    }}
                    content={() => {
                      const { selectedItems, totalItemsCount } =
                        tableFiltersContext.getSelectedFilters(filterGroupId)

                      return (
                        <div
                          className={cx(
                            `
                              flex flex-col w-[340px]
                              bg-white text-blue-700 text-sm
                              rounded-lg
                              divide-y divide-blue-300
                              shadow-[0px_2px_8px_rgba(0,0,0,0.16)]
                            `,
                            {
                              "h-96":
                                !options?.containerHeight ||
                                options?.containerHeight === "default",
                              "h-auto": options?.containerHeight === "auto",
                            },
                          )}
                        >
                          <FilterPopoverContent
                            id={filterGroupId}
                            label={label}
                            sections={sections}
                            options={options}
                          />

                          <div className="flex justify-between items-center px-4 py-3">
                            {/* Desktop Filter All Items Checkbox - Start */}
                            <div>
                              {!options?.hideSelectAllCheckbox && (
                                <Checkbox
                                  id={`filter-popover-all-filters-checkbox-${filterGroupId}`}
                                  // TODO: Replace hardcoded label with translated string
                                  label={`${selectedItems.length} selected`}
                                  checked={
                                    selectedItems.length === totalItemsCount
                                      ? true
                                      : selectedItems.length === 0
                                      ? false
                                      : null
                                  }
                                  onChange={(_, prevChecked, nowChecked) => {
                                    if (prevChecked == null || nowChecked) {
                                      tableFiltersContext.selectFilter(
                                        filterGroupId,
                                      )
                                    } else {
                                      tableFiltersContext.deselectFilter(
                                        filterGroupId,
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                            {/* Desktop Filter All Items Checkbox - End */}

                            <div className="space-x-2.5">
                              {!tableFiltersContext.isTempEqualToPerm() && (
                                <Button
                                  variant="outline"
                                  colourScheme="white"
                                  onClick={() =>
                                    tableFiltersContext.applyPermToTemp()
                                  }
                                >
                                  Clear
                                </Button>
                              )}
                              <Button
                                onClick={() => {
                                  setOpenFilterIdDesktop("")

                                  tableFiltersContext.applyTempToPerm()
                                }}
                                isDisabled={
                                  tableFiltersContext.isTempEqualToPerm() ||
                                  !tableFiltersContext.isGroupValid(
                                    filterGroupId,
                                  )
                                }
                              >
                                Apply
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    }}
                  >
                    {/* Filter Popover Button - Start */}
                    <Button
                      shape="rectangle-2"
                      variant="outline"
                      colourScheme="white"
                      className="relative"
                      leftIcon={filterButtonIcon(
                        openFilterIdDesktop === filterGroupId,
                      )}
                      onClick={() => {
                        if (filtersEnabled) {
                          setOpenFilterIdDesktop(
                            openFilterIdDesktop === filterGroupId
                              ? ""
                              : filterGroupId,
                          )
                        } else {
                          // @ts-ignore
                          show(UpgradeToPremium, {
                            title: "Upgrade required",
                            subtitle: "Filtering is a premium feature.",
                          })
                        }
                      }}
                    >
                      <FormattedMessage {...label} />

                      {groupSelectedItems.length > 0 && (
                        <Badge
                          value={groupSelectedItems.length.toString()}
                          shape="circle"
                          size="lg"
                          className="absolute -top-1/4 -right-2.5"
                        />
                      )}
                    </Button>
                    {/* Filter Popover Button - End */}
                  </Popover>
                )
              },
            )}
          </div>

          {/* ? Find a way to remove this and reuse the desktop filters. Adapt UI */}
          {/* Mobile Filters - Start */}
          <Popover
            isOpen={isMobileFilterPopoverShown}
            containerClassName="!transform-none z-10"
            content={
              <div className="sm:hidden">
                {/* Mobile Filters Overlay - Start */}
                <div
                  className="fixed left-0 top-0 w-screen h-screen bg-blue-600/50"
                  onClick={() => closeMobileFilterPopover()}
                />
                {/* Mobile Filters Overlay - End */}

                <div className="flex flex-col divide-y divide-blue-300 bg-white rounded-t-lg text-blue-700 text-sm tracking-[0.17px] fixed top-16 bottom-0 left-0 right-0 z-10">
                  <div className="flex items-end py-1">
                    <Button
                      shape="rectangle-2"
                      variant="ghost"
                      colourScheme="purple"
                      className="uppercase font-bold ml-auto"
                      onClick={() => {
                        tableFiltersContext?.applyTempToPerm()

                        closeMobileFilterPopover()
                      }}
                    >
                      Close
                    </Button>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    {tableFiltersContext.filters.map(
                      ({ id: filterGroupId, label, sections, options }) => (
                        <React.Fragment
                          key={`filter-group-mobile-${filterGroupId}`}
                        >
                          <Button
                            variant="ghost"
                            colourScheme="white"
                            rightIcon={filterButtonIcon(
                              openFilterIdMobile === filterGroupId,
                            )}
                            className={cx(
                              "w-full rounded-none !text-blue-900 capitalize text-base py-[21px]",
                              {
                                "bg-blue-100":
                                  openFilterIdMobile === filterGroupId,
                              },
                            )}
                            onClick={() =>
                              setOpenFilterIdMobile(
                                openFilterIdMobile === filterGroupId
                                  ? ""
                                  : filterGroupId,
                              )
                            }
                            isFullWidth
                          >
                            &nbsp;
                            <FormattedMessage {...label} />
                          </Button>

                          {/* Divider - Start */}
                          <div className="px-4">
                            <div className="bg-blue-300 h-px w-full" />
                          </div>
                          {/* Divider - End */}

                          {openFilterIdMobile === filterGroupId && (
                            <div className="border-b border-b-blue-300">
                              <div className="divide-y divide-blue-300">
                                <FilterPopoverContent
                                  id={filterGroupId}
                                  label={label}
                                  sections={sections}
                                  options={options}
                                />
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ),
                    )}
                  </div>

                  <div className="flex justify-between p-4">
                    <Checkbox
                      id="filter-popover-all-filters-checkbox-mobile"
                      // TODO: Replace hardcoded label with translated string
                      label={`${selectedItemsTemp.length} selected`}
                      checked={
                        selectedItemsTemp.length === totalItemsCountTemp
                          ? true
                          : selectedItemsTemp.length === 0
                          ? false
                          : null
                      }
                      onChange={(_, prevChecked, nowChecked) => {
                        if (prevChecked == null || nowChecked) {
                          tableFiltersContext.selectFilter()
                        } else {
                          tableFiltersContext.deselectFilter()
                        }
                      }}
                    />

                    <div className="space-x-2">
                      {!tableFiltersContext.isTempEqualToPerm() && (
                        <Button
                          variant="outline"
                          colourScheme="white"
                          onClick={() => tableFiltersContext.deselectFilter()}
                        >
                          Clear
                        </Button>
                      )}

                      <Button
                        onClick={() => {
                          tableFiltersContext.applyTempToPerm()

                          setIsMobileFilterPopoverShown(false)
                        }}
                        isDisabled={tableFiltersContext.isTempEqualToPerm()}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            {/* Mobile Filters Button - Start */}
            <Button
              variant="outline"
              colourScheme="white"
              className="sm:hidden relative"
              leftIcon={mobileFiltersButtonIcon}
              onClick={() => setIsMobileFilterPopoverShown(true)}
              isDisabled={!filtersEnabled}
              noDisabledStyles={!filtersEnabled}
            >
              <FormattedMessage
                id="database.filters.mobile.filters_button"
                defaultMessage="Filters"
              />

              {selectedItemsPerm.length > 0 && (
                <Badge
                  value={selectedItemsPerm.length.toString()}
                  shape="circle"
                  size="lg"
                  className="absolute -top-1/4 -right-2.5"
                />
              )}
            </Button>
            {/* Mobile Filters Button - End */}
          </Popover>
          {/* Mobile Filters - End */}
        </>
      )}
    </div>
  )
}

export default TableFilters
