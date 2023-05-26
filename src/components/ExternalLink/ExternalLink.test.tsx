import { render } from "@utils/testing-library"

import ExternalLink from "./ExternalLink.component"

jest.mock("@public/icons/external.svg", () => "svg")

const EXPECTED_HREF = "https://www.google.com"
const EXPECTED_VALUE = "Google"

it("renders an HTML Anchor element with correct `href` value and `children`", () => {
  const { getByTestId } = render(
    <ExternalLink href={EXPECTED_HREF}>{EXPECTED_VALUE}</ExternalLink>,
  )

  expect(getByTestId("external-link")).toBeInTheDocument()

  expect(getByTestId("external-link").tagName).toMatch(/a/i)

  expect(getByTestId("external-link")).toHaveAttribute("href", EXPECTED_HREF)

  expect(getByTestId("external-link")).toHaveTextContent(EXPECTED_VALUE)
})

it("renders a default icon", () => {
  const { getByTestId } = render(
    <ExternalLink href={EXPECTED_HREF}>{EXPECTED_VALUE}</ExternalLink>,
  )

  expect(getByTestId("external-link_default-icon")).toBeInTheDocument()
})

it("doesn't render the default icon when `isDefaultIconHidden` is `true`", () => {
  const { queryByTestId } = render(
    <ExternalLink href={EXPECTED_HREF} isDefaultIconHidden>
      {EXPECTED_VALUE}
    </ExternalLink>,
  )

  expect(queryByTestId("external-link_default-icon")).toBeFalsy()
})

it("renders without the default className's", () => {
  const { getByTestId } = render(
    <ExternalLink href={EXPECTED_HREF} isDefaultStyleDisabled>
      {EXPECTED_VALUE}
    </ExternalLink>,
  )

  expect(getByTestId("external-link").className).toEqual("")
})
