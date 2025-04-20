/* global cy */
/// <reference types="cypress" />
// This test suite is for testing the login functionality of a web application using Cypress.

describe('Conditions générales', () => {
    it('should visit the home page, click on the condition of us button, and assert it', () => {
      cy.visit('http://localhost:8080');
  
      cy.get('h1').should('be.visible');
      cy.get('h1').should('contain', 'Partagez et empruntez des outils avec vos voisins');
  
      cy.get('p').should('be.visible');
      cy.get('p').should('contain', 'Neighborrow est une plateforme où vous pouvez prêter et emprunter des outils et équipements dans votre quartier.');
  
      cy.get('button').should('be.visible');
      cy.get('.css-hek76k > .chakra-button').should('contain', 'Emprunter un objet');
      cy.get('[href="/condition-of-us"]').click(); // Click on the "Mentions légales" button
      cy.url().should('include', '/condition-of-us');
         // Assert that the URL includes "/Mention-legales"
    
    });
  });
  