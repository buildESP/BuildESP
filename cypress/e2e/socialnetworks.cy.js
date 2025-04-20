/* global cy */
/// <reference types="cypress" />
describe('Social Networks Redirection', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/');
    });
  
    it('Has correct TikTok link', () => {
      cy.get('[href="https://www.tiktok.com/@neighborrow_"]')
        .should('exist')
        .and('have.attr', 'href', 'https://www.tiktok.com/@neighborrow_');
      
      // Verify the link works (without following it)
      cy.get('[href="https://www.tiktok.com/@neighborrow_"]')
        .then(($link) => {
          cy.request({
            url: $link.prop('href'),
            failOnStatusCode: false
          }).its('status')
          .should('be.oneOf', [200, 301, 302]);
        });
    });
  
    it('Has correct Instagram link', () => {
      cy.get('[href="https://www.instagram.com/neigh_borrow/"]')
        .should('exist')
        .and('have.attr', 'href', 'https://www.instagram.com/neigh_borrow/');
      
      // Verify the link works (without following it)
      cy.get('[href="https://www.instagram.com/neigh_borrow/"]')
        .then(($link) => {
          cy.request({
            url: $link.prop('href'),
            failOnStatusCode: false
          }).its('status')
          .should('be.oneOf', [200, 301, 302]);
        });
    });
  });