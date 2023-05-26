import { fireEvent, render } from "@utils/testing-library"

import Switch from "./Switch.component"

const mockFn = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it("renders correctly", () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <Switch
      checked={true}
      label="Transactional Account emails"
      description="Essential Transactional emails relating to your account"
      isDisabled={true}
      onClick={mockFn}
    />,
  )

  expect(getByTestId("switch-wrapper")).toBeInTheDocument()
  expect(getByTestId("switch-input")).toBeInTheDocument()
  expect(getByTestId("switch-label-wrapper")).toBeInTheDocument()
  expect(getByTestId("switch-label_title")).toBeInTheDocument()
  expect(getByTestId("switch-label_description")).toBeInTheDocument()

  rerender(<Switch checked={false} isDisabled={false} onClick={mockFn} />)
  expect(queryByTestId("switch-label_title")).toBeFalsy()
  expect(queryByTestId("switch-switch-label_description")).toBeFalsy()
})

test("the switch is disabled when `isDisabled` is true", () => {
  const { getByTestId } = render(
    <Switch checked={true} isDisabled={true} onClick={mockFn} />,
  )
  expect(getByTestId("switch-hidden-input")).toHaveAttribute("disabled")
})

test("the switch executes onClick when isDisabled is false", () => {
  const { getByTestId } = render(
    <Switch checked={true} isDisabled={false} onClick={mockFn} />,
  )

  fireEvent.click(getByTestId("switch-hidden-input"))
  expect(mockFn).toHaveBeenCalledTimes(1)
})

test("the switch doesn't execute onClick when isDisabled is true", () => {
  const { getByTestId } = render(
    <Switch checked={true} isDisabled={true} onClick={mockFn} />,
  )

  fireEvent.click(getByTestId("switch-hidden-input"))
  expect(mockFn).toHaveBeenCalledTimes(0)
})
