describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'imed',
            username: 'imed',
            password: 'imed'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('form').as('loginForm')
        cy.get('@loginForm').get('#login-button').contains('login')
        cy.get('@loginForm').get('div:first').contains('username')
        cy.get('@loginForm').find('div:last').contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('imed')
            cy.get('#password').type('imed')
            cy.get('#login-button').click()

            cy.contains('imed logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('imed')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'imed', password: 'imed' })
        })
    
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('title')
            cy.get('#author').type('author')
            cy.get('#url').type('url.com')
            cy.get('#create-button').click()
            cy.contains('title')
            cy.contains('author')
        })

        describe('and some blogs exists', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'first title', author: 'first author', url: 'firsturl.com' })
                cy.createBlog({ title: 'second title', author: 'second author', url: 'secondurl.com' })
                cy.createBlog({ title: 'third title', author: 'third author', url: 'thirdurl.com' })
            })
      
            it('liking one of them', function () {
                cy.contains('second title').contains('view').click()
                cy.contains('second title').contains('like').as('likesButton')
                cy.contains('likes 0')
                cy.get('@likesButton').click()
                cy.contains('likes 1')
            })

            it('deleting one of them', function () {
                cy.contains('second title').contains('view').click()
                cy.contains('second title').contains('remove').as('removeBlog')                
                cy.get('@removeBlog').click()
                cy.should('not.contain', 'second title')
            })

            it.only('blog are aordered by most likes', function () {
                cy.contains('first title')
                    .contains('view')
                    .click()
                cy.contains('first title')
                    .contains('like')
                    .click()
                cy.wait(1000)
                cy.contains('first title')
                    .contains('like')
                    .click()
        
                cy.contains('second title')
                    .contains('view')
                    .click()
                cy.contains('second title')
                    .contains('like')
                    .click()
        
                cy.contains('third title')
                    .contains('view')
                    .click()
        
                cy.get('.blogStyle').eq(0).should('contain', 'likes 2')
                cy.get('.blogStyle').eq(1).should('contain', 'likes 1')
                cy.get('.blogStyle').eq(2).should('contain', 'likes 0')
            })
        })
    })
})