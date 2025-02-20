describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://${process.env.FRONTEND_IP}:3001/')
  })
})