/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the navigation functionality of a web application using Cypress.

describe('Test navigation', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://localhost:8080/login'); // Update the URL to match your login page
  
      // Enter email
        
      // Enter email
      cy.get('[placeholder="Email"]').type('alice.dupont@example.com'); // Update the selector to match your email input field

      // Enter password
      cy.get('[placeholder="Mot de passe"]').type('password'); // Update the selector to match your password input field
      
      // Click the login button
      cy.get('.css-1bitcfn > .chakra-stack > .chakra-button').click(); // Update the selector to match your submit button
  
      cy.wait(500);// Click on the first trigger

      cy.get('#popover\\:\\:r6\\:\\:trigger').click();
      cy.wait(500);// Click on the first trigger
      cy.get('#popover\\:\\:r6\\:\\:content').should('be.visible'); // Ensure the third popover content is visible

  
      
      cy.get('#popover\\:\\:r7\\:\\:trigger').click(); // Click on the third trigger
      cy.wait(500);// Click on the first trigger
      
      cy.get('#popover\\:\\:r7\\:\\:content').should('be.visible'); // Ensure the third popover content is visible

      cy.get('#popover\\:\\:r8\\:\\:trigger').click(); // Click on the fourth trigger
      cy.wait(500);// Click on the first trigger
      
      cy.get('#popover\\:\\:r8\\:\\:content').should('be.visible'); // Ensure the fourth popover content is visible

      cy.get('#popover\\:\\:r9\\:\\:trigger').click(); // Click on the fifth trigger
      cy.wait(500);// Click on the first trigger
      
      cy.get('#popover\\:\\:r9\\:\\:content').should('be.visible'); // Ensure the fifth popover content is visible

      cy.wait(500); // Add a short wait to ensure all actions are processed

      cy.get('#popover\\:\\:ra\\:\\:trigger').click(); // Click on the fifth trigger
      cy.wait(500);// Click on the first trigger
      
      cy.get('#popover\\:\\:ra\\:\\:content').should('be.visible'); // Ensure the fifth popover content is visible



    });
});