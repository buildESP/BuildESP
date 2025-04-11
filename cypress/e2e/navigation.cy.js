/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the navigation functionality of a web application using Cypress.

describe('Test navigation', () => {
    it('should login successfully with valid credentials', () => {
      // Visit the login page
      cy.visit('http://localhost:3001/login'); // Update the URL to match your login page
  
      // Enter email
        
      // Enter email
      cy.get('#email').type('chetholgrem12@gmail.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); 
      
      cy.wait(500);
    
      cy.get(':nth-child(1) > span').should('be.visible');
      cy.get(':nth-child(1) > span').trigger('mouseover');

      cy.wait(5000);

    });
    it('should update profile successfully', () => {
      // Visit the login page
      cy.visit('http://localhost:3001/login'); // Update the URL to match your login page
  
      // Enter email
          // Enter email
      cy.get('#email').type('chetholgrem12@gmail.com'); // Update the selector to match your email input field
  
      // Enter password
      cy.get('#password').type('password'); // Update the selector to match your password input field
  
      // Click the login button
      cy.get('.login-button').click(); 
      
      cy.wait(500);

    });
});