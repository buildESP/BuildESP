# Cypress Cheatsheet

## Visiting Pages
```javascript
cy.visit('http://localhost:3001/login'); // Visit the login page

cy.get('#email'); // Get the email input field
cy.get('#password'); // Get the password input field
cy.get('.login-button'); // Get the login button
cy.get('.error-message'); // Get the error message element

cy.get('#email').type('chetholgrem12@gmail.com'); // Type email into the email input field
cy.get('#password').type('password'); // Type password into the password input field
cy.get('.login-button').click(); // Click the login button

cy.get('#email').type('chetholgrem12@gmail.com'); // Type email into the email input field
cy.get('#password').type('password'); // Type password into the password input field
cy.get('.login-button').click(); // Click the login button

cy.url().should('include', '/home'); // Assert that the URL includes '/home'
cy.get('.error-message').should('contain', 'Échec de la connexion. Veuillez vérifier vos identifiants.'); // Assert that the error message contains specific text
cy.window().then((window) => {
  const token = window.localStorage.getItem('Token'); // Get the token from localStorage
  expect(token).to.exist; // Assert that the token exists
});