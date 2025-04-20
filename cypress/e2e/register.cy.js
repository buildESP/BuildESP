/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the registration functionality of a web application using Cypress.
describe('register test', () => {
  it('should register successfully', () => {
    cy.visit('http://localhost:8080/login');

    
    cy.get('[href="/register"]').click();
    
    
    cy.get('#name').type('John wicked');

    cy.get('#email').type('johnwick1@gmail.com');

    cy.get('#password').type('password');

    cy.get('#confirmPassword').type('password');

    cy.get('.login-button').click();

    cy.url().should('include', '/login'); // Update the URL to match your home page

    cy.wait(1000)
  })
})