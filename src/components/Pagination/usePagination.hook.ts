import { useMemo } from "react"

export const DOTS = "..."

export const numberRange = (start: number, end: number) =>
  end < start
    ? []
    : Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

export const usePagination = ({
  totalItems,
  offsetItemsNumber = 1,
  itemsPerPage,
  currentPage,
}: {
  totalItems: number
  offsetItemsNumber?: number
  itemsPerPage: number
  currentPage: number
}) => {
  const paginationRange = useMemo(() => {
    const pageCount = Math.ceil(totalItems / itemsPerPage)

    // offsetItemsNumber + firstPage + currentPage + lastPage + 2 * DOTS
    const numberOfShownElements = offsetItemsNumber + 5

    if (numberOfShownElements >= pageCount) {
      return numberRange(1, pageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - offsetItemsNumber, 1)
    const rightSiblingIndex = Math.min(
      currentPage + offsetItemsNumber,
      pageCount,
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < pageCount - 1

    const firstPageIndex = 1
    const lastPageIndex = pageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * offsetItemsNumber
      const leftRange = numberRange(1, leftItemCount)

      return [...leftRange, DOTS, pageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * offsetItemsNumber
      const rightRange = numberRange(pageCount - rightItemCount + 1, pageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = numberRange(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalItems, offsetItemsNumber, itemsPerPage, currentPage])

  const isPreviousDisabled = useMemo(() => currentPage === 1, [currentPage])

  const isNextDisabled = useMemo(
    () => Math.ceil(totalItems / itemsPerPage) - currentPage === 0,
    [totalItems, itemsPerPage, currentPage],
  )

  return { paginationRange, isPreviousDisabled, isNextDisabled }
}
