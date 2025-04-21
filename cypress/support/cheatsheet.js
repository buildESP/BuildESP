// Cypress Cheatsheet

// Visiting a URL
cy.visit('http://example.com');

// Getting an element
cy.get('.selector'); // Select by class
cy.get('#selector'); // Select by ID
cy.get('button');    // Select by tag

// Interacting with elements
cy.get('input').type('Hello World'); // Type into an input field
cy.get('input').clear();             // Clear an input field
cy.get('button').click();            // Click a button
cy.get('select').select('Option');   // Select an option from a dropdown

// Assertions
cy.url().should('include', '/home'); // Assert URL contains a string
cy.get('.selector').should('exist'); // Assert element exists
cy.get('.selector').should('not.exist'); // Assert element does not exist
cy.get('.selector').should('be.visible'); // Assert element is visible
cy.get('.selector').should('contain', 'Text'); // Assert element contains text

// Working with forms
cy.get('#email').type('user@example.com'); // Type into an email field
cy.get('#password').type('password');     // Type into a password field
cy.get('.login-button').click();          // Click the login button

// Checking localStorage
cy.window().then((win) => {
  expect(win.localStorage.getItem('token')).to.exist; // Assert token exists in localStorage
});

// Handling requests
cy.request('https://api.example.com').its('status').should('eq', 200); // Assert API response status

// Waiting
cy.wait(2000); // Wait for 2 seconds

// Clicking links
cy.get('[href="/profile"]').click(); // Click a link by its href attribute

// Handling modals
cy.get('.modal').should('be.visible'); // Assert modal is visible
cy.get('.modal-close').click();        // Close a modal

// Debugging
cy.debug(); // Pause and debug
cy.log('Custom message'); // Log a custom message to the Cypress console

// Custom Commands (Example)
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('.login-button').click();
});

// Usage of custom command
cy.login('user@example.com', 'password');

// Custom command for records of all tests
//npx cypress run --record --key da42bee9-a37d-4a43-a71f-b5a101d3adc1