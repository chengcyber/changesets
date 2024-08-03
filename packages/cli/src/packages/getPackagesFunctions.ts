import path from "path";
import resolveFrom from "resolve-from";
import { Config, PackagesFunctions } from "@changesets/types";
import defaultPackagesFunctions from ".";

export function getPackagesFunctions(
  packages: Config["packages"],
  cwd: string
): [Required<PackagesFunctions>, any] {
  let packagesFunctions: Required<PackagesFunctions> = {
    ...defaultPackagesFunctions,
  };
  if (!packages) {
    return [packagesFunctions, null];
  }
  let packagesOpts: any = packages[1];
  let changesetPath = path.join(cwd, ".changeset");
  let packagesPath = resolveFrom(changesetPath, packages[0]);

  let possiblePackagesFunc = require(packagesPath);
  if (possiblePackagesFunc.default) {
    possiblePackagesFunc = possiblePackagesFunc.default;
  }

  const funcNames: (keyof PackagesFunctions)[] = ["getChangedPackagesSinceRef"];
  // Custom packages function overrides the default functions
  for (const funcName of funcNames) {
    if (typeof possiblePackagesFunc[funcName] === "function") {
      packagesFunctions[funcName] = possiblePackagesFunc[funcName];
    }
  }
  return [packagesFunctions, packagesOpts];
}
