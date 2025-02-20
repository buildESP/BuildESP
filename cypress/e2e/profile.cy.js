describe('profile Test', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://${process.env.REACT_APP_FRONTEND_IP}:3001/login'); // Update the URL to match your login page
  
      // Enter email
        
      // Enter email
      cy.get('#email').type('chetholgrem12@gmail.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); 
      
      cy.wait(500);

      cy.get('[href="/profile"]').click();

      cy.url().should('include', '/profile');

      cy.get('.profile-name').should('contain', 'Mamadou');
      // Update the selector to match your submit button
    });
    it('should update profile successfully', () => {
      // Visit the login page
      cy.visit('http://${process.env.REACT_APP_FRONTEND_IP}:3001/login'); // Update the URL to match your login page
  
      // Enter email
          // Enter email
      cy.get('#email').type('chetholgrem12@gmail.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); 
      
      cy.wait(500);

      cy.get('[href="/profile"]').click();

      cy.get('.profile-card > .nav-button').click();

      cy.get('#nom').type('Tall');

    

      cy.get('#prenom').clear().type('Mamadou');

      cy.get('[type="submit"]').click();
    });
});