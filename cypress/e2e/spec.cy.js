describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://${process.env.REACT_APP_FRONTEND_IP}:3001/')
  })
})