describe('It testing UI', () => {
    beforeEach('Visit page', () => {
        cy.visit('/')
    })

    it('1)Get All Products List', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/productsList'
        }).then((resp) => {
            const responseList = JSON.parse(resp.body)
            const productsList = responseList.products
            for (let product of productsList) {
                cy.log(product)
                expect(responseList).property('responseCode').to.eq(200)
            }
        })
    })

    it('2) POST To All Products List', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/productsList',
            body: {
                "id": 2,
                "name": "Sky",
                "price": "Rs. 5000",
                "brand": "Guess",
                "category": {
                    "usertype": {
                        "usertype": "Women"
                    },
                    "category": "Tops"
                }
            }
        }).then((resp) => {
            expect(resp.body).property('responseCode').to.eq(405)
            expect(resp.body).property('message').to.eq('This request method is not supported.')
        })
    })


    it('3)Get All Brands List', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/productsList'
        }).then((resp) => {
            const responseList = JSON.parse(resp.body)
            const brandsList = responseList.products.map(product => product.brand)
            const uniqueBrands = new Set(brandsList)
            cy.log(uniqueBrands)
            expect(responseList).property('responseCode').to.eq(200)
        })
    })


    it('4)PUT To All Brands List', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/productsList'
        }).then((resp) => {
            const responseList = JSON.parse(resp.body)
            const productsList = responseList.products
            for (let product of productsList) {
                cy.log(product)
                expect(responseList).property('responseCode').to.eq(200)
                cy.request({
                    method: 'PUT',
                    url: 'https://automationexercise.com/api/productsList',
                    body: product
                }).then((resp) => {
                    expect(resp.body).property('responseCode').to.eq(405)
                    expect(resp.body).property('message').to.eq('This request method is not supported.')
                })
            }
        })
    })
})