import { MessageDescriptor } from "react-intl"

import { fireEvent, render } from "@utils/testing-library"

import NavigationItem from "./NavigationItem.component"

const labelProp: MessageDescriptor = {
  id: "test.label",
}

const mockFn = jest.fn()

it("renders a link NavigationItem", () => {
  const { getByRole } = render(
    <NavigationItem href="/test" label={labelProp} />,
  )

  expect(getByRole("link")).toHaveAttribute("href", "/test")
})

it("renders a button NavigationItem", () => {
  const { getByRole } = render(
    <NavigationItem label={labelProp} onClick={mockFn} />,
  )

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByRole("button"))

  expect(mockFn).toHaveBeenCalledTimes(1)
})
