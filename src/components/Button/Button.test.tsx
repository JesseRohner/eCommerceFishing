import { fireEvent, render, within } from "@utils/testing-library"

import FiltersIcon from "@public/icons/filters.svg"

import Button from "./Button.component"

jest.mock("@public/icons/filters.svg", () => "svg")

const mockFn = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it("renders as a button by default", () => {
  const { getByTestId, getByText } = render(<Button>Button</Button>)

  expect(getByTestId("button").tagName).toMatch(/button/i)
  expect(getByText("Button")).toBeTruthy()
})

it("renders with icons", () => {
  const { getByTestId, getByText } = render(
    <>
      <Button leftIcon={<FiltersIcon />}>Icon Left</Button>
      <Button rightIcon={<FiltersIcon />}>Icon Right</Button>
    </>,
  )

  expect(getByTestId("left-icon")).toBeInTheDocument()
  expect(getByText("Icon Left")).toBeTruthy()

  expect(getByTestId("right-icon")).toBeInTheDocument()
  expect(getByText("Icon Right")).toBeTruthy()
})

it("shows provided loading test when isLoading is set to `true`", () => {
  const { getByText, queryByText, rerender } = render(
    <Button isLoading>Button</Button>,
  )

  expect(getByText("Loading")).toBeTruthy()
  expect(queryByText("Button")).toBeFalsy()

  rerender(
    <Button isLoading loadingText="Loading Text">
      Button
    </Button>,
  )

  expect(getByText("Loading Text")).toBeTruthy()
  expect(queryByText("Button")).toBeFalsy()
})

it("can't be clicked on when isLoading is set to true", () => {
  const { getByTestId } = render(
    <Button isLoading onClick={mockFn}>
      Button
    </Button>,
  )

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByTestId("button"))

  expect(mockFn).toHaveBeenCalledTimes(0)
})

it("can't be clicked on when isDisabled is set to true", () => {
  const { getByTestId } = render(
    <Button isDisabled onClick={mockFn}>
      Button
    </Button>,
  )

  expect(getByTestId("button")).toHaveAttribute("disabled", "")

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByTestId("button"))

  expect(mockFn).toHaveBeenCalledTimes(0)
})

it("executes the onClick callback when clicked", () => {
  const { getByTestId } = render(<Button onClick={mockFn}>Button</Button>)

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByTestId("button"))

  expect(mockFn).toHaveBeenCalledTimes(1)
})

it("renders a close button within itself when onCloseClick is not undefined", () => {
  const { getByTestId } = render(<Button onCloseClick={mockFn}>Button</Button>)

  const closeButton = within(getByTestId("button")).getByTestId("close-button")

  expect(closeButton).toBeInTheDocument()
})

it("executes the onCloseClick callback when the close button is clicked", () => {
  const { getByTestId } = render(<Button onCloseClick={mockFn}>Button</Button>)

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByTestId("close-button"))

  expect(mockFn).toHaveBeenCalledTimes(1)
})

it("applies the passed `className` classes", () => {
  const { getByTestId } = render(<Button className="test-class">Button</Button>)

  expect(getByTestId("button")).toHaveClass("test-class")
})
