/* global cy */
/// <reference types="cypress" />
// The test suite is named "Logout test" and contains a single test case that checks if the user can log out successfully.
describe('Logout test', () => { 
    it('should logout successfully', () => {
      // Visit the login page
      cy.visit('http://localhost:8080/login'); // Update the URL to match your login page
  
      cy.get('.css-e2gte6').click(); // Click on the login button to open the login dialog
      // Enter email
      cy.get('[placeholder="Email"]').type('alice.dupont@example.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('[placeholder="Mot de passe"]').type('password'); // Update the selector to match your password input field
      
      // Click the login button
      cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').click(); // Update the selector to match your submit button
  
      // Assert that the user is redirected to the home page
      cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').should('be.visible');
      cy.url().should('include', '/');
      cy.wait(1000);
      cy.get('.css-cf46sk').click();
      cy.wait(1000);
      cy.url().should('include', '/'); // Update the URL to match your home page
       // Update the selector to match your home page button
    });
});