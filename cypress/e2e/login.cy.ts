import LoginPage from '../pages/LoginPage';

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('logs in with valid credentials', () => {
    LoginPage.emailInput.should('be.visible').and('be.enabled');
    LoginPage.passwordInput.should('be.visible').and('be.enabled');
    LoginPage.submitButton.should('be.visible').and('be.enabled');

    cy.env(['orgAdminEmail', 'orgAdminPassword']).then(({ orgAdminEmail, orgAdminPassword }) => {
      LoginPage.login(orgAdminEmail, orgAdminPassword);
    });

    cy.url().should('not.include', '/login');
    cy.contains('Login successful!').should('exist');
  });

  it('shows an error with invalid credentials', () => {
    cy.env(['orgAdminEmail']).then(({ orgAdminEmail }) => {
      LoginPage.login(orgAdminEmail, 'WrongPassword123');
    });

    cy.url().should('include', '/login');
    cy.contains('[role="alert"]', /invalid|incorrect|error/i).should('exist');
  });
});
