class Navigation {
    clickOnNavigationBarButton(button) {
        cy.get('.nav').contains(button).scrollIntoView()
            .should('be.visible')
            .click().should('contain.text', button)
    }

    selectProductCategory(gender, category) {
        cy.get('.left-sidebar').contains('Category').scrollIntoView().should('be.visible')
        cy.get('.category-products').contains(gender).should('be.visible').click()
        cy.get('.category-products').contains(category).should('be.visible').click()
        cy.get('.features_items').should('contain.text', gender + ' - ' + category)
    }

    selectBrandsCategory(brands) {
        cy.get('.left-sidebar').contains('Brands').scrollIntoView().should('be.visible')
        cy.get('.brands_products').contains(brands).should('be.visible').click()
        cy.get('.features_items').should('contain.text', 'Brand' + ' - ' + brands)
    }
}

export default Navigation