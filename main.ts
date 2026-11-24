// Real-Life Patch Notes: The Comedy Changelog
// Writes one patch-note line (1-160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a terse release note for a bug in human biology.
// "your" instead of "the user" — the wince lands harder when it is about you.
const ENTRY =
  "v1.9.3: Fixed a bug where the brain replayed your most embarrassing moment from 2014 every time you tried to fall asleep.";

// Gate self-check: the sealed scorer requires UTF-8 text of 1-160 chars,
// not only whitespace, on a single line.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 160 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(`Entry fails the gate: ${ENTRY.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
