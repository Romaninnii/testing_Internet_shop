import Navigation from "../navigation/navigation";
import ButtonActions from "../navigation/navigationPages/buttonActions";
import buttonName from "../../fixtures/buttonName.json"
import navBar from "../../fixtures/navigation/navBar.json"


const buttonActions = new ButtonActions()
const navigation = new Navigation()


class LoginPage {
    loginToAccount(user) {
        cy.get('.navbar-nav').should('be.visible')
        navigation.clickOnNavigationBarButton(navBar.signUpOrLogin)
        cy.get('.login-form').contains('Login to your account').should('be.visible')
        cy.get('.login-form [type="email"]').clear().type(user.emailAddress)
        cy.get('.login-form [type="password"]').clear().type(user.password)
        buttonActions.clickOnButton(buttonName.login)
        cy.get('body').then(($body) => {
            if ($body.find('.fa-user').length > 0) {
                cy.contains('Logged in as' + ' ' + user.name).should('be.visible')
            } else {
                cy.get('.login-form > form > p').contains('Your email or password is incorrect!').should('be.visible')
            }
        })
    }
}

export default LoginPage