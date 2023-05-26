import { fireEvent, render, within } from "@utils/testing-library"

import Pagination, { PaginationProps } from "./Pagination.component"

jest.mock("@public/icons/chevron-down-small.svg", () => "svg")

const TEST_PROPS: PaginationProps = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 100,

  onPageChange: jest.fn(),
}

it("should render a pagination component", () => {
  const { getByTestId } = render(<Pagination {...TEST_PROPS} />)

  expect(getByTestId("pagination")).toBeInTheDocument()

  const prevButton = within(getByTestId("pagination")).getByTestId(
    "pagination-button-previous",
  )

  expect(prevButton).toBeInTheDocument()

  const nextButton = within(getByTestId("pagination")).getByTestId(
    "pagination-button-next",
  )

  expect(nextButton).toBeInTheDocument()

  const dotsSeparator = within(getByTestId("pagination")).getByTestId(
    "pagination-dots",
  )

  expect(dotsSeparator).toBeInTheDocument()

  const paginationButtons = within(getByTestId("pagination")).getAllByTestId(
    "pagination-button",
  )

  expect(paginationButtons).toHaveLength(4)

  expect(paginationButtons.map(({ textContent }) => textContent)).toStrictEqual(
    ["1", "2", "3", "10"],
  )
})

test("previous and next buttons should be disabled when user is on first and last page", () => {
  const { getByTestId, rerender } = render(<Pagination {...TEST_PROPS} />)

  expect(
    getByTestId("pagination-button-previous").closest("button"),
  ).toHaveAttribute("disabled")

  expect(
    getByTestId("pagination-button-next").closest("button"),
  ).not.toHaveAttribute("disabled")

  rerender(<Pagination {...TEST_PROPS} currentPage={10} />)

  expect(
    getByTestId("pagination-button-next").closest("button"),
  ).toHaveAttribute("disabled")

  expect(
    getByTestId("pagination-button-previous").closest("button"),
  ).not.toHaveAttribute("disabled")
})

it("should trigger the onPageChange callback when any not disabled button is clicked", () => {
  const { getByText, getByTestId } = render(
    <Pagination {...TEST_PROPS} currentPage={2} />,
  )

  fireEvent.click(getByText("1").closest("button")!)

  expect(TEST_PROPS.onPageChange).toHaveBeenCalledTimes(1)

  fireEvent.click(getByTestId("pagination-button-next").closest("button")!)

  expect(TEST_PROPS.onPageChange).toHaveBeenCalledTimes(2)

  fireEvent.click(getByTestId("pagination-button-previous").closest("button")!)

  expect(TEST_PROPS.onPageChange).toHaveBeenCalledTimes(3)
})
