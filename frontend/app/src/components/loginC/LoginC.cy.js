import React from 'react';
import { mount } from 'cypress/react';
import LoginC from '../../src/components/loginC/LoginC';

describe('LoginC Component', () => {
  it('renders the login form', () => {
    mount(<LoginC />);
    cy.get('form.login-form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button.login-button').should('exist');
  });

  it('toggles between login and registration forms', () => {
    mount(<LoginC />);
    cy.get('button').contains("S'enregistrer").click();
    cy.get('input#name').should('exist');
    cy.get('input#lastname').should('exist');
    cy.get('input#confirmPassword').should('exist');
    cy.get('button').contains('Se connecter').click();
    cy.get('input#name').should('not.exist');
    cy.get('input#lastname').should('not.exist');
    cy.get('input#confirmPassword').should('not.exist');
  });

  it('shows error message on failed login', () => {
    mount(<LoginC />);
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button.login-button').click();
    cy.get('.error-message').should('contain', 'Échec de la connexion. Veuillez vérifier vos identifiants.');
  });
});