import { fireEvent, render } from "@utils/testing-library"

import HamburgerButton from "./HamburgerButton.component"

const mockFn = jest.fn()

it("renders a HamburgerButton containing any string value passed to it", () => {
  const { getByTestId } = render(<HamburgerButton onClick={mockFn} />)

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByTestId("hamburger"))

  expect(mockFn).toHaveBeenCalledTimes(1)
})
