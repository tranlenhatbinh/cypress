/// <reference types="Cypress" />
before(() => {
  cy.NavigateWorldRoamer();
});

describe('Navigate to WorlRoamer site and Trip plan page', () => {
  beforeEach(() => {
    cy.get('ul')
      .find('a')
      .contains('Plan A Trip')
      .click({ force: true });
  });

  it('Verify that user can create a trip with a saved activity', () => {
    // cy.get('span', {timeout:15000}).should('contain', 'OK')
    // cy.get('span')
    //   .contains('OK')
    //   .parent()
    //   .click({ force: true });
    cy.Login();
    cy.get('h4', { timeout: 20000 })
      .contains('Sign In')
      .should('not.exist');
    cy.get('a', { timeout: 20000 }).should('contain', 'Find Activities');
    cy.get('a')
      .contains('Find Activities')
      .click({ force: true });
    cy.get('h4', { timeout: 15000 }).should('contain', 'Places of Interest');
    cy.contains('Places of Interest')
      .parent()
      .as('PlacesOfInterest');
    cy.get('@PlacesOfInterest')
      .siblings()
      .children()
      .find('figure')
      .eq(2)
      .find('button')
      .click({ force: true });
    cy.get('div', { timeout: 15000 }).should(
      'contain',
      'was saved to your Saved Items!'
    );
    cy.GoTripPlanner();
    cy.get('span', { timeout: 20000 }).should('contain', 'New Trip');
    cy.get('span')
      .contains('New Trip')
      .click({ force: true });
    cy.get('#tripName')
      .clear()
      .type('hotel');
    cy.get('.country-select__value-container').click();
    cy.get('.country-select__menu-list > div')
      .contains('Vietnam')
      .click();
    cy.get('input[name=startDate]').click();
    var day = new Date().getDate();
    cy.get('div[aria-label=Calendar]')
      .children()
      .find('table')
      .eq(1)
      .find('td')
      .contains(day)
      .parent()
      .click({ force: true });
    cy.get('span')
      .contains('Add another destination')
      .parent()
      .click({ force: true });
    cy.get('.country-select__value-container')
      .eq(1)
      .click();
    cy.get('.country-select__menu-list > div')
      .contains('Singapore')
      .click();
    cy.get('.country-select__value-container')
      .eq(1)
      .trigger('mouseover');
    cy.wait(1000);
    cy.get('.country-select-container')
      .eq(1)
      .parents()
      .eq(1)
      .siblings()
      .click({ force: true });
    // Assertion
    cy.get('.country-select__value-container').should('have.length', '1');
    cy.get('span')
      .contains('Submit')
      .parent()
      .click({ force: true });
    // Assertion
    cy.get('p').should('contain', 'Add Saved Activities to this Trip');
    cy.get('p').should('contain', 'Add activity from saved items.');
    cy.get('span')
      .contains('Select All')
      .parent()
      .should('have.prop', 'disabled', false);
    cy.get('span')
      .contains('Deselect All')
      .parent()
      .should('have.prop', 'disabled', true);
    cy.get('input[type=checkbox]', { timeout: 15000 }).should('be.exist');
    cy.get('input[type=checkbox]').check({ force: true });
    // Assertion
    cy.get('span')
      .contains('Select All')
      .parent()
      .should('have.prop', 'disabled', true);
    cy.get('span')
      .contains('Deselect All')
      .parent()
      .should('have.prop', 'disabled', false);
    cy.get('span').should('contain', 'Create trip');
    cy.get('span').should('contain', 'Back');
    cy.contains('Create trip').click({ force: true });
    // Assertion
    cy.get('h4', { timeout: 15000 }).should('contain', 'Saved Activities');
    cy.wait(1000);
    cy.get('p')
      .contains('You haven’t added any activities to this trip.')
      .should('not.be.exist');
    cy.get('h4')
      .contains('Saved Activities')
      .parent()
      .siblings()
      .find('figure')
      .should('be.above', '0');
    cy.get('h4')
      .contains('Saved Activities')
      .siblings()
      .find('span')
      .contains('Add', { timeout: 15000 })
      .click({ force: true });
    // Assertion:
    cy.get('p', { timeout: 15000 }).should('contain', 'Add Activity');
    cy.get('p').should('contain', 'Already Added');
    cy.get('p')
      .contains('Add Activity from saved items.')
      .siblings()
      .eq(1)
      .find('li')
      .should('be.exist');
    cy.get('p')
      .contains('Add Activity')
      .parent()
      .siblings()
      .find('div')
      .click({ force: true });
    // clean test case
    cy.get('h4')
      .contains('Saved Activities')
      .parent()
      .siblings()
      .find('figure')
      .children()
      .find('button')
      .click({ force: true });
    cy.get('span')
      .contains('Yes, remove')
      .click({ force: true });
    cy.get('button[aria-label="delete trip"]').click({ force: true });
    cy.get('span')
      .contains('yes, delete')
      .click({ force: true });
    cy.get('p', { timeout: 15000 }).should('contain', 'Your Account');
    cy.GoSavedItem();
    cy.get('p', { timeout: 15000 }).should('contain', 'Activities');
    cy.get('p')
      .contains('Activities')
      .click({ force: true });
    cy.get('figure')
      .find('button')
      .eq(0)
      .click({ force: true });
    // Assertion: The Remove Saved Item popup displays
    cy.get('p').should('contain', 'Remove Saved Item');
    cy.get('span')
      .contains('Yes, remove')
      .click({ force: true });
    cy.wait(1000);
    cy.Logout();
  });

  it.only('Verify that user can create a trip with saved links', () => {
    // cy.get('span', {timeout:15000}).should('contain', 'OK')
    // cy.get('span')
    //   .contains('OK')
    //   .parent()
    //   .click({ force: true });
    cy.Login();
    cy.get('p', { timeout: 15000 }).should('contain', 'Your Account');
    cy.GoTripPlanner();
    cy.get('span', { timeout: 15000 }).should('contain', 'New Trip');
    cy.contains('New Trip').click({ force: true });
    cy.get('.country-select__value-container').click();
    cy.get('.country-select__menu-list > div')
      .contains('Vietnam')
      .click();
    cy.get('input[name=startDate]').click();
    var day = new Date().getDate();
    cy.get('div[aria-label=Calendar]')
      .children()
      .find('table')
      .eq(1)
      .find('td')
      .contains(day)
      .parent()
      .click();
    cy.get('#tripName')
      .clear()
      .type('hotel');
    cy.get('span')
      .contains('Submit')
      .parent()
      .click({ force: true });
    cy.contains('Create without adding activity').click({ force: true });
    // Assertion
    cy.contains('Saved Links')
      .siblings()
      .find('span')
      .contains('Add')
      .click({ force: true });
    cy.get('input[name=url]')
      .clear()
      .type(
        'https://www.nature.com/polopoly_fs/7.44180.1495028629!/image/WEB_GettyImages-494098244.jpg_gen/derivatives/landscape_630/WEB_GettyImages-494098244.jpg'
      );
    cy.get('input[name=displayName]')
      .clear()
      .type('nature');
    cy.get('p')
      .contains('Drag an image here')
      .parents()
      .eq(1)
      .siblings()
      .as('fileInput')
      .click({ force: true });
    cy.get('@fileInput')
      .parents()
      .eq(0)
      .as('fileWrapper');
    cy.UploadFile('nature.png', '@fileWrapper');
    cy.get('span')
      .contains('Add')
      .click({ force: true });
    // Assertion
    cy.get('a').should('contain', 'nature');
    cy.get('a')
      .contains('nature')
      .siblings()
      .find('div')
      .click({ force: true });
    // Assertion
    cy.get('p').should('contain', 'Remove Saved Item');
    cy.get('p').should(
      'contain',
      'You are about to remove your saved item from trip:'
    );
    cy.get('span')
      .contains('Yes, remove')
      .click({ force: true });
    cy.get('p')
      .contains('Remove Saved Item')
      .should('not.exist');
    cy.get('button[aria-label="delete trip"]').should('be.exist');
    // Clean test case
    cy.get('button[aria-label="delete trip"]').click({ force: true });
    cy.get('span')
      .contains('yes, delete')
      .click({ force: true });
    cy.wait(1000);
    cy.Logout();
  });
});
