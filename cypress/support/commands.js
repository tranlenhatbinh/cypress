// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { register } from 'cypress-match-screenshot';
register('myCustomName');
register();

Cypress.Commands.add('NavigateWorldRoamer', () => {
  cy.visit('/');
});

Cypress.Commands.add('Login', () => {
  cy.get('span', {timeout:20000}).should('contain', 'Login')
  cy.get('span')
    .contains('Login')
    .should('have.text', 'Login')
    .as('LogInBtn');
  cy.get('@LogInBtn').click({ force: true });

  cy.readFile('cypress/fixtures/users/user.json')
    .as('userData')
    .then(userData => {
      cy.get('input[name=email]', { timeout: 20000 }).should('be.exist')
      cy.get('input[name=password]', { timeout: 20000 }).should('be.exist')
      cy.get('input[name=email]')
        .clear()
        .type(userData.userEmail);
      cy.get('input[name=password]')
        .clear()
        .type(userData.userPassword);
      cy.get('span')
        .contains('Sign in')
        .as('SignInBtn');
      cy.get('@SignInBtn').click({ force: true });
    });
});

Cypress.Commands.add('Logout', () => {
  cy.get('p')
    .contains('Your Account')
    .as('Profile');
  cy.get('@Profile').click({ force: true });
  cy.get('section')
    .children()
    .contains('Sign Out')
    .click({ force: true });
});

Cypress.Commands.add('GoSavedItem', () => {
  cy.get('p')
    .contains('Your Account')
    .as('Profile');
  cy.get('@Profile').click({ force: true });
  cy.get('section')
    .children()
    .contains('My Saved Items')
    .click({ force: true });
});

Cypress.Commands.add('GoTripPlanner', () => {
  cy.get('p')
    .contains('Your Account')
    .as('Profile');
  cy.get('@Profile').click({ force: true });
  cy.get('section')
    .children()
    .contains('Trip Planner')
    .click({ force: true });
});

Cypress.Commands.add('UploadFile', (fileUrl, selector, type = 'image/png') => {
  return cy
    .fixture(fileUrl, 'base64')
    .then(Cypress.Blob.base64StringToBlob)
    .then(blob => {
      const nameSegments = fileUrl.split('/');
      const name = nameSegments[nameSegments.length - 1];
      const testFile = new File([blob], name, { type });
      const event = { dataTransfer: { files: [testFile] } };
      return cy.get(selector).trigger('drop', event);
    });
});