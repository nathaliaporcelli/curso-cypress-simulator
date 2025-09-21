describe("Cypress simulator", () => {


  beforeEach(() => {
    cy.login()
    cy.visit("src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })

  })

  it("Type a cypress command valid and press run button", () => {
    cy.run("cy.visit('https://google.com")
    cy.get("#outputArea").contains("Success")
      .and("be.visible")

  })

  it("Type a cypress command invalid e.g cy cypress.visit(https://google.com)and press run button", () => {
    cy.run("cypress.visit('https://google.com)")
    cy.get("#outputArea").contains("Error")
      .and("contain", "Invalid Cypress command")

  })

  it("Shows an warning when type a cypress command not implementend yet and press run button", () => {
    cy.run("cy.contains()")
    cy.get("#outputArea").contains("Warning")

  })

  it("Shows an error when type a cypress command without parentheses and press run button", () => {
    cy.run("cy.visit")
    cy.get("#outputArea").contains("Missing parentheses")

  })

  it("Check if run button is active or inactive correctly ", () => {
    cy.get("#runButton").should("be.disabled")
    cy.get("#codeInput").type("cy.visit", { force: true })
    cy.get("#runButton").should("not.be.disabled")

  })

  it("CheckS if help works correctly ", () => {
    cy.run("help")
    cy.get("#outputArea")
      .should("contain", "Common Cypress commands and examples:")
    cy.contains("#outputArea a", "official Cypress API documentation")

  })
  it("maximizes and minimezs a simulation result ", () => {
    cy.run("cy.visit('https://google.com')")
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
    cy.run("cy.visit('https://google.com)")

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

  it("Verify button run states", () => {
    cy.run("cy.log()")
    cy.get('#codeInput').clear()
    cy.get('#runButton').should("be.disabled")

  })
  it("Verify the initial state after logout and login", () => {
    cy.run("cy.log('Hi')")
    cy.get('#sandwich-menu').click()
    cy.get('#logoutButton').click()
    cy.get('form > button').click()
    cy.get('#codeInput').should("have.value", "")
    cy.get('#runButton').should("be.disabled")

  })
  it("Verify the initial state of output area after logout and login", () => {
    cy.run("cy.log('Hi')")
    cy.get('#sandwich-menu').click()
    cy.get('#logoutButton').click()
    cy.contains("button", "Login").click()
    cy.get('#outputArea').should("not.contain", "cy.log('Hi')")


  })
  it("Doesn't show the cookie consent", () => {
    cy.clearAllLocalStorage()
    cy.reload()
    cy.contains("button", "Login").should("be.visible")
    cy.get('#cookieConsent').should("not.be.visible")

  })

})
describe("Cypress simulator - Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html", {

    })
    cy.contains("button", "Login").click()

  })
  it("Disables the captcha verify button when no answer is provided or its cleared", () => {
    cy.get('#verifyCaptcha').should("be.disabled")
    cy.get('#captchaInput').type(1)
    cy.get('#verifyCaptcha').should("be.enabled")
    cy.get('#captchaInput').clear()
    cy.get('#verifyCaptcha').should("be.disabled")

  })
  it("Shows an error on a wrong captcha answer and goes back to its inicial state", () => {
    cy.get('#captchaInput').type(19)
    cy.get('#verifyCaptcha').click()
    cy.get('#captchaError').contains("Incorrect answer, please try again").should("be.visible")
    cy.get('#captchaError').should("have.value", "")
    cy.get('#verifyCaptcha').should("be.disabled")

  })

})
