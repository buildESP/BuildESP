/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the login functionality of a web application using Cypress.
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
      cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').should('be.visible');
      cy.url().should('include', '/'); // Update the URL to match your home page
       // Update the selector to match your home page button
    });

    it('should fail login with invalid credentials', () => { // Add a closing parenthesis here
      // Visit the login page
        cy.visit('http://localhost:8080/login'); // Update the URL to match your login page
    
         // Enter email
        cy.get('[placeholder="Email"]').type('invalid@example.com'); // Update the selector to match your email input field
    
        // Enter password
        cy.get('[placeholder="Mot de passe"]').type('wrongpassword'); // Update the selector to match your password input field
        
        // Click the login button
        cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').click(); 
    
        // Assert that the user is not redirected to the home page
        cy.url().should('include', '/login'); // Update the URL to match your home page
        cy.get('#\\31 ').should('contain','No Email found'); // Update the selector to match your error message
    });
});
