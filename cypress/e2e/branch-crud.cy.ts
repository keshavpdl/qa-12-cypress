import BranchListPage from '../pages/BranchListPage';
import BranchFormPage, { BranchDetails } from '../pages/BranchFormPage';
import DeleteBranchDialog from '../pages/DeleteBranchDialog';
import { buildBranchData } from '../fixtures/branchData';

describe('Branch CRUD', () => {
  let branch: BranchDetails;

  before(() => {
    cy.fixture('branch').then((template) => {
      branch = buildBranchData(template, Date.now());
    });
  });

  beforeEach(() => {
    cy.loginAsOrgAdmin();
  });

  it('creates a new branch', () => {
    BranchListPage.openAddBranch();
    BranchFormPage.fillBranchDetails(branch);
    BranchFormPage.selectStatus('Active');
    BranchFormPage.fillAdminDetails(branch.admin!);
    BranchFormPage.save();

    BranchListPage.assertBranchExists(branch.name);
  });

  it('reads the created branch details', () => {
    BranchListPage.search(branch.name);
    BranchListPage.viewBranch(branch.name);

    cy.url().should('include', '/branches/detail/');
    cy.contains('h1', branch.name).should('be.visible');
    cy.contains(branch.email).should('be.visible');
  });

  it('updates the branch', () => {
    const updatedName = `${branch.name} Updated`;

    BranchListPage.search(branch.name);
    BranchListPage.editBranch(branch.name);

    BranchFormPage.updateBranchDetails({ name: updatedName, address: 'Pulchowk, Lalitpur, Nepal' });
    BranchFormPage.save();

    branch.name = updatedName;
    BranchListPage.search(branch.name);
    BranchListPage.assertBranchExists(branch.name);
  });

  it('deletes the branch', () => {
    BranchListPage.search(branch.name);
    BranchListPage.deleteBranch(branch.name);
    DeleteBranchDialog.confirmDelete();

    BranchListPage.assertBranchNotExists(branch.name);
  });
});
