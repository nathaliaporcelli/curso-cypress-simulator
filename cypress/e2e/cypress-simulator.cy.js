describe("Cypress simulator", () => {


  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/?skipCaptcha=true", {
      //onLoad(win) {
       // win.localStorage.setItem("cookieConsent", "accepted")
     // }
    })
    cy.contains("button", "Login").click()

  })


  it("Type a cypress command valid and press run button", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cy.visit('https://google.com)and press run button", { force: true })
    cy.get("#runButton").click({ force: true })
    cy.get("#outputArea").contains("Success")
      .and("be.visible")

  })
  it("Type a cypress command invalid e.g cy cypress.visit(https://google.com)and press run button", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cypress.visit('https://google.com)", { force: true })
    cy.get("#runButton").click({ force: true })
    cy.get("#outputArea").contains("Error")
      .and("contain", "Invalid Cypress command")

  })
  it("Shows an warning when type a cypress command not implementend yet and press run button", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cy.contains()", { force: true })
    cy.get("#runButton").click({ force: true })
    cy.get("#outputArea").contains("Warning")

  })
  it("Shows an error when type a cypress command without parentheses and press run button", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cy.visit", { force: true })
    cy.get("#runButton").click({ force: true })
    cy.get("#outputArea").contains("Missing parentheses")

  })
  it("Check if run button is active or inactive correctly ", () => {
    cy.get("#runButton").should("be.disabled")
    cy.get("#codeInput").type("cy.visit", { force: true })
    cy.get("#runButton").should("not.be.disabled")

  })

  it("CheckS if help works correctly ", () => {
    cy.get("#runButton").should("be.disabled")
    cy.get("#codeInput").type("help")
    cy.get("#runButton").should("not.be.disabled")
    cy.get("#runButton").click()

    cy.get("#outputArea")
      .should("contain", "Common Cypress commands and examples:")
    cy.contains("#outputArea a", "official Cypress API documentation")


  })
  it("maximizes and minimezs a simulation result ", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cy.visit('https://google.com)and press run button", { force: true })
    cy.get("#runButton").click({ force: true })
    cy.get('.expand-collapse').click()

    cy.get("#outputArea").contains("Success")
      .and("be.visible")
    cy.get("#collapseIcon").should("be.visible")
    cy.get('.expand-collapse').click()
    cy.get("#expandIcon").should("be.visible")

  })
  it("Logs out the system successfully ", () => {
    cy.get("#sandwich-menu").click()
    cy.get("#logoutButton").should("be.visible")
    cy.get("#logoutButton").click()
    cy.get('#login').contains("Let's get started!")

  })

  it("Shows and hides logout button", () => {
    cy.get("#sandwich-menu").click()
    cy.get("#logoutButton").should("be.visible")
    cy.get("#sandwich-menu").click()
    cy.get("#logoutButton").should("not.be.disabled")

  })

  it("Shows the running state showing the final result", () => {
    cy.get("form > button").click({ force: true })
    cy.get("#codeInput").type("cy.visit('https://google.com)and press run button", { force: true })
    cy.get("#runButton").click({ force: true })

    cy.contains("button", "Running...").should("be.visible")
      .and("be.visible")

    cy.contains("#outputArea", "Running... Please wait.")
    .should("be.visible")

    cy.contains("button", "Running...")
    .should("not.exist")

    cy.contains("button", "Run")
    .should("be.visible")

     cy.contains("#outputArea", "Success")
    .should("be.visible")

     cy.contains("#outputArea", "Running... Please wait.")
    .should("not.exist")

  })

  it("Accepts cookies",() =>{

    cy.get('#acceptCookies').click()
    cy.get('#cookieConsent > .content')
    .should('not.be.visible');

  })

   it.only("Rejects cookies",() =>{
    cy.get('#declineCookies').click()
    cy.get('#cookieConsent > .content')
    .should('not.be.visible');


  })

})

