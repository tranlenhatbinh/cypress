/// <reference types="Cypress" />
before(() => {
  cy.NavigateWorldRoamer();
});

describe('Navigate to WorlRoamer site and Sign Up WorlRoamer site', () => {
  beforeEach(() => {
    cy.get('span')
      .contains('Sign Up')
      .as('SignUpBtn');
    cy.get('@SignUpBtn').click({ force: true });
  });

  it('Verify that the error message displays when singup with empty value', () => {
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();
    // cy.myCustomName('Example');
    // cy.myCustomName('Example');
    // Match screenshot method
    // cy.matchScreenshot('Example', {
    //   threshold:'5',
    //   thresholdType:'pixel'
    // });
    cy.get('span')
      .contains('Create account')
      .as('CreateAccountBtn');
    // Compare screenshot before and afterward
    // cy.screenshot('onBeforeScreenshot');
    cy.get('@CreateAccountBtn').click({ force: true });
    // cy.screenshot('onAfterScreenshot');
    //Assertion: The error message: Please enter your email and Please enter your password display
    cy.get('div')
      .children()
      .contains('Please enter your email');
    cy.get('div')
      .children()
      .contains('Please enter your password');
  });

  it('User cannot signup with already registered account', () => {
    cy.readFile('cypress/fixtures/users/user.json')
      .as('userData')
      .then(userData => {
        cy.get('input[name=username]')
          .clear()
          .type(userData.userEmail);
        cy.get('input[name=password]')
          .clear()
          .type(userData.userPassword);
      });
    cy.get('span')
      .contains('Create account')
      .as('CreateAccountBtn');
    cy.get('@CreateAccountBtn').click({ force: true });
    //Assertion: The error message: This email has already been used displays
    cy.get('div')
      .children()
      .contains('This email is already registered to an account.');
  });

  it('User cannot signup with invalid account', () => {
    cy.readFile('cypress/fixtures/users/user.json')
      .as('userData')
      .then(userData => {
        cy.get('#emailAddress')
          .clear()
          .type(userData.userEmailInvalid);
        cy.get('#password')
          .clear()
          .type(userData.userPassword);
      });
    //Assertion: The error message: This email has already been used displays
    cy.get('div')
      .children()
      .contains('Opps, this doesn’t look like a valid email address');
    cy.readFile('cypress/fixtures/users/user.json')
      .as('userData')
      .then(userData => {
        cy.get('#emailAddress')
          .clear()
          .type(userData.userEmail);
        cy.get('#password')
          .clear()
          .type(userData.userPasswordInvalid);
      });
    //Assertion: The error message: This email has already been used displays
    cy.get('div')
      .children()
      .contains('Your password must have at least 6 characters');
  });
  // Clean test case
  afterEach(() => {
    cy.get('#___gatsby')
      .find('img')
      .siblings('div')
      .eq(1)
      .click();
  });
});
