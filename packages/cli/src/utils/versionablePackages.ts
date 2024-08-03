import { Config } from "@changesets/types";
import { shouldSkipPackage } from "@changesets/should-skip-package";
import { getPackagesFunctions } from "../packages/getPackagesFunctions";

export async function getVersionableChangedPackages(
  config: Config,
  {
    cwd,
    ref,
  }: {
    cwd: string;
    ref?: string;
  }
) {
  const [{ getChangedPackagesSinceRef }, packagesOpts] = getPackagesFunctions(
    config.packages,
    cwd
  );
  const changedPackages = await getChangedPackagesSinceRef(
    {
      ref: ref ?? config.baseBranch,
      changedFilePatterns: config.changedFilePatterns,
      cwd,
    },
    packagesOpts
  );
  return changedPackages.filter(
    (pkg) =>
      !shouldSkipPackage(pkg, {
        ignore: config.ignore,
        allowPrivatePackages: config.privatePackages.version,
      })
  );
}
