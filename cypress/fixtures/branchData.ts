import { BranchDetails } from '../pages/BranchFormPage';

export interface BranchFixture {
  namePrefix: string;
  address: string;
  updatedAddress: string;
  admin: {
    firstName: string;
    lastName: string;
    password: string;
  };
}

// "988" is a valid NTC mobile prefix the app's phone validator accepts, the rest just needs to be unique
export function buildBranchData(template: BranchFixture, stamp: number): BranchDetails {
  return {
    name: `${template.namePrefix} ${stamp}`,
    slug: `qa-automation-branch-${stamp}`,
    phone: `988${String(stamp).slice(-7)}`,
    email: `qa.branch.${stamp}@example.com`,
    address: template.address,
    admin: {
      ...template.admin,
      email: `qa.admin.${stamp}@example.com`,
      phone: `988${String(stamp - 1).slice(-7)}`,
    },
  };
}
