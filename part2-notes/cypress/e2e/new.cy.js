describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click({ force: true })
  })

  describe('when logged in', function() {
    beforeEach(function(){
      cy.contains('login').click({ force: true })
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
    it('a new note can be created', function() {
      cy.on('uncaught:exception', (err, runnable) => {
        // we expect a 3rd party library error with message 'list not defined'
        // and don't want to fail the test so we return false
        if (err.message.includes('list not defined')) {
          return false
        }
      })
      cy.contains('new note').click({ force: true })
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
}) 