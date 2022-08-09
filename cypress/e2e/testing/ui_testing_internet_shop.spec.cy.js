import LoginPage from "../../support/login/loginPage"
import Navigation from "../../support/navigation/navigation";
import PagesActions from "../../support/navigation/navigationPages/pagesActions";
import ButtonActions from "../../support/navigation/navigationPages/buttonActions";
import topBlue from "../../fixtures/products/topBlue.json"
import menTshirt from "../../fixtures/products/menTshirt.json"
import navBar from "../../fixtures/navigation/navBar.json"
import roman from "../../fixtures/users/roman.json"
import ivan from "../../fixtures/users/ivan.json"
import cardSonic from "../../fixtures/cards/cardSonic.json"
import cardTurbo from "../../fixtures/cards/cardTurbo.json"
import buttonName from "../../fixtures/buttonName.json"
import clothesCategory from "../../fixtures/navigation/clothesCategory.json"
import clothesBrands from "../../fixtures/navigation/clothesBrands.json"
import PageVerification from "../../support/navigation/navigationPages/pageVerification";

const loginPage = new LoginPage()
const navigation = new Navigation()
const pagesActions = new PagesActions()
const buttonActions = new ButtonActions()
const pageVerification = new PageVerification()
const text = 'text.docx'
const description = 'Description description'
const congratulationsMessage = 'Congratulations! Your order has been confirmed!'
const subscribedMessage = 'You have been successfully subscribed!'
const contactUsMessage = 'Success! Your details have been submitted successfully.'
const reviewMessage = 'Thank you for your review.'
const titleOnMainPage = 'Full-Fledged practice website for Automation Engineers'
const testCasesPage = 'Test Cases'
const allProductsPage = 'All Products'
const product = {
    'name': 'shirt',
    'quantity': '1'
}


describe('It UI test cases for testing  website of Internet-shop "Automation Exercise".', () => {

    before('Check is the cart empty and clear if full', () => {
        cy.visit('/')
        loginPage.loginToAccount(roman)
        navigation.clickOnNavigationBarButton(navBar.cart)
        buttonActions.clickOnBtnClearCart()
        navigation.clickOnNavigationBarButton(navBar.logout)
    })

    beforeEach('Visit page', () => {
        cy.visit('/')
        pageVerification.verifyHomePage()
    })

    it('2)Login User with correct email and password', () => {
        loginPage.loginToAccount(roman)
    })

    it('3)Login User with incorrect email and password.', () => {
        loginPage.loginToAccount(ivan)
    })

    it('4)Logout User.', () => {
        loginPage.loginToAccount(roman)
        navigation.clickOnNavigationBarButton(navBar.logout)
    })

    it('6)Fill and send "Contact Us Form".', () => {
        navigation.clickOnNavigationBarButton(navBar.contactUs)
        pagesActions.fillContactUsField(roman, text)
        buttonActions.clickOnButton(buttonName.submit)
        pageVerification.checkIsSuccessMessageAppear(contactUsMessage)
        buttonActions.clickOnButton(buttonName.home)
    })

    it('7)Verify Test Cases Page.', () => {
        navigation.clickOnNavigationBarButton(navBar.testCases)
        pageVerification.checkingThePageByKeyword(testCasesPage)
    })

    it('8) Verify All Products and product detail page.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        pageVerification.checkingThePageByKeyword(allProductsPage)
        buttonActions.viewFirstProductOnProductsPage()
    })

    it('9) Search Product.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        pageVerification.checkingThePageByKeyword(allProductsPage)
        pagesActions.findProductOnProductsPage(product.name)
    })

    it('10) Verify Subscription in home page.', () => {
        pagesActions.scrollDownToFooter()
        pagesActions.typeAndSendEmailForSubscription(roman)
        pageVerification.checkIsSuccessMessageAppear(subscribedMessage)
    })

    it('11) Verify Subscription in Cart page.', () => {
        navigation.clickOnNavigationBarButton(navBar.cart)
        pagesActions.scrollDownToFooter()
        pagesActions.typeAndSendEmailForSubscription(roman)
        pageVerification.checkIsSuccessMessageAppear(subscribedMessage)
    });

    it('12) Add Products in Cart.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        pagesActions.findProductOnProductsPage(topBlue.name)
        buttonActions.clickOnButton(buttonName.addToCart)
        buttonActions.clickOnButton(buttonName.continue)
        pagesActions.findProductOnProductsPage(menTshirt.name)
        buttonActions.clickOnButton(buttonName.addToCart)
        buttonActions.clickOnButton(buttonName.continue)
        navigation.clickOnNavigationBarButton(navBar.cart)
        pageVerification.verifyDescriptionPricesQuantityAndTotalPrice(topBlue)
        pageVerification.verifyDescriptionPricesQuantityAndTotalPrice(menTshirt)
    });

    it('13) Verify Product quantity in Cart.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        buttonActions.viewRandomProduct()
        pagesActions.increaseNumberOfUnitsProduct('4')
        buttonActions.clickOnButton(buttonName.addToCart)
        buttonActions.clickOnButton(buttonName.continue)
        navigation.clickOnNavigationBarButton(navBar.cart)
        pageVerification.verifyQuantityOfProduct('4')
    });

    it('16) Place Order: Login before Checkout.', () => {
        loginPage.loginToAccount(roman)
        navigation.clickOnNavigationBarButton(navBar.home)
        buttonActions.addRandomProductToCartOnProductsPage()
        navigation.clickOnNavigationBarButton(navBar.cart)
        buttonActions.clickOnButton(buttonName.proceedToCheckout)
        pagesActions.enterDescription(description)
        buttonActions.clickOnButton(buttonName.placeOrder)
        pagesActions.fillPaymentCardDetails(cardSonic)
        buttonActions.clickOnButton(buttonName.payAndConfirmOrder)
        pageVerification.checkIsSuccessMessageAppear(congratulationsMessage)
        navigation.clickOnNavigationBarButton(navBar.logout)
    });

    it('17) Remove Products From Cart.', () => {
        buttonActions.addRandomProductToCartOnProductsPage()
        navigation.clickOnNavigationBarButton(navBar.cart)
        buttonActions.clickOnBtnClearCart()
    });

    it('18)View Category Products.', () => {
        navigation.selectProductCategory(clothesCategory.gender.women, clothesCategory.category.dress)
        navigation.selectProductCategory(clothesCategory.gender.men, clothesCategory.category.jeans)
    });

    it('19) View & Cart Brand Products.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        navigation.selectBrandsCategory(clothesBrands.babyhug)
    });

    it('20) Search Products and Verify Cart After Login.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        pageVerification.checkingThePageByKeyword(allProductsPage)
        pagesActions.findProductOnProductsPage(product.name)
        buttonActions.addAllProductsToCart()
        navigation.clickOnNavigationBarButton(navBar.cart)
        pageVerification.verifyNameAndCount(product)
        loginPage.loginToAccount(roman)
        navigation.clickOnNavigationBarButton(navBar.cart)
        pageVerification.verifyNameAndCount(product)

    });

    it('21) Add review on product.', () => {
        navigation.clickOnNavigationBarButton(navBar.products)
        pageVerification.checkingThePageByKeyword(allProductsPage)
        buttonActions.viewFirstProductOnProductsPage()
        pagesActions.fillReviewWhenOpenProduct(ivan)
        pageVerification.checkIsSuccessMessageAppear(reviewMessage)
    });

    it('22) Add to cart from Recommended items.', () => {
        buttonActions.scrollToRecommendedItemsAndAddRandomProductToCart()
        navigation.clickOnNavigationBarButton(navBar.cart)
    });

    it('24: Download Invoice after purchase order.', () => {
        buttonActions.addRandomProductToCartOnProductsPage()
        navigation.clickOnNavigationBarButton(navBar.cart)
        buttonActions.clickOnButton(buttonName.proceedToCheckout)
        buttonActions.clickOnButton(buttonName.continueOnCart)
        loginPage.loginToAccount(roman)
        navigation.clickOnNavigationBarButton(navBar.cart)
        buttonActions.clickOnButton(buttonName.proceedToCheckout)
        pagesActions.enterDescription(description)
        buttonActions.clickOnButton(buttonName.placeOrder)
        pagesActions.fillPaymentCardDetails(cardTurbo)
        buttonActions.clickOnButton(buttonName.payAndConfirmOrder)
        pageVerification.checkIsSuccessMessageAppear(congratulationsMessage)
    });

    it('25: Verify Scroll Up using Arrow button and Scroll Down functionality.', () => {
        pagesActions.scrollDownToFooter()
        pageVerification.verifySubscription()
        buttonActions.clickOnBtnArrowScrollUp()
    });

    it('26: Verify Scroll Up without Arrow button and Scroll Down functionality.', () => {
        pagesActions.scrollDownToFooter()
        pagesActions.scrollUpToHeader()
        pageVerification.verifyTitleOnMainPage(titleOnMainPage)
    });
})

