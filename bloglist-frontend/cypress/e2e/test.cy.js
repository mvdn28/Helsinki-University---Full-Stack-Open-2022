describe('Blog app: 5.17-5.22', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mauricio Vieira',
      username: 'mvieira',
      password: 'teste123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', () => {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('.username-input').type('mvieira')
      cy.get('.password-input').type('teste123')
      cy.contains('login').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('.username-input').type('mvieira')
      cy.get('.password-input').type('wrong')
      cy.contains('login').click()

      cy.get('.error').should('contain','Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('.username-input').type('mvieira')
      cy.get('.password-input').type('teste123')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()

      cy.get('#form-title').type('New blog create')
      cy.get('#form-author').type('New Author create')
      cy.get('#form-url').type('New Url create')
      cy.get('#form-create').click()

      cy.contains('New blog create')
      cy.contains('New Author create')
      cy.contains('view')
    })

    it('A blog can be liked', function() {
      cy.contains('create blog').click()

      cy.get('#form-title').type('New blog create')
      cy.get('#form-author').type('New Author create')
      cy.get('#form-url').type('New Url create')
      cy.get('#form-create').click()

      cy.get('.view-button').click()

      cy.get('.like-button').click()
    })

    it('A blog can be deleted', function() {
      cy.contains('create blog').click()

      cy.get('#form-title').type('New blog create')
      cy.get('#form-author').type('New Author create')
      cy.get('#form-url').type('New Url create')
      cy.get('#form-create').click()
      
      cy.get('.view-button').click()

      cy.get('.delete-button').click()

      cy.contains('New blog create').not()
    })

    it('A blog is displayed by most likes', function() {
      cy.contains('create blog').click()

      cy.get('#form-title').type('The title with the second most likes')
      cy.get('#form-author').type('New Author less')
      cy.get('#form-url').type('New Url less')
      cy.get('#form-create').click()

      cy.contains('create blog').click()

      cy.get('#form-title').type('The title with the most likes')
      cy.get('#form-author').type('New Author more')
      cy.get('#form-url').type('New Url more')
      cy.get('#form-create').click()
      
      cy.get('.view-button').eq(1).click()
      cy.get('.like-button').eq(1).click()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})