describe("Basic Navigation", () => {
  beforeEach(() => {
    cy.visit("/")

    cy.findByTestId("navigation-mobile").should("be.hidden")
  })

  it("routes to the right page", () => {
    cy.findByText("Your projects").click()

    cy.url().should("contain", "your-projects")
  })

  it("toggles navigation item submenu", () => {
    cy.findByText("Live projects").parent().click()

    cy.wait(500)

    cy.findByText("Live projects").parent().next().should("not.be.hidden")

    cy.findByText("Live projects").parent().click()

    cy.wait(500)

    cy.findByText("Live projects").parent().next().should("be.hidden")
  })

  it("navigates to the correct route in the submenu", () => {
    cy.findByText("Live projects").parent().click()

    cy.wait(500)

    cy.findByText("All Live Projects").click()

    cy.wait(500)

    cy.url().should("contain", "all-live-projects")
  })
})

describe("Mobile navigation show/hide", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr")

    cy.visit("/")
  })

  it("displays the mobile navigation, allowing to toggle the sidebar navigation", () => {
    cy.findByTestId("navigation").should("be.hidden")

    cy.findByTestId("navigation-overlay").should("be.hidden")

    cy.findByTestId("navigation-mobile").should("not.be.hidden")

    cy.findByTestId("navigation-mobile").within(() => {
      cy.findByTestId("hamburger").click()
    })

    cy.wait(1000)

    cy.findByTestId("navigation").should("not.be.hidden")

    cy.findByTestId("navigation-overlay").should("have.css", "display", "block")

    cy.findByTestId("navigation-overlay").should("have.css", "opacity", "1")

    cy.findByTestId("navigation-overlay").click({ force: true })

    cy.wait(1000)

    cy.findByTestId("navigation").should("be.hidden")

    cy.findByTestId("navigation-overlay").should("be.hidden")
  })
})
