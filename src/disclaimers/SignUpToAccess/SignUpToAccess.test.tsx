import { fireEvent, render } from "@utils/testing-library"
import SignUpToAccess, { SignUpToAccessProps } from "./SignUpToAccess.component"

jest.mock("@public/icons/lock.svg", () => "svg")

const TEST_PROPS: SignUpToAccessProps = {
  actionButtonText: "Action Button",
  secondaryActionButtonText: "Secondary Action Button",

  overrideDefaultActionOnClick: true,
}

it("should render properly", () => {
  const { queryByTestId, getByTestId, getByText, rerender } = render(
    <SignUpToAccess {...TEST_PROPS} />,
  )

  expect(getByTestId("signup-to-access-disclaimer")).toBeInTheDocument()

  expect(
    getByTestId("signup-to-access-disclaimer__default-icon"),
  ).toBeInTheDocument()

  expect(getByText(TEST_PROPS.actionButtonText!)).toBeInTheDocument()

  expect(getByText(TEST_PROPS.secondaryActionButtonText!)).toBeInTheDocument()

  rerender(<SignUpToAccess {...TEST_PROPS} isDefaultIconHidden />)

  expect(queryByTestId("signup-to-access-disclaimer__default-icon")).toBeFalsy()
})

it("executes the callbacks for primary and secondary action buttons", () => {
  const mockFn = jest.fn()

  const { getByText, rerender } = render(
    <SignUpToAccess {...TEST_PROPS} onActionClick={mockFn} />,
  )

  expect(mockFn).toHaveBeenCalledTimes(0)

  fireEvent.click(getByText(TEST_PROPS.actionButtonText!))

  expect(mockFn).toHaveBeenCalledTimes(1)

  rerender(<SignUpToAccess {...TEST_PROPS} onSecondaryActionClick={mockFn} />)

  expect(mockFn).toHaveBeenCalledTimes(1)

  fireEvent.click(getByText(TEST_PROPS.secondaryActionButtonText!))

  expect(mockFn).toHaveBeenCalledTimes(2)
})
