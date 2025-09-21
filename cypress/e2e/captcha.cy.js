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