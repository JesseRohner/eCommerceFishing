import { render } from "@utils/testing-library"

import UserCard from "./UserCard.component"

jest.mock("@public/icons/linked-in.svg", () => "svg")

it("renders a UserCard containing user profile info", () => {
  const { getByTestId, rerender, queryByTestId } = render(<UserCard />)

  expect(getByTestId("avatar")).toBeInTheDocument()

  expect(getByTestId("user-card_full-name")).toBeInTheDocument()

  expect(getByTestId("user-card_description")).toBeInTheDocument()

  expect(queryByTestId("badge")).not.toBeInTheDocument()

  expect(queryByTestId("user-card_linkedin-link")).not.toBeInTheDocument()

  rerender(<UserCard displayBadge />)

  expect(getByTestId("badge")).toBeInTheDocument()

  rerender(<UserCard displayLinkedIn />)

  expect(getByTestId("user-card_linkedin-link")).toBeInTheDocument()

  rerender(<UserCard className="test-classname" />)

  expect(getByTestId("user-card").className).toContain("test-classname")
})
