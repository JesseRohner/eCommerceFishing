import { render } from "@utils/testing-library"

import LogoLink from "./LogoLink.component"

it("renders an anchor element to /, that is wrapped around a light logo icon", () => {
  const { getByRole } = render(<LogoLink type="light" />)

  expect(getByRole("link")).toHaveAttribute("href", "/")

  expect(getByRole("img")).toBeInTheDocument()
})

it("renders an anchor element to /, that is wrapped around a dark logo icon", () => {
  const { getByRole } = render(<LogoLink type="dark" />)

  expect(getByRole("img")).toBeInTheDocument()
})

it("is has b", () => {
  const { getByRole } = render(<LogoLink type="light" hideOnMobile />)

  expect(getByRole("link").className).toContain("hidden sm:inline-flex")
})
