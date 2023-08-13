describe('example tests', () => {
  it('visits the kitchen sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    cy.url().should('include', '/commands/actions')

    
  })
})