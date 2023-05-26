import { fireEvent, render, screen } from "@utils/testing-library"

import Input from "./Input.component"

jest.mock("@public/icons/close.svg", () => "svg")

const mockFn = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it("renders correctly all the elements", () => {
  const { getByTestId, rerender } = render(<Input id="test-input" />)

  expect(getByTestId("input-element")).toBeInTheDocument()

  expect(screen.queryByTestId("input-label")).toBeNull()
  expect(screen.queryByTestId("input-optional-text")).toBeNull()
  expect(screen.queryByTestId("input-clear-button")).toBeNull()
  expect(screen.queryByTestId("input-error-text")).toBeNull()
  expect(screen.queryByTestId("input-help-text")).toBeNull()

  rerender(
    <Input
      id="test-input"
      labelText="Label"
      optionalText="Optional"
      isInvalid
      errorText="Error text"
      helpText="Help text"
      onClearClick={mockFn}
    />,
  )

  expect(getByTestId("input-label")).toHaveAttribute("for", "test-input")
  expect(getByTestId("input-label").textContent).toBe("Label")

  expect(getByTestId("input-optional-text").textContent).toBe("Optional")

  expect(getByTestId("input-clear-button")).toBeInTheDocument()

  expect(getByTestId("input-error-text").textContent).toBe("Error text")

  expect(getByTestId("input-help-text").textContent).toBe("Help text")
})

test("Readonly input renders correctly", () => {
  const { getByTestId } = render(<Input id="test-input" isReadonly />)

  expect(getByTestId("input-element")).toHaveAttribute("aria-readonly", "true")
  expect(getByTestId("input-element")).toHaveAttribute("readonly")
})

test("Disabled input renders correctly", () => {
  const { getByTestId, rerender } = render(
    <Input id="test-input" onChange={mockFn} isDisabled />,
  )

  expect(getByTestId("input-element")).toHaveAttribute("disabled")

  fireEvent.change(getByTestId("input-element"), { target: { value: "test" } })

  expect(mockFn).toHaveBeenCalledTimes(0)

  rerender(<Input id="test-input" isDisabled onClearClick={mockFn} />)

  fireEvent.click(getByTestId("input-clear-button"))

  expect(mockFn).toHaveBeenCalledTimes(0)
})

test("Invalid input renders correctly", () => {
  const { getByTestId, rerender } = render(<Input id="test-input" isInvalid />)

  expect(getByTestId("input-element")).toHaveAttribute("aria-invalid", "true")

  expect(screen.queryByTestId("input-error-text")).toBeNull()

  rerender(<Input id="test-input" isInvalid errorText="Error text" />)

  expect(getByTestId("input-error-text").textContent).toBe("Error text")

  rerender(<Input id="test-input" errorText="Error text" />)

  expect(screen.queryByTestId("input-error-text")).toBeNull()
})
