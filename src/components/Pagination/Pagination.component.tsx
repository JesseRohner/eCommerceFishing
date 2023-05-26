import cx from "classnames"

import Button, { ButtonProps } from "@components/Button"

import ChevronIcon from "@public/icons/chevron-down-small.svg"

import { DOTS, usePagination } from "./usePagination.hook"

const paginationButtonProps: Pick<
  ButtonProps,
  "shape" | "variant" | "colourScheme" | "noDisabledStyles"
> = {
  shape: "rectangle-2",
  variant: "outline",
  colourScheme: "white",
  noDisabledStyles: true,
}

export type PaginationProps = {
  totalItems: number
  offsetItemsNumber?: number
  itemsPerPage: number
  currentPage: number

  onPageChange: (page: number) => any
}

const Pagination = ({
  totalItems,
  offsetItemsNumber = 1,
  itemsPerPage = 25,
  currentPage = 1,

  onPageChange,
}: PaginationProps) => {
  const { paginationRange, isPreviousDisabled, isNextDisabled } = usePagination(
    {
      totalItems,
      offsetItemsNumber,
      itemsPerPage,
      currentPage,
    },
  )

  const handlePreviousPageClick = () => {
    onPageChange(currentPage - 1)
  }

  const handleNextPageClick = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <div data-testid="pagination" className="flex space-x-2 text-blue-600">
      {/* Pagination Previous Page Button - Start */}
      <Button
        className={cx("w-9 overflow-hidden", {
          "pointer-events-none": isPreviousDisabled,
        })}
        isDisabled={isPreviousDisabled}
        onClick={handlePreviousPageClick}
        {...paginationButtonProps}
      >
        <ChevronIcon
          data-testid="pagination-button-previous"
          className="rotate-90 stroke-blue-500"
        />
      </Button>
      {/* Pagination Previous Page Button - End */}

      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            // Pagination Divider - Start
            <span
              key={`pagination-dots-${idx}`}
              data-testid="pagination-dots"
              className="pt-1 select-none"
            >
              ...
            </span>
            // Pagination Divider - End
          )
        }

        return (
          // Pagination Page Button - Start
          <Button
            key={`pagination-button-${pageNumber}`}
            className={cx("w-9 !font-medium hidden sm:flex", {
              "bg-blue-100 !text-blue-900": currentPage === pageNumber,
            })}
            isDisabled={currentPage === pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
            {...paginationButtonProps}
          >
            <span data-testid="pagination-button">{pageNumber}</span>
          </Button>
          // Pagination Page Button - End
        )
      })}

      {/* Pagination Next Page Button - Start */}
      <Button
        className={cx("w-9 overflow-hidden", {
          "pointer-events-none": isNextDisabled,
        })}
        isDisabled={isNextDisabled}
        onClick={handleNextPageClick}
        {...paginationButtonProps}
      >
        <ChevronIcon
          data-testid="pagination-button-next"
          className="-rotate-90 stroke-blue-500"
        />
      </Button>
      {/* Pagination Next Page Button - End */}
    </div>
  )
}

export default Pagination
