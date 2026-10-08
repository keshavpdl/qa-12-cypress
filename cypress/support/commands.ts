import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('loginAsOrgAdmin', () => {
  LoginPage.visit();
  cy.env(['orgAdminEmail', 'orgAdminPassword']).then(({ orgAdminEmail, orgAdminPassword }) => {
    LoginPage.login(orgAdminEmail, orgAdminPassword);
  });
  cy.url().should('not.include', '/login');
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsOrgAdmin(): Chainable<void>;
    }
  }
}

export {};
