/**
 * Frontend Integrity & Schema Verification Test Suite
 */

const fs = require("fs");
const path = require("path");

console.log("=================================================");
console.log("  SchemeAI - Frontend Integrity Verification");
console.log("=================================================\n");

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

// 1. Check Files Existence
const rootDir = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "css/styles.css",
  "js/schemes-data.js",
  "js/translations.js",
  "js/eligibility-engine.js",
  "js/app.js"
];

requiredFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

// 2. Validate Schemes Dataset
const { SCHEMES_DATA, SCHEME_CATEGORIES, INDIAN_STATES } = require("../js/schemes-data.js");
assert(Array.isArray(SCHEMES_DATA) && SCHEMES_DATA.length >= 10, `Database contains ${SCHEMES_DATA.length} schemes (>= 10 expected)`);
assert(Array.isArray(SCHEME_CATEGORIES) && SCHEME_CATEGORIES.length >= 8, `Category metadata is populated (${SCHEME_CATEGORIES.length} categories)`);
assert(Array.isArray(INDIAN_STATES) && INDIAN_STATES.length >= 30, `All Indian states & UTs are present (${INDIAN_STATES.length} items)`);

// Check every scheme integrity
SCHEMES_DATA.forEach(scheme => {
  assert(scheme.id && scheme.nameEn && scheme.nameHi, `Scheme '${scheme.id}' has bilingual titles`);
  assert(scheme.officialPortalUrl.startsWith("https://"), `Scheme '${scheme.id}' has secure official HTTPS portal`);
  assert(
    scheme.officialPortalUrl.includes(".gov.in") ||
    scheme.officialPortalUrl.includes(".nic.in") ||
    scheme.officialPortalUrl.includes(".org.in") ||
    scheme.officialPortalUrl.includes("aicte-india.org") ||
    scheme.officialPortalUrl.includes("nsdl.co.in"),
    `Scheme '${scheme.id}' has authentic gov/official domain: ${scheme.officialPortalUrl}`
  );
  assert(scheme.rules && typeof scheme.rules.minAge === "number", `Scheme '${scheme.id}' has numeric minAge`);
  assert(Array.isArray(scheme.documentsRequiredEn) && scheme.documentsRequiredEn.length > 0, `Scheme '${scheme.id}' has documents required list`);
});

// 3. Validate Translations Dictionary
const { TRANSLATIONS } = require("../js/translations.js");
assert(Boolean(TRANSLATIONS.en && TRANSLATIONS.hi), "Both English and Hindi translation dictionaries exist");

const enKeys = Object.keys(TRANSLATIONS.en);
const hiKeys = Object.keys(TRANSLATIONS.hi);
assert(enKeys.length > 50, `English dictionary has ${enKeys.length} localization strings`);
assert(hiKeys.length > 50, `Hindi dictionary has ${hiKeys.length} localization strings`);

// Check key symmetry
let missingInHi = enKeys.filter(k => !(k in TRANSLATIONS.hi));
assert(missingInHi.length === 0, `All English keys are present in Hindi dictionary (Missing: ${missingInHi.join(", ")})`);

// 4. Validate index.html References
const indexHtmlContent = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const appJsContent = fs.readFileSync(path.join(rootDir, "js/app.js"), "utf8");

// Extract all getElementById strings in app.js
const idMatches = appJsContent.match(/getElementById\("([^"]+)"\)/g) || [];
const idsInAppJs = [...new Set(idMatches.map(m => m.match(/getElementById\("([^"]+)"\)/)[1]))];

console.log(`\nVerifying ${idsInAppJs.length} DOM element bindings from app.js in index.html...`);
let missingIds = [];
idsInAppJs.forEach(id => {
  if (!indexHtmlContent.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});

assert(missingIds.length === 0, `All DOM IDs referenced in app.js exist in index.html (Missing: ${missingIds.join(", ")})`);

// 5. Check CSS validity and inclusion
const cssContent = fs.readFileSync(path.join(rootDir, "css/styles.css"), "utf8");
assert(cssContent.includes("@media print"), "Print media query exists for citizen report generation");
assert(cssContent.includes("--primary-navy"), "CSS variables for theme exist");
assert(cssContent.includes(".criteria-row.unverified"), "CSS style for unverified criteria exists");
assert(cssContent.includes(".criteria-badge.badge-unverified"), "CSS style for unverified badge exists");
assert(indexHtmlContent.includes('rel="stylesheet" href="css/styles.css"'), "CSS file is properly linked in index.html");

// 6. Verify Anchor Links in index.html
const anchorMatches = indexHtmlContent.match(/href="#([^"]+)"/g) || [];
const anchorIds = [...new Set(anchorMatches.map(m => m.match(/href="#([^"]+)"/)[1]))];
console.log(`\nVerifying ${anchorIds.length} internal navigation anchor links in index.html...`);
anchorIds.forEach(targetId => {
  assert(indexHtmlContent.includes(`id="${targetId}"`), `Anchor target '#${targetId}' exists in index.html`);
});

// 7. Verify all Form Error message containers exist in index.html
const requiredErrorSpans = [
  "err-age", "err-gender", "err-state", "err-category",
  "err-occupation", "err-income", "err-education", "err-technical"
];
console.log(`\nVerifying ${requiredErrorSpans.length} accessible form error message elements...`);
requiredErrorSpans.forEach(errId => {
  assert(indexHtmlContent.includes(`id="${errId}"`), `Form error message element '#${errId}' exists in index.html`);
  assert(appJsContent.includes(`"${errId}"`), `Form error element '#${errId}' is localized in app.js textMap`);
});

console.log("\n=================================================");
console.log(`TEST SUMMARY: ${passedTests} Passed, ${failedTests} Failed`);
console.log("=================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("FRONTEND INTEGRITY CHECK PASSED WITH ZERO ERRORS!\n");
}
