import { fireEvent, render } from "@utils/testing-library"
import Checkbox from "./Checkbox.component"

jest.mock("@public/icons/tick-small.svg", () => "svg")

const mockFn = jest.fn()

afterEach(() => {
  jest.resetAllMocks()
})

it("renders correctly", () => {
  const { getByTestId, queryByTestId, getByText, rerender } = render(
    <Checkbox id="test-checkbox" />,
  )

  expect(getByTestId("checkbox-wrapper")).toBeInTheDocument()
  expect(getByTestId("checkbox-input")).toBeInTheDocument()
  expect(getByTestId("checkbox-styled-element")).toBeInTheDocument()

  rerender(<Checkbox id="test-checkbox" checked />)

  expect(getByTestId("checkbox-tick-icon")).toBeInTheDocument()
  expect(queryByTestId("checkbox-indeterminate-icon")).toBeFalsy()

  rerender(<Checkbox id="test-checkbox" checked={null} />)

  expect(queryByTestId("checkbox-tick-icon")).toBeFalsy()
  expect(getByTestId("checkbox-indeterminate-icon")).toBeInTheDocument()

  rerender(<Checkbox id="test-checkbox" label="Test label" />)

  expect(getByText("Test label")).toBeInTheDocument()

  rerender(
    <Checkbox id="test-checkbox" label="Test label" helperText="Helper text" />,
  )

  expect(getByText("Test label")).toBeInTheDocument()
  expect(getByText("Helper text")).toBeInTheDocument()

  rerender(
    <Checkbox
      id="test-checkbox"
      label="Test label"
      labelAppend={<strong>Label append</strong>}
    />,
  )

  expect(getByText("Test label")).toBeInTheDocument()
  expect(getByTestId("checkbox-label-append")).toBeInTheDocument()
  expect(getByText("Label append")).toBeInTheDocument()
})

test("the checkbox is disabled when `isDisabled` is true", () => {
  const { getByTestId } = render(
    <Checkbox id="test-checkbox" isDisabled onChange={mockFn} />,
  )

  expect(getByTestId("checkbox-input")).toHaveAttribute("disabled")

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(mockFn).toHaveBeenCalledTimes(0)
})

test("the checkbox is readOnly when `isReadonly` is true", () => {
  const { getByTestId } = render(
    <Checkbox id="test-checkbox" isReadonly onChange={mockFn} />,
  )

  expect(getByTestId("checkbox-input")).toHaveAttribute("readOnly")

  expect(mockFn).toHaveBeenCalledTimes(0)
})

test("the checkbox toggles between two states by default", () => {
  const { getByTestId, queryByTestId } = render(
    <Checkbox id="checkbox-test" onChange={mockFn} />,
  )

  expect(queryByTestId("checkbox-tick-icon")).toBeFalsy()

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(getByTestId("checkbox-tick-icon")).toBeInTheDocument()

  expect(mockFn).toHaveBeenCalledTimes(1)

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(queryByTestId("checkbox-tick-icon")).toBeFalsy()

  expect(mockFn).toHaveBeenCalledTimes(2)
})

test("the checkbox toggles between three states when isThreeState is enabled", () => {
  const { getByTestId, queryByTestId } = render(
    <Checkbox id="checkbox-test" isThreeState onChange={mockFn} />,
  )

  expect(queryByTestId("checkbox-tick-icon")).toBeFalsy()
  expect(queryByTestId("checkbox-indeterminate-icon")).toBeFalsy()

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(getByTestId("checkbox-indeterminate-icon")).toBeInTheDocument()

  expect(mockFn).toHaveBeenCalledTimes(1)

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(queryByTestId("checkbox-indeterminate-icon")).toBeFalsy()
  expect(getByTestId("checkbox-tick-icon")).toBeInTheDocument()

  expect(mockFn).toHaveBeenCalledTimes(2)

  fireEvent.click(getByTestId("checkbox-styled-element"))

  expect(queryByTestId("checkbox-indeterminate-icon")).toBeFalsy()
  expect(queryByTestId("checkbox-tick-icon")).toBeFalsy()

  expect(mockFn).toHaveBeenCalledTimes(3)
})
