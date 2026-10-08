export interface BranchAdminDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface BranchDetails {
  name: string;
  slug: string;
  phone: string;
  email: string;
  address: string;
  admin?: BranchAdminDetails;
}

class BranchFormPage {
  get nameInput() {
    return cy.get('#name');
  }

  get slugInput() {
    return cy.get('#slug');
  }

  // the branch phone and the admin phone both render with name="phone"
  get branchPhoneInput() {
    return cy.get('input[name="phone"]').eq(0);
  }

  get adminPhoneInput() {
    return cy.get('input[name="phone"]').eq(1);
  }

  get emailInput() {
    return cy.get('#email');
  }

  get addressInput() {
    return cy.get('#address');
  }

  get statusTrigger() {
    return cy.contains('button', /Select Status|Active|Inactive/);
  }

  get adminFirstNameInput() {
    return cy.get('#admin_first_name');
  }

  get adminLastNameInput() {
    return cy.get('#admin_last_name');
  }

  get adminEmailInput() {
    return cy.get('#admin_email');
  }

  get adminPasswordInput() {
    return cy.get('input[name="admin_password"]');
  }

  get saveButton() {
    return cy.contains('button', 'Save Changes');
  }

  selectStatus(status: 'Active' | 'Inactive') {
    this.statusTrigger.click();
    cy.get('[role="option"]').contains(status).click();
  }

  // the create sheet opens with empty fields, phone starts as just the "+977 " prefix
  fillBranchDetails(branch: BranchDetails) {
    this.nameInput.clear().type(branch.name);
    this.slugInput.clear().type(branch.slug);
    this.branchPhoneInput.type(branch.phone);
    this.emailInput.clear().type(branch.email);
    this.addressInput.clear().type(branch.address);
  }

  // the edit sheet arrives prefilled, so every field (including the "+977 " prefix) gets overwritten
  updateBranchDetails(changes: Partial<BranchDetails>) {
    if (changes.name) this.nameInput.clear().type(changes.name);
    if (changes.slug) this.slugInput.clear().type(changes.slug);
    if (changes.phone) this.branchPhoneInput.type('{selectall}').type(`+977 ${changes.phone}`);
    if (changes.email) this.emailInput.clear().type(changes.email);
    if (changes.address) this.addressInput.clear().type(changes.address);
  }

  fillAdminDetails(admin: BranchAdminDetails) {
    this.adminFirstNameInput.type(admin.firstName);
    this.adminLastNameInput.type(admin.lastName);
    this.adminEmailInput.type(admin.email);
    this.adminPasswordInput.type(admin.password);
    this.adminPhoneInput.type(admin.phone);
  }

  // the toast from the previous action can still cover the button, so force the click
  save() {
    this.saveButton.click({ force: true });
  }
}

export default new BranchFormPage();
