describe('Home Page Test', () => {
  it('should visit the home page and assert elements', () => {
    cy.visit('http://localhost:8080');

    cy.get('h1').should('be.visible');
    cy.get('h1').should('contain', 'Partagez et empruntez des outils avec vos voisins');

    cy.get('p').should('be.visible');
    cy.get('p').should('contain', 'Neighborrow est une plateforme où vous pouvez prêter et emprunter des outils et équipements dans votre quartier.');

    cy.get('button').should('be.visible');
    cy.get('.css-19ieht4 > .chakra-button').should('contain', 'Emprunter un objet');
    cy.get('button').should('contain', 'Partager un objet');
  });
});
