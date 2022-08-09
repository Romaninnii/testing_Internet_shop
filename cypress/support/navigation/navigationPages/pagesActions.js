import ButtonActions from "./buttonActions";
import buttonName from "../../../fixtures/buttonName.json"

const buttonActions = new ButtonActions()


class PagesActions {

    fillNameFieldsOnContactUsPage(name) {
        cy.get('#contact-us-form [name="name"]').clear().type(name)
    }

    fillEmailFieldsOnContactUsPage(email) {
        cy.get('#contact-us-form [name="email"]').clear().type(email)
    }

    fillSubjectFieldsOnContactUsPage(subject) {
        cy.get('#contact-us-form [name="subject"]').clear().type(subject)
    }

    fillMessageFieldsOnContactUsPage(message) {
        cy.get('#contact-us-form [name="message"]').clear().type(message)
    }

    uploadFileOnContactUsPage(file) {
        cy.get('#contact-us-form [name="upload_file"]').attachFile(file)
    }

    fillNameOnCardField(card) {
        cy.get('[name="name_on_card"]').clear().type(card.nameOnCard)
    }

    fillCardNumberField(card) {
        cy.get('[name="card_number"]').clear().type(card.cardNumber)
    }

    fillCvcFieldOfCard(card) {
        cy.get('[name="cvc"]').clear().type(card.cvc)
    }

    fillExpirationMonthField(card) {
        cy.get('[name="expiry_month"]').clear().type(card.expirationMonth)
    }

    fillExpirationYearField(card) {
        cy.get('[name="expiry_year"]').clear().type(card.ExpirationYear)
    }


    fillTheFieldReviewYourName(user) {
        cy.get('#review-form #name').clear().type(user.name)
    }

    fillTheFieldReviewEmail(user) {
        cy.get('#review-form #email').clear().type(user.emailAddress)
    }

    fillTheFieldAddReviewHere(user) {
        cy.get('#review-form #review').clear().type(user.review)
    }

    findProductOnProductsPage(product) {
        cy.get('#search_product').clear().type(product)
        cy.get('#submit_search').click()
        cy.get('.single-products')
            .should('be.visible')
            .should("contain.text", product)
    }

    increaseNumberOfUnitsProduct(quantity) {
        cy.get('#quantity').clear().type(quantity)
    }

    enterDescription(text) {
        cy.get('.form-control').scrollIntoView().type(text)
    }

    scrollDownToFooter() {
        cy.get('#footer').scrollIntoView().should('be.visible')
    }

    scrollUpToHeader() {
        cy.get('#header').scrollIntoView().should('be.visible')
    }

    typeAndSendEmailForSubscription(user) {
        cy.contains('Subscription').should('be.visible')
        cy.get('#susbscribe_email').type(user.emailAddress)
        buttonActions.clickOnBtnArrowSubscribe()
    }


    fillContactUsField(user, file) {
        cy.get('#contact-page').should('contain.text', 'Get In Touch')
        this.fillNameFieldsOnContactUsPage(user.name)
        this.fillEmailFieldsOnContactUsPage(user.emailAddress)
        this.fillSubjectFieldsOnContactUsPage(user.subject)
        this.fillMessageFieldsOnContactUsPage(user.message)
        this.uploadFileOnContactUsPage(file)
    }

    fillPaymentCardDetails(card) {
        this.fillNameOnCardField(card)
        this.fillCardNumberField(card)
        this.fillCvcFieldOfCard(card)
        this.fillExpirationMonthField(card)
        this.fillExpirationYearField(card)
    }

    fillReviewWhenOpenProduct(user) {
        cy.contains('Write Your Review').should('be.visible')
        this.fillTheFieldReviewYourName(user)
        this.fillTheFieldReviewEmail(user)
        this.fillTheFieldAddReviewHere(user)
        buttonActions.clickOnButton(buttonName.submit)
    }
}

export default PagesActions