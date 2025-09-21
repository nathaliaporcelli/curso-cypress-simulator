describe("Cypress simulator - A11y checks", () => {
    beforeEach(() => {
        cy.login()
        cy.visit("src/index.html?skipCaptcha=true", {
            onBeforeLoad(win) {
                win.localStorage.setItem("cookieConsent", "accepted")
            }
        })
        cy.injectAxe()

    })
    Cypress._.times(100, () => {
        it("Type a cypress command valid and press run button", () => {
            cy.run("cy.visit('https://google.com)")
            cy.get("#outputArea").contains("Success")
                .and("be.visible")
            cy.checkA11y(".success")
        })

    })



    it("Type a cypress command invalid e.g cy cypress.visit(https://google.com)and press run button", () => {
        cy.run("cypress.visit('https://google.com)")
        cy.get("#outputArea").contains("Error")
            .and("contain", "Invalid Cypress command")
        cy.checkA11y(".error")

    })
    it("Shows an warning when type a cypress command not implementend yet and press run button", () => {
        cy.run("cy.contains()")
        cy.get("#outputArea").contains("Warning")

    })
    it("CheckS if help works correctly ", () => {
        cy.run("help")
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
        cy.checkA11y()
        cy.get('.expand-collapse').click()
        cy.get("#expandIcon").should("be.visible")

    })
    it("Logs out the system successfully ", () => {
        cy.get("#sandwich-menu").click()
        cy.get("#logoutButton").should("be.visible")
        cy.get("#logoutButton").click()
        cy.get('#login').contains("Let's get started!")
        cy.checkA11y()


    })

    it("Shows and hides logout button", () => {
        cy.get("#sandwich-menu").click()
        cy.get("#logoutButton").should("be.visible")
        cy.checkA11y()
        cy.get("#sandwich-menu").click()
        cy.get("#logoutButton").should("not.be.disabled")

    })

    it("Shows the running state showing the final result", () => {
        cy.run("cy.visit('https://google.com)and press run button")
        cy.contains("button", "Running...").should("be.visible")
            .and("be.visible")
        cy.checkA11y()

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






})
describe("Cypress simulator - Captcha", () => {

    beforeEach(() => {
        cy.visit("./src/index.html", {

        })
        cy.injectAxe()
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

describe("Cypress simulator captcha2", () => {
    beforeEach(() => {
        cy.visit("src/index.html")
        cy.injectAxe()
        cy.contains("button", "Login").click()

    })

    it("Finds no a11y issues on captcha view states issues (button enabled/dissabled and error", () => {
        cy.get('#verifyCaptcha').should("be.disabled")
        cy.get('#captchaInput').type(100)
        cy.get('#verifyCaptcha').should("be.enabled")
        cy.contains("button", "Verify").click()
        cy.checkA11y()
        cy.contains(".error", "Incorrect answer, please try again.").should("be.visible")
        cy.get("input[placeholder='Enter your answer']").should("have.value", "")
        cy.contains("button", "Verify").should("be.disabled")
        cy.checkA11y()


    })

})