/* global cy */
/// <reference types="cypress" />

describe('Login Test', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://localhost:8080/login'); // Update the URL to match your login page
  
      // Enter email
      cy.get('[placeholder="Email"]').type('alice.dupont@example.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('[placeholder="Mot de passe"]').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').click(); // Update the selector to match your submit button
  
      // Assert that the user is redirected to the home page
      cy.url().should('include', '/'); // Update the URL to match your home page
        
      cy.wait(4000);
      // Assert that a token is stored in localStorage
      cy.get('[href="/profile"]').click();

      cy.url().should('include', '/profile');
        });
  });