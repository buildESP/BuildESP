/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the registration functionality of a web application using Cypress.
describe('register test', () => {
  it('should register successfully', () => {
    // Generate unique data
    const randomSuffix = Date.now(); // Use the current timestamp for uniqueness
    const name = `JohnWick${randomSuffix}`;
    const username = `johnwick${randomSuffix}`;
    const email = `johnwick${randomSuffix}@example.com`;
    const password = 'password';
    const address = '3 rue de la paix';
    const zipcode = '75000';
    const phone = `061234${Math.floor(1000 + Math.random() * 9000)}`; // Random 4-digit suffix for phone

    // Visit the login page
    cy.visit('http://localhost:8080/login');

    // Navigate to the registration page
    cy.get('[href="/register"]').click();

    // Fill in the registration form with dynamic data
    cy.get('#\\:r1\\:').type(name);
    cy.get('#\\:r2\\:').type(username);
    cy.get('#\\:r3\\:').type(email);
    cy.get('#\\:r4\\:').type(password);
    cy.get('#\\:r5\\:').type(address);
    cy.get('#\\:r6\\:').type(zipcode);
    cy.get('#\\:r7\\:').type(phone);

    // Submit the form
    cy.get('.css-tl3ftk > .chakra-stack > .chakra-button').click();

    // Assert redirection to the login page
    cy.url().should('include', '/login');
  });
});