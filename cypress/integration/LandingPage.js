/// <reference types="Cypress" />
before(() => {
  cy.NavigateWorldRoamer();
});

describe('Landing page', () => {
  beforeEach(() => {
    // Navigate to Landing page
    cy.get('ul')
      .find('a')
      .contains('Find Rooms')
      .click({ force: true });
  });

  it('Verify that error message displays when searching without destination or hotel name', () => {
    // Assertion: Placeholder
    cy.get('#enter-destination').should(
      'have.attr',
      'placeholder',
      'Enter destination or hotel name'
    ).and('be.exist');
    cy.get('span')
      .contains('Search')
      .click({ force: true });
    // Assertion: The Where would you like to go? error message displays
    cy.get('div').should('contain', 'Where would you like to go?');
    cy.get('div')
      .contains('Where would you like to go?')
      .should('be.exist');
  });
});
