import { render } from "@utils/testing-library"

import CompanyInfoDisplay, {
  CompanyInfoDisplayProps,
} from "./CompanyInfoDisplay.component"

jest.mock("next/image", () => "img")
jest.mock("@public/icons/arrow-up-base.svg", () => "svg")

const TEST_PROPS: CompanyInfoDisplayProps = {
  imageUrl: "test image url",
  heading: "Test heading",
  children: "Test body",
}

it("should render properly", () => {
  const { getByText, getByTestId, queryByTestId, rerender } = render(
    <CompanyInfoDisplay {...TEST_PROPS} />,
  )

  expect(getByTestId("company-info-display")).toBeInTheDocument()

  expect(getByTestId("company-info-display_image")).toBeInTheDocument()

  expect(getByTestId("company-info-display_image")).toHaveAttribute(
    "src",
    TEST_PROPS.imageUrl,
  )

  expect(getByTestId("company-info-display_heading")).toBeInTheDocument()

  expect(getByTestId("company-info-display_heading").textContent).toEqual(
    TEST_PROPS.heading,
  )

  expect(queryByTestId("company-info-display_subheading")).toBeFalsy()

  expect(queryByTestId("company-info-display_date")).toBeFalsy()

  expect(getByText(TEST_PROPS.children as string)).toBeInTheDocument()

  const EXPECTED_SUBHEADING_VALUE = "Test subheading"

  rerender(
    <CompanyInfoDisplay
      {...TEST_PROPS}
      subHeading={EXPECTED_SUBHEADING_VALUE}
    />,
  )

  expect(getByTestId("company-info-display_subheading")).toBeInTheDocument()

  expect(getByTestId("company-info-display_subheading").textContent).toEqual(
    EXPECTED_SUBHEADING_VALUE,
  )

  const EXPECTED_DATE_VALUE = "25 May"

  rerender(<CompanyInfoDisplay {...TEST_PROPS} date={EXPECTED_DATE_VALUE} />)

  expect(getByTestId("company-info-display_date")).toBeInTheDocument()

  expect(getByTestId("company-info-display_date").textContent).toEqual(
    EXPECTED_DATE_VALUE,
  )

  const EXPECTED_EXTERNAL_LINK_VALUE = "https://www.google.com"

  rerender(
    <CompanyInfoDisplay
      {...TEST_PROPS}
      externalLink={EXPECTED_EXTERNAL_LINK_VALUE}
    />,
  )

  expect(getByTestId("external-link")).toBeInTheDocument()

  expect(getByTestId("external-link")).toHaveAttribute(
    "href",
    EXPECTED_EXTERNAL_LINK_VALUE,
  )

  rerender(<CompanyInfoDisplay {...TEST_PROPS} companyProfileId="any string" />)

  expect(getByTestId("button")).toBeInTheDocument()

  expect(getByTestId("button").textContent).toEqual("Company Profile")

  rerender(<CompanyInfoDisplay {...TEST_PROPS} linkedInUrl="any string" />)

  expect(getByTestId("button")).toBeInTheDocument()

  expect(getByTestId("button").textContent).toEqual("View on LinkedIn")
})
