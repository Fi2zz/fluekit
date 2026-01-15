#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to run commands
const run = (command) => {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
};

// Helper to read JSON
const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Helper to write JSON
const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
};

const args = process.argv.slice(2);
const type = args[0]; // major, minor, patch

if (!["major", "minor", "patch"].includes(type)) {
  console.error("Usage: node bump-version.js <major|minor|patch>");
  process.exit(1);
}

// Target package
const packageDir = path.resolve(__dirname, "../packages/fluekit");
const packageJsonPath = path.join(packageDir, "package.json");
const pkg = readJson(packageJsonPath);

const oldVersion = pkg.version;
const versionParts = oldVersion.split(".").map(Number);

if (type === "major") {
  versionParts[0]++;
  versionParts[1] = 0;
  versionParts[2] = 0;
} else if (type === "minor") {
  versionParts[1]++;
  versionParts[2] = 0;
} else if (type === "patch") {
  versionParts[2]++;
}

const newVersion = versionParts.join(".");

console.log(`Bumping version from ${oldVersion} to ${newVersion}...`);

// Update package.json
pkg.version = newVersion;
writeJson(packageJsonPath, pkg);

// Stage changes
run(`git add ${packageJsonPath}`);

// Commit
run(`git commit -m "chore: bump version to ${newVersion}"`);

// Tag
run(`git tag v${newVersion}`);

// Push
console.log("Pushing to remote...");
run(`git push origin master`);
run(`git push origin v${newVersion}`);

console.log(`Successfully bumped to v${newVersion}!`);
