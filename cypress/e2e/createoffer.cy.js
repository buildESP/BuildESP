describe('create offer', () => {
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
        
      cy.wait(2000);
      cy.get('.add-button').click();

      cy.get('#title').clear().type('Gladiator');

      cy.get('#description').clear().type('Gladiator is a 2000 epic historical drama film directed by Ridley Scott and written by David Franzoni, John Logan, and William Nicholson. The film was co-produced and released by DreamWorks Pictures and Universal Pictures. It stars Russell Crowe, Joaquin Phoenix, Connie Nielsen, Ralf Möller, Oliver Reed (in his final role), Djimon Hounsou, Derek Jacobi, John Shrapnel, and Richard Harris. Crowe portrays Hispano-Roman general Maximus Decimus Meridius, who is betrayed when Commodus, the ambitious son of Emperor Marcus Aurelius, murders hi');
      cy.get('#url').clear().type('https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png');

      cy.get(':nth-child(5) > select').select('Available');
      cy.get(':nth-child(6) > select').select('4');
      cy.get('.submit-button').click();
        });
});