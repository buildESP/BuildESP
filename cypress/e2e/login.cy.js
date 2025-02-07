describe('Login Test', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://localhost:3001/login'); // Update the URL to match your login page
  
      // Enter email
      cy.get('#email').type('chetholgrem12@gmail.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); // Update the selector to match your submit button
  
      // Assert that the user is redirected to the home page
      cy.url().should('include', '/home'); // Update the URL to match your home page
        
      cy.wait(2000)
      // Assert that a token is stored in localStorage
      cy.window().then((window) => {
        const token = window.localStorage.getItem('Token');
        expect(token).to.exist;
      });
    });
  
    it('should display an error message with invalid credentials', () => {
      // Visit the login page
      cy.visit('http://localhost:3001/login'); // Update the URL to match your login page
  
      // Enter email
      cy.get('#email').type('invalid@example.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('wrongpassword'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); // Update the selector to match your submit button
  
      // Assert that an error message is displayed
      cy.get('.error-message').should('contain', 'Échec de la connexion. Veuillez vérifier vos identifiants.'); // Update the selector and message to match your error message
    });
  });