describe('template spec', () => {
  it('should register successfully', () => {
    cy.visit('http://localhost:8080/login');

    
    cy.get('[href="/register"]').click();
    
    cy.get('#conditions').should('contain', 'En vous inscrivant, vous acceptez nos conditions d\'utilisation et notre politique de confidentialité.');

    cy.get('#name').type('John wicked');

    cy.get('#email').type('johnwick1@gmail.com');

    cy.get('#password').type('password');

    cy.get('#confirmPassword').type('password');

    cy.get('.login-button').click();

    cy.url().should('include', '/login'); // Update the URL to match your home page

    cy.wait(1000)
  })
})