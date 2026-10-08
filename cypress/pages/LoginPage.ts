class LoginPage {
  visit() {
    cy.visit('/login');
  }

  get emailInput() {
    return cy.get('#email');
  }

  get passwordInput() {
    return cy.get('[name="password"]');
  }

  get submitButton() {
    return cy.get('button[type="submit"]');
  }

  login(email: string, password: string) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.submitButton.click();
  }
}

export default new LoginPage();
