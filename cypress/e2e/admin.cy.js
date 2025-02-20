describe('Login Test', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://${process.env.FRONTEND_IP}:3001/login'); // Update the URL to match your login page
  
      // Enter email
      cy.get('#email').type('alice.dupont@example.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); // Update the selector to match your submit button
  
      // Assert that the user is redirected to the home page
      cy.url().should('include', '/home'); // Update the URL to match your home page
        
      cy.wait(2000)
      // Assert that a token is stored in localStorage
      cy.get('[href="/profile"]').click();

      cy.get(':nth-child(6) > .card > .card-image').click();

      cy.get('.offer-button-demands').click();
        });
  });