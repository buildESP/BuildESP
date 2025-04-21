/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the profile functionality of a web application using Cypress.
// It includes a test case for logging in successfully with valid credentials and navigating to the profile page.
describe('Profile test', () => { 
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
    cy.wait(4000);
    cy.get('[href="/profile"]').click(); // Click on the profile button
    cy.url().should('include', '/profile'); // Assert that the user is redirected to the profile page
    });
});
