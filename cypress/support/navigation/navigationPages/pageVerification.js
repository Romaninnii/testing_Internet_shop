class PageVerification {

    verifyHomePage() {
        cy.get('body').should('be.visible')
        cy.get('[style="color: orange;"]').should('be.visible')
    }

    verifyNameAndCount(productName) {
        cy.get('.cart_description').should('contain.text', productName.name)
        cy.get('.cart_quantity').should('contain.text', productName.quantity)
    }

    checkingThePageByKeyword(keyword) {
        cy.get('[class="title text-center"]').contains(keyword).should('be.visible')
    }

    verifySubscription() {
        cy.get('footer').scrollIntoView().should('contain.text', 'Subscription')
    }

    verifyTitleOnMainPage(title) {
        cy.get('#slider').should('contain.text', title)
    }

    checkIsSuccessMessageAppear(message) {
        cy.contains(message).should('be.visible')
    }

    verifyQuantityOfProduct(quantity) {
        cy.get('.cart_quantity')
            .should('contain.text', quantity)
    }

    verifyDescriptionPricesQuantityAndTotalPrice(product) {
        cy.get('.cart_description')
            .should('contain.text', product.name)
        cy.get('.cart_price')
            .should('contain.text', product.price)
        cy.get('.cart_quantity')
            .should('contain.text', product.quantity)
        cy.get('.cart_total')
            .should('contain.text', product.total)
    }
}

export default PageVerification