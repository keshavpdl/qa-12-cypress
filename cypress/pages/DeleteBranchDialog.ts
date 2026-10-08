class DeleteBranchDialog {
  get confirmInput() {
    return cy.get('[placeholder="Type Delete Branch here"]');
  }

  get confirmButton() {
    return cy.contains('[data-slot="dialog-content"] button', 'Delete Branch');
  }

  get cancelButton() {
    return cy.contains('[data-slot="dialog-content"] button', 'Cancel');
  }

  confirmDelete() {
    this.confirmInput.type('Delete Branch');
    this.confirmButton.click();
  }
}

export default new DeleteBranchDialog();
