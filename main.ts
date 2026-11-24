// Real-Life Patch Notes: The Comedy Changelog
// Writes one patch-note line to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate bounds from the bounty kit: /output/entry.txt must be UTF-8 text
// of 1-160 characters, not only whitespace, on a single line.
const MIN_CHARS = 1;
const MAX_CHARS = 160;

// The entry: a release note for a bug in human biology.
// "your" instead of "the user" — the wince lands harder when it is about you.
const ENTRY =
  "v1.9.3: Fixed a bug where the brain replayed your most embarrassing moment from 2014 every time you tried to fall asleep.";

// Gate self-check before writing.
if (
  ENTRY.length < MIN_CHARS ||
  ENTRY.length > MAX_CHARS ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(`Entry fails the gate: ${ENTRY.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: the bytes on disk must be exactly the entry,
// single line, no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: entry.txt does not match the entry");
}
if (Buffer.byteLength(written, "utf8") !== ENTRY.length) {
  throw new Error("Read-back mismatch: byte length differs from entry");
}
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
