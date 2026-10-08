class BranchListPage {
  get addBranchButton() {
    return cy.contains('button', 'Add Branch');
  }

  get searchInput() {
    return cy.get('input[placeholder="Search..."]');
  }

  // The success toast sits top-right and overlaps the search box and row
  // actions right after a create/update, so searches and row actions force the click.
  search(term: string) {
    this.searchInput.clear({ force: true }).type(term, { force: true });
    // let the debounced search request settle before the row is acted on
    cy.wait(1000);
  }

  openAddBranch() {
    this.addBranchButton.click();
  }

  row(branchName: string) {
    return cy.contains('[data-slot="table-row"]', branchName, { timeout: 10000 });
  }

  viewBranch(branchName: string) {
    this.row(branchName).find('a[title="View branch"]').click({ force: true });
  }

  editBranch(branchName: string) {
    this.row(branchName).find('a[title="Edit branch"]').click({ force: true });
    // the edit sheet fetches the branch record before populating the form,
    // so wait for the prefilled name before the caller types into it
    cy.get('#name').should('have.value', branchName);
  }

  deleteBranch(branchName: string) {
    this.row(branchName).find('[title="Delete branch"]').click({ force: true });
  }

  assertBranchExists(branchName: string) {
    this.row(branchName).should('be.visible');
  }

  assertBranchNotExists(branchName: string) {
    cy.contains('[data-slot="table-row"]', branchName).should('not.exist');
  }
}

export default new BranchListPage();
