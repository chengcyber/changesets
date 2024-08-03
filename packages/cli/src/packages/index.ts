import { PackagesFunctions } from "@changesets/types";
import { getChangedPackagesSinceRef } from "@changesets/git";

const defaultPackagesFunctions: Required<PackagesFunctions> = {
  getChangedPackagesSinceRef,
};

export default defaultPackagesFunctions;
