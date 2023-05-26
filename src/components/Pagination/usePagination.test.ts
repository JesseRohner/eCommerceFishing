import { renderHook } from "@testing-library/react"

import { DOTS, numberRange, usePagination } from "./usePagination.hook"

const DEFAULT_PAGINATION_ARGS = {
  totalItems: 500,
  offsetItemsNumber: 1,
  itemsPerPage: 25,
  currentPage: 1,
}

describe("numberRange", () => {
  it("should return an array with numbers ranging from `start` to `end`", () => {
    expect(numberRange(1, 5).sort()).toEqual([1, 2, 3, 4, 5].sort())

    expect(numberRange(0, 5).sort()).toEqual([0, 1, 2, 3, 4, 5].sort())
  })

  it("should return an empty array when the `start` argument is greater than the `end` argument", () => {
    expect(numberRange(10, 5)).toEqual([])
  })
})

describe("usePagination", () => {
  it("returns an array with a range of pages to be displayed", () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PAGINATION_ARGS))

    expect(result.current.paginationRange.sort()).toEqual(
      [1, 2, 3, DOTS, 20].sort(),
    )

    expect(result.current.isPreviousDisabled).toBe(true)

    expect(result.current.isNextDisabled).toBe(false)
  })

  it("returns an array with containing one page and no separators when passed same number of total items and items per page", () => {
    const { result } = renderHook(() =>
      usePagination({ ...DEFAULT_PAGINATION_ARGS, totalItems: 25 }),
    )

    expect(result.current.paginationRange).toEqual([1])

    expect(result.current.isPreviousDisabled).toBe(true)

    expect(result.current.isNextDisabled).toBe(true)
  })

  it("returns an array containing 2 instances of DOTS when current page is in the middle", () => {
    const { result } = renderHook(() =>
      usePagination({ ...DEFAULT_PAGINATION_ARGS, currentPage: 6 }),
    )

    expect(
      result.current.paginationRange.filter((pageItem) => pageItem === DOTS),
    ).toHaveLength(2)

    expect(result.current.isPreviousDisabled).toBe(false)

    expect(result.current.isNextDisabled).toBe(false)
  })

  it("returns an array containing the specified amount of offset items", () => {
    const { result } = renderHook(() =>
      usePagination({ ...DEFAULT_PAGINATION_ARGS, offsetItemsNumber: 2 }),
    )

    expect(result.current.paginationRange.sort()).toEqual(
      [1, 2, 3, 4, 5, DOTS, 20].sort(),
    )
  })

  it("returns an updated pages range array when currentPages argument changes", () => {
    let currentPage = 1

    const { result, rerender } = renderHook(() =>
      usePagination({ ...DEFAULT_PAGINATION_ARGS, currentPage }),
    )

    expect(result.current.paginationRange.sort()).toEqual(
      [1, 2, 3, DOTS, 20].sort(),
    )

    expect(result.current.isPreviousDisabled).toBe(true)

    expect(result.current.isNextDisabled).toBe(false)

    currentPage = 6

    rerender()

    expect(result.current.paginationRange.sort()).toEqual(
      [1, DOTS, 5, 6, 7, DOTS, 20].sort(),
    )

    expect(result.current.isPreviousDisabled).toBe(false)

    expect(result.current.isNextDisabled).toBe(false)

    currentPage = 20

    rerender()

    expect(result.current.paginationRange.sort()).toEqual(
      [1, DOTS, 18, 19, 20].sort(),
    )

    expect(result.current.isPreviousDisabled).toBe(false)

    expect(result.current.isNextDisabled).toBe(true)
  })
})
