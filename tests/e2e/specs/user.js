// https://docs.cypress.io/api/introduction/api.html

describe('User tests', () => {
  it('Login user', () => {
    localStorage.removeItem('confirmed-terms')

    // Arrange - setup initial app state
    cy.visit('/login')
    cy.contains('Nutzungsbedingungen bestätigen')
    cy.contains('button', 'Ja').click().should(() => {
      expect(localStorage.getItem('confirmed-terms')).to.eq('1')
    })
    
    cy.get('input[type=email]')
      .type('jen@test.de')

    cy.get('input[type=password')
      .type('111111')

    cy.contains('Anmelden').click()
    cy.url().should('include', '/explore')

  })
})
