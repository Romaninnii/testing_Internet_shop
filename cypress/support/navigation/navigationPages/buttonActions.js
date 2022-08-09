class ButtonActions {

    clickOnButton(buttonName) {
        cy.get('.btn').contains(buttonName).scrollIntoView().click({multiple: true})
    }

    clickOnBtnArrowSubscribe() {
        cy.get('#subscribe').click()
    }

    clickOnBtnArrowScrollUp() {
        cy.get('#scrollUp').click()
    }

    viewFirstProductOnProductsPage() {
        cy.get('.product-image-wrapper .choose').first().click()
        cy.get('.product-information')
            .should('contain.text', 'Category')
            .should('contain.text', 'Brand')
            .should('contain.text', 'Condition')
            .should('contain.text', 'Availability')
    }

    viewRandomProduct() {
        cy.get('.choose')
            .should('have.length.greaterThan', 0)
            .its('length')
            .then((n) => Cypress._.random(0, n - 1))
            .then((k) => {
                cy.get('.choose .fa')
                    .eq(k).scrollIntoView()
                    .dblclick({force: true})
            })
        cy.get('.product-information')
            .should('contain.text', 'Category')
            .should('contain.text', 'Brand')
            .should('contain.text', 'Condition')
            .should('contain.text', 'Availability')
    }

    addRandomProductToCartOnProductsPage() {
        cy.get('.product-overlay .add-to-cart')
            .should('have.length.greaterThan', 0)
            .its('length')
            .then((n) => Cypress._.random(0, n - 1))
            .then((k) => {
                cy.get('.product-overlay .add-to-cart')
                    .eq(k).scrollIntoView()
                    .click({force: true})
            })
        cy.contains('Continue Shopping').click()
    }

    addAllProductsToCart() {
        cy.get('.product-overlay .add-to-cart')
            .should('contain.text', 'Add to cart')
            .each(($btn) => {
                cy.wrap($btn).scrollIntoView().click({force: true}).get('.btn-success').contains('Continue Shopping').click({multiple: true})
            })
    }

    clickOnBtnClearCart() {
        cy.get('#cart_items').then(($items) => {
            if ($items.find('.cart_quantity_delete').length > 0) {
                return cy.get('.cart_quantity_delete').click({multiple: true})
            } else {
                cy.get('#cart_items').contains('Cart is empty!')
            }
        })

    }

    scrollToRecommendedItemsAndAddRandomProductToCart() {
        cy.contains('recommended items').scrollIntoView().should('be.visible')
        cy.get('#recommended-item-carousel .add-to-cart')
            .should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then((n) => Cypress._.random(0, n - 1))
            .then(cy.log)
            .then((k) => {
                cy.get('#recommended-item-carousel .add-to-cart')
                    .eq(k)
                    .click({force: true})
            })
        cy.contains('Continue Shopping').click()

    }
}

export default ButtonActions