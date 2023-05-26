import cx from "classnames"
import { useContext } from "react"
import { FormattedMessage, useIntl } from "react-intl"

import Checkbox from "@components/Checkbox"
import Input from "@components/Input"

import TableFiltersContext, { TableFilterGroup } from "./TableFilters.context"

import SearchIcon from "@public/icons/search.svg"

const FilterSectionsWrapper: React.FC<{
  singleWrapper?: boolean
  children: React.ReactNode
}> = ({
  singleWrapper = false,

  children,
}) =>
  singleWrapper ? (
    <div className="p-4">{children}</div>
  ) : (
    <div className="flex-grow overflow-y-auto">
      <div className="px-5 py-3 tracking-[0.17px]">{children}</div>
    </div>
  )

const FilterPopoverContent: React.FC<
  TableFilterGroup & {
    singleWrapper?: boolean
  }
> = ({
  id: filterGroupId,
  options: { isSearchable } = {},
  sections,

  singleWrapper,
}) => {
  const intl = useIntl()
  const tableFiltersContext = useContext(TableFiltersContext)

  return (
    <>
      {/* Filter Search - Start */}
      {isSearchable && (
        <div className="px-4 py-[14px]">
          <Input
            id={`filter-popover-search-${filterGroupId}`}
            // TODO: Replace hardcoded placeholder value with translated string
            placeholder="Search"
            value={tableFiltersContext.searchValue}
            leftIcon={<SearchIcon />}
            className="bg-blue-100 border-blue-100"
            onChange={({ target: { value } }) =>
              tableFiltersContext.setSearchValue(value)
            }
          />
        </div>
      )}
      {/* Filter Search - End */}

      {/* Filter Sections - Start */}
      <FilterSectionsWrapper singleWrapper={singleWrapper}>
        {sections.map(
          (
            {
              id: filterSectionId,
              name,
              items,
              options: { isParentControl } = {},
            },
            idx,
          ) => {
            const { selectedItems, totalItemsCount } =
              tableFiltersContext.getSelectedFilters(
                filterGroupId,
                filterSectionId,
              )

            return (
              <div
                key={`filter-popover-section-${filterSectionId}`}
                className="mb-4 last-of-type:mb-0"
              >
                {/* Section Name - Start */}
                {name && (
                  <div
                    className={cx(
                      "font-medium text-sm text-blue-600 tracking-[0.16px] mb-3",
                      { "mt-5": idx !== 0 },
                    )}
                  >
                    {isParentControl ? (
                      <Checkbox
                        id={`filter-popover-section-parent-control-${filterSectionId}`}
                        label={intl.formatMessage(name)}
                        className="font-bold"
                        checked={selectedItems.length === totalItemsCount}
                        onChange={(_, __, checked) => {
                          if (checked) {
                            tableFiltersContext.selectFilter(
                              filterGroupId,
                              filterSectionId,
                            )
                          } else {
                            tableFiltersContext.deselectFilter(
                              filterGroupId,
                              filterSectionId,
                            )
                          }
                        }}
                      />
                    ) : (
                      <FormattedMessage {...name} />
                    )}
                  </div>
                )}
                {/* Section Name - End */}

                {/* Section Item List - Start */}
                <ul
                  className={cx("space-y-4", {
                    "pl-2": isParentControl,
                  })}
                >
                  {items
                    .filter(({ translatedLabel = "" }) =>
                      translatedLabel.match(
                        new RegExp(tableFiltersContext.searchValue, "i"),
                      ),
                    )
                    .map(
                      ({
                        id: filterId,
                        value,
                        valueBoundaries = [],
                        selected,
                        translatedLabel,
                      }) => (
                        <li key={`filter-popover-section-item-${filterId}`}>
                          {Array.isArray(value) ? (
                            <div className="flex space-x-3">
                              {value.map((rangeValue, rangeValueIdx) => (
                                <div
                                  key={`filter-popover-section-item-${filterId}-value-${rangeValue}`}
                                >
                                  <Input
                                    id={`filter-popover-section-item-${filterId}`}
                                    value={rangeValue.toString()}
                                    onChange={({
                                      target: { value: nextValue },
                                    }) => {
                                      if (isNaN(Number(nextValue))) {
                                        return false
                                      }

                                      if (rangeValueIdx === 0) {
                                        if (
                                          Number(nextValue) >
                                          Number(valueBoundaries[1])
                                        ) {
                                          return false
                                        }
                                      } else {
                                        if (
                                          (nextValue.length === 4 &&
                                            Number(nextValue) <
                                              Number(valueBoundaries[0])) ||
                                          Number(nextValue) >
                                            new Date().getFullYear()
                                        ) {
                                          return false
                                        }
                                      }

                                      tableFiltersContext.setFilterItem(
                                        (filterItem) => ({
                                          ...filterItem,
                                          touched: true,
                                          value:
                                            rangeValueIdx === 0
                                              ? [
                                                  Number(nextValue),
                                                  (
                                                    filterItem.value as [
                                                      number,
                                                      number,
                                                    ]
                                                  )[1],
                                                ]
                                              : [
                                                  (
                                                    filterItem.value as [
                                                      number,
                                                      number,
                                                    ]
                                                  )[0],
                                                  Number(nextValue),
                                                ],
                                        }),
                                      )(
                                        filterGroupId,
                                        filterSectionId,
                                        filterId,
                                      )
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <Checkbox
                              id={`filter-popover-section-item-${filterId}`}
                              label={translatedLabel}
                              checked={selected}
                              onChange={(_, __, checked) => {
                                if (checked) {
                                  tableFiltersContext.selectFilter(
                                    filterGroupId,
                                    filterSectionId,
                                    filterId,
                                  )
                                } else {
                                  tableFiltersContext.deselectFilter(
                                    filterGroupId,
                                    filterSectionId,
                                    filterId,
                                  )
                                }
                              }}
                            />
                          )}
                        </li>
                      ),
                    )}
                </ul>
                {/* Section Item List - End */}
              </div>
            )
          },
        )}
      </FilterSectionsWrapper>
      {/* Filter Sections - End */}
    </>
  )
}

export default FilterPopoverContent
