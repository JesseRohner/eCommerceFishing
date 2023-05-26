import { fireEvent, render } from "@utils/testing-library"

import ComingSoon, { ComingSoonProps } from "./ComingSoon.component"

jest.mock("@public/icons/arrow-up-base.svg", () => "svg")
jest.mock("@public/icons/hourglass.svg", () => "svg")

const TEST_PROPS: ComingSoonProps = {
  heading: "Test heading",
  description: "Test description",
  feedbackUrl: "https://google.com/",
}

it("should render properly", () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <ComingSoon {...TEST_PROPS} />,
  )

  expect(getByTestId("coming-soon-disclaimer")).toBeInTheDocument()

  expect(getByTestId("coming-soon-disclaimer_default-icon")).toBeInTheDocument()

  expect(getByTestId("coming-soon-disclaimer_heading")).toBeInTheDocument()

  expect(getByTestId("coming-soon-disclaimer_heading").textContent).toEqual(
    TEST_PROPS.heading,
  )

  expect(getByTestId("coming-soon-disclaimer_description")).toBeInTheDocument()

  expect(getByTestId("coming-soon-disclaimer_description").textContent).toEqual(
    TEST_PROPS.description,
  )

  expect(getByTestId("button")).toBeInTheDocument()

  rerender(<ComingSoon {...TEST_PROPS} isDefaultIconHidden />)

  expect(queryByTestId("coming-soon-disclaimer_default-icon")).toBeFalsy()

  rerender(<ComingSoon {...TEST_PROPS} heading="" />)

  expect(queryByTestId("coming-soon-disclaimer_heading")).toBeFalsy()

  rerender(<ComingSoon {...TEST_PROPS} description="" />)

  expect(queryByTestId("coming-soon-disclaimer_description")).toBeFalsy()

  rerender(<ComingSoon {...TEST_PROPS} feedbackUrl="" />)

  expect(queryByTestId("button")).toBeFalsy()
})

it("opens the url provided in `feedbackUrl` in a new tab when clicked", () => {
  const mockFn = jest.fn()

  window.open = mockFn

  const { getByTestId } = render(<ComingSoon {...TEST_PROPS} />)

  fireEvent.click(getByTestId("button"))

  expect(mockFn).toBeCalledWith(TEST_PROPS.feedbackUrl, "_blank")
})
