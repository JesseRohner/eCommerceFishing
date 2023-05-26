import { useContext } from "react"

import Button from "@components/Button"
import { TableFiltersContext } from "@components/TableFilters"
import { FormattedMessage } from "react-intl"

const TableFilterDeselectors = () => {
  const tableFiltersContext = useContext(TableFiltersContext)

  const { selectedItems } = tableFiltersContext.getSelectedFilters(
    undefined,
    undefined,
    "perm",
  )

  if (selectedItems.length < 1) return null

  return (
    <div className="flex space-x-2">
      <div className="flex space-x-2 overflow-y-auto">
        {selectedItems.map(
          ({ id: filterItemId, translatedLabel, value, _group, _section }) => (
            <Button
              key={`filter-deselector-${filterItemId}`}
              shape="pill"
              colourScheme="blue"
              onCloseClick={() => {
                tableFiltersContext.deselectFilter(
                  _group.id,
                  _section.id,
                  filterItemId,
                  "perm",
                )
              }}
            >
              <FormattedMessage {..._group.label} /> -{" "}
              {Array.isArray(value) ? value.join(" - ") : translatedLabel}
            </Button>
          ),
        )}
      </div>

      <Button
        shape="pill"
        colourScheme="white"
        onClick={() => {
          tableFiltersContext.resetFiltersState()
        }}
      >
        Clear all
      </Button>
    </div>
  )
}

export default TableFilterDeselectors
