/**
 * SchemeAI - Master Automated Test Runner
 * Executes all test suites and generates a consolidated status report.
 */

const fs = require("fs");
const path = require("path");

console.log("=================================================");
console.log("  SchemeAI - Master Automated Test Suite Runner");
console.log("=================================================\n");

let totalPassed = 0;
let totalFailed = 0;
let totalSkipped = 0;
const failureDetails = [];

function assert(condition, message, details = "") {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    totalPassed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    totalFailed++;
    failureDetails.push({ message, details });
  }
}

function skip(message, reason = "") {
  console.log(`  [SKIP] ${message} (${reason})`);
  totalSkipped++;
}

// -------------------------------------------------------------------------
// SUITE 1: Eligibility Engine & Demographic Rules
// -------------------------------------------------------------------------
console.log("\n-------------------------------------------------");
console.log("SUITE 1: Eligibility Logic, Personas & Boundaries");
console.log("-------------------------------------------------");

const { SCHEMES_DATA, SCHEME_CATEGORIES, INDIAN_STATES } = require("../js/schemes-data.js");
const { EligibilityEngine } = require("../js/eligibility-engine.js");

// 1.1 Small Farmer (PM-KISAN, PM-JAY)
const farmerProfile = {
  name: "Ramesh Kumar",
  age: 42,
  gender: "Male",
  state: "Uttar Pradesh",
  category: "OBC",
  occupation: "Farmer",
  annualIncome: 180000,
  educationLevel: "10th Pass",
  hasTechnicalDegree: false
};
const farmerResults = EligibilityEngine.evaluateAll(farmerProfile, SCHEMES_DATA);
const pmKisan = farmerResults.allResults.find(r => r.schemeId === "pm-kisan");
assert(pmKisan && pmKisan.status === "ELIGIBLE", "Farmer Ramesh is ELIGIBLE for PM-KISAN");
assert(pmKisan && pmKisan.criteriaResults.every(c => c.status === "pass"), "All 8 criteria pass for PM-KISAN");

const pmJay = farmerResults.allResults.find(r => r.schemeId === "pm-jay");
assert(pmJay && pmJay.status === "ELIGIBLE", "Low-income farmer is ELIGIBLE for PM-JAY");

// 1.2 Female Technical Student (AICTE Pragati)
const femaleStudent = {
  name: "Priya Sharma",
  age: 19,
  gender: "Female",
  state: "Maharashtra",
  category: "General",
  occupation: "Student",
  annualIncome: 450000,
  educationLevel: "12th Pass",
  hasTechnicalDegree: true
};
const priyaRes = EligibilityEngine.evaluateScheme(femaleStudent, SCHEMES_DATA.find(s => s.id === "pm-pragati-scholarship"));
assert(priyaRes.status === "ELIGIBLE", "Female technical student is ELIGIBLE for AICTE Pragati");
assert(priyaRes.criteriaResults.find(c => c.key === "gender").status === "pass", "Pragati gender check passes for female");
assert(priyaRes.criteriaResults.find(c => c.key === "technicalDegree").status === "pass", "Pragati technical degree check passes");

// Male disqualification for Pragati
const maleStudent = { ...femaleStudent, gender: "Male" };
const malePragati = EligibilityEngine.evaluateScheme(maleTechStudent = maleStudent, SCHEMES_DATA.find(s => s.id === "pm-pragati-scholarship"));
assert(malePragati.status === "NOT_ELIGIBLE", "Male student is NOT_ELIGIBLE for Pragati Scholarship");
assert(malePragati.criteriaResults.find(c => c.key === "gender").status === "fail", "Pragati gender check explicitly fails for male");

// 1.3 SC Student (Post-Matric)
const scStudent = {
  name: "Amit Paswan",
  age: 21,
  gender: "Male",
  state: "Bihar",
  category: "SC",
  occupation: "Student",
  annualIncome: 140000,
  educationLevel: "12th Pass",
  hasTechnicalDegree: false
};
const postMatricRes = EligibilityEngine.evaluateScheme(scStudent, SCHEMES_DATA.find(s => s.id === "post-matric-sc-st"));
assert(postMatricRes.status === "ELIGIBLE", "SC student Amit Paswan is ELIGIBLE for Post-Matric SC/ST Scholarship");

// General category fails Post-Matric SC/ST
const genStudent = { ...scStudent, category: "General", annualIncome: 140000 };
const genPostMatric = EligibilityEngine.evaluateScheme(genStudent, SCHEMES_DATA.find(s => s.id === "post-matric-sc-st"));
assert(genPostMatric.status === "NOT_ELIGIBLE", "General student is NOT_ELIGIBLE for Post-Matric SC/ST Scholarship");
assert(genPostMatric.criteriaResults.find(c => c.key === "category").status === "fail", "Social category mismatch flagged as fail");

// 1.4 Sukanya Samriddhi Yojana (Girl Child <= 10)
const youngGirl = {
  name: "Ananya",
  age: 6,
  gender: "Female",
  state: "Delhi (NCT)",
  category: "General",
  occupation: "Student",
  annualIncome: 300000,
  educationLevel: "None",
  hasTechnicalDegree: false
};
const ssyScheme = SCHEMES_DATA.find(s => s.id === "sukanya-samriddhi");
const ssyChildRes = EligibilityEngine.evaluateScheme(youngGirl, ssyScheme);
assert(ssyChildRes.status === "ELIGIBLE", "Girl child aged 6 is ELIGIBLE for Sukanya Samriddhi Yojana");

const adultWoman = { ...youngGirl, age: 24 };
const ssyAdultRes = EligibilityEngine.evaluateScheme(adultWoman, ssyScheme);
assert(ssyAdultRes.status === "NOT_ELIGIBLE", "Adult woman aged 24 is NOT_ELIGIBLE for Sukanya Samriddhi account opening");
assert(ssyAdultRes.criteriaResults.find(c => c.key === "age").status === "fail", "SSY age check fails for age > 10");

// 1.5 High Income Earner
const highIncomeExec = {
  name: "Vikram Mehta",
  age: 38,
  gender: "Male",
  state: "Karnataka",
  category: "General",
  occupation: "Salaried Employee",
  annualIncome: 2500000,
  educationLevel: "Post-Graduate",
  hasTechnicalDegree: true
};
const highIncomeRes = EligibilityEngine.evaluateAll(highIncomeExec, SCHEMES_DATA);
assert(highIncomeRes.eligibleCount < 4, "High earner (₹25L) has restricted eligibility on subsidized welfare");
const pmKisanHigh = highIncomeRes.allResults.find(r => r.schemeId === "pm-kisan");
assert(pmKisanHigh.status === "NOT_ELIGIBLE", "High income salaried earner is NOT_ELIGIBLE for PM-KISAN");

// 1.6 Negative Income Edge Case
const negativeIncomeProfile = { ...farmerProfile, annualIncome: -50000 };
const negIncRes = EligibilityEngine.evaluateScheme(negativeIncomeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(negIncRes.status === "NOT_ELIGIBLE", "Negative income profile is NOT_ELIGIBLE");
assert(negIncRes.criteriaResults.find(c => c.key === "income").status === "fail", "Income criterion fails for negative income figure");

// 1.7 Boundary Income Checks (Exact vs +₹1)
const postMatricScheme = SCHEMES_DATA.find(s => s.id === "post-matric-sc-st");
const boundaryExact = { ...scStudent, annualIncome: 250000 };
const bExactRes = EligibilityEngine.evaluateScheme(boundaryExact, postMatricScheme);
assert(bExactRes.status === "ELIGIBLE", "Income exactly at boundary (₹2,50,000) is ELIGIBLE");
assert(bExactRes.criteriaResults.find(c => c.key === "income").status === "pass", "Income boundary check passes at ceiling");

const boundaryOver = { ...scStudent, annualIncome: 250001 };
const bOverRes = EligibilityEngine.evaluateScheme(boundaryOver, postMatricScheme);
assert(bOverRes.status === "NOT_ELIGIBLE", "Income ₹1 over boundary (₹2,50,001) is NOT_ELIGIBLE");
assert(bOverRes.criteriaResults.find(c => c.key === "income").status === "fail", "Income boundary check fails over ceiling");

// 1.8 Missing Information & Proof of Eligibility Handling
const emptyProfile = {};
const emptyProfileResults = EligibilityEngine.evaluateAll(emptyProfile, SCHEMES_DATA);
assert(emptyProfileResults.eligibleCount === 0, "Empty profile results in 0 ELIGIBLE schemes (never treat missing info as proof)");
assert(emptyProfileResults.partialCount > 0, "Unanswered schemes without failures are marked POSSIBLE_MATCH");

const missingStateProfile = { ...farmerProfile, state: "" };
const missingStateRes = EligibilityEngine.evaluateScheme(missingStateProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(missingStateRes.status === "POSSIBLE_MATCH", "Missing state results in POSSIBLE_MATCH (Needs Info)");
assert(missingStateRes.criteriaResults.find(c => c.key === "state").status === "unverified", "Missing state is marked unverified");

const missingIncomeProfile = { ...farmerProfile, annualIncome: undefined };
const missingIncRes = EligibilityEngine.evaluateScheme(missingIncomeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(missingIncRes.status === "POSSIBLE_MATCH", "Missing income results in POSSIBLE_MATCH (Needs Info)");
assert(missingIncRes.criteriaResults.find(c => c.key === "income").status === "unverified", "Missing income is marked unverified");

// 1.9 Unsupported Social Category
const unsupportedCatProfile = { ...farmerProfile, category: "ForeignNational" };
const unsuppCatRes = EligibilityEngine.evaluateScheme(unsupportedCatProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(unsuppCatRes.status === "NOT_ELIGIBLE", "Unsupported category is NOT_ELIGIBLE");
assert(unsuppCatRes.criteriaResults.find(c => c.key === "category").status === "fail", "Category flagged as fail for unsupported string");

// 1.10 Invalid Age Limits
const negAgeProfile = { ...farmerProfile, age: -5 };
const negAgeRes = EligibilityEngine.evaluateScheme(negAgeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(negAgeRes.status === "NOT_ELIGIBLE", "Negative age (-5) is NOT_ELIGIBLE");
assert(negAgeRes.criteriaResults.find(c => c.key === "age").status === "fail", "Negative age flagged as fail");

const overAgeProfile = { ...farmerProfile, age: 145 };
const overAgeRes = EligibilityEngine.evaluateScheme(overAgeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(overAgeRes.status === "NOT_ELIGIBLE", "Age 145 exceeds realistic maximum and is NOT_ELIGIBLE");

// 1.11 Atal Pension Yojana Age Boundaries
const apyScheme = SCHEMES_DATA.find(s => s.id === "atal-pension-yojana");
const apyCandidate = {
  name: "Sunil",
  age: 18,
  gender: "Male",
  state: "Rajasthan",
  category: "General",
  occupation: "Daily Wage / Informal Worker",
  annualIncome: 120000,
  educationLevel: "10th Pass",
  hasTechnicalDegree: false
};
const apy18 = EligibilityEngine.evaluateScheme({ ...apyCandidate, age: 18 }, apyScheme);
assert(apy18.status === "ELIGIBLE", "Age 18 (min APY boundary) is ELIGIBLE");

const apy40 = EligibilityEngine.evaluateScheme({ ...apyCandidate, age: 40 }, apyScheme);
assert(apy40.status === "ELIGIBLE", "Age 40 (max APY boundary) is ELIGIBLE");

const apy17 = EligibilityEngine.evaluateScheme({ ...apyCandidate, age: 17 }, apyScheme);
assert(apy17.status === "NOT_ELIGIBLE", "Age 17 (below APY boundary) is NOT_ELIGIBLE");

const apy41 = EligibilityEngine.evaluateScheme({ ...apyCandidate, age: 41 }, apyScheme);
assert(apy41.status === "NOT_ELIGIBLE", "Age 41 (above APY boundary) is NOT_ELIGIBLE");

// 1.12 Street Vendor (PM SVANidhi)
const vendorProfile = {
  name: "Mohan Lal",
  age: 34,
  gender: "Male",
  state: "Gujarat",
  category: "OBC",
  occupation: "Daily Wage / Informal Worker",
  annualIncome: 150000,
  educationLevel: "Below 10th",
  hasTechnicalDegree: false
};
const svanidhiRes = EligibilityEngine.evaluateScheme(vendorProfile, SCHEMES_DATA.find(s => s.id === "pm-svanidhi"));
assert(svanidhiRes.status === "ELIGIBLE", "Informal worker/street vendor is ELIGIBLE for PM SVANidhi");

// 1.13 Education Level Hierarchy
const napsScheme = SCHEMES_DATA.find(s => s.id === "naps-apprenticeship"); // requires 10th Pass
const gradApplicant = { ...apyCandidate, age: 22, occupation: "Unemployed", educationLevel: "Graduate" };
const gradRes = EligibilityEngine.evaluateScheme(gradApplicant, napsScheme);
assert(gradRes.criteriaResults.find(c => c.key === "education").status === "pass", "Graduate qualification satisfies 10th pass minimum");

const below10thApplicant = { ...apyCandidate, age: 22, occupation: "Unemployed", educationLevel: "Below 10th" };
const below10thRes = EligibilityEngine.evaluateScheme(below10thApplicant, napsScheme);
assert(below10thRes.criteriaResults.find(c => c.key === "education").status === "fail", "Below 10th qualification fails 10th pass requirement");
assert(below10thRes.status === "NOT_ELIGIBLE", "Below 10th applicant is NOT_ELIGIBLE for NAPS Apprenticeship");

// 1.14 PM-DAKSH Verification
const dakshScheme = SCHEMES_DATA.find(s => s.id === "pm-daksh");
assert(dakshScheme !== undefined, "PM-DAKSH exists in schemes dataset");
const eligibleDakshCandidate = {
  name: "Deepak",
  age: 24,
  gender: "Male",
  state: "Madhya Pradesh",
  category: "SC",
  occupation: "Unemployed",
  annualIncome: 120000,
  educationLevel: "10th Pass",
  hasTechnicalDegree: false
};
const dakshRes = EligibilityEngine.evaluateScheme(eligibleDakshCandidate, dakshScheme);
assert(dakshRes.status === "ELIGIBLE", "Eligible SC youth is ELIGIBLE for PM-DAKSH");

const dakshOverAge = { ...eligibleDakshCandidate, age: 48 };
const dakshOverAgeRes = EligibilityEngine.evaluateScheme(dakshOverAge, dakshScheme);
assert(dakshOverAgeRes.status === "NOT_ELIGIBLE", "Candidate aged 48 (above 45 limit) is NOT_ELIGIBLE for PM-DAKSH");

const dakshOBCExceed = { ...eligibleDakshCandidate, category: "OBC", annualIncome: 350000 };
const dakshOBCRes = EligibilityEngine.evaluateScheme(dakshOBCExceed, dakshScheme);
assert(dakshOBCRes.status === "NOT_ELIGIBLE", "OBC candidate with income > ₹3 Lakh is NOT_ELIGIBLE for PM-DAKSH");

// 1.15 AICTE Swanath Verification
const swanathScheme = SCHEMES_DATA.find(s => s.id === "aicte-swanath");
assert(swanathScheme !== undefined, "AICTE Swanath exists in schemes dataset");
const swanathCandidate = {
  name: "Karan",
  age: 20,
  gender: "Male",
  state: "Punjab",
  category: "General",
  occupation: "Student",
  annualIncome: 350000,
  educationLevel: "12th Pass",
  hasTechnicalDegree: true
};
const swanathRes = EligibilityEngine.evaluateScheme(swanathCandidate, swanathScheme);
assert(swanathRes.status === "ELIGIBLE", "Technical student meeting income criteria is ELIGIBLE for AICTE Swanath");

const swanathNonTech = { ...swanathCandidate, hasTechnicalDegree: false };
const swanathNonTechRes = EligibilityEngine.evaluateScheme(swanathNonTech, swanathScheme);
assert(swanathNonTechRes.status === "NOT_ELIGIBLE", "Student without technical degree is NOT_ELIGIBLE for AICTE Swanath");

// 1.16 PM-KISAN Senior Citizen Landholder (Removing artificial age 75 cap)
const seniorFarmer = {
  name: "Harishchandra",
  age: 82,
  gender: "Male",
  state: "Haryana",
  category: "General",
  occupation: "Farmer",
  annualIncome: 180000,
  educationLevel: "None",
  hasTechnicalDegree: false
};
const seniorFarmerRes = EligibilityEngine.evaluateScheme(seniorFarmer, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(seniorFarmerRes.status === "ELIGIBLE", "Senior citizen farmer aged 82 is ELIGIBLE for PM-KISAN (no artificial age 75 cap)");

// -------------------------------------------------------------------------
// SUITE 2: English/Hindi Localization & Translation Parity
// -------------------------------------------------------------------------
console.log("\n-------------------------------------------------");
console.log("SUITE 2: English / Hindi Translation & Switcher");
console.log("-------------------------------------------------");

const { TRANSLATIONS } = require("../js/translations.js");
assert(Boolean(TRANSLATIONS.en && TRANSLATIONS.hi), "Both English and Hindi translation dictionaries exist");

const enKeys = Object.keys(TRANSLATIONS.en);
const hiKeys = Object.keys(TRANSLATIONS.hi);
assert(enKeys.length === hiKeys.length, `Key count matches exactly: ${enKeys.length} EN keys and ${hiKeys.length} HI keys`);

const missingHiKeys = enKeys.filter(k => !(k in TRANSLATIONS.hi));
assert(missingHiKeys.length === 0, `No missing keys in Hindi dictionary (Missing: ${missingHiKeys.join(", ")})`);

const missingEnKeys = hiKeys.filter(k => !(k in TRANSLATIONS.en));
assert(missingEnKeys.length === 0, `No missing keys in English dictionary (Missing: ${missingEnKeys.join(", ")})`);

// Verify critical translations
const criticalKeys = [
  "navHome", "navChecker", "navExplore", "btnStartChecking",
  "errRequired", "errAgeRange", "errGender", "errState", "errCategory",
  "errOccupation", "errIncomeValid", "errEducation", "errTechnical",
  "preliminaryDisclaimerTitle", "preliminaryDisclaimerText",
  "criteriaSatisfied", "criteriaUnmet", "criteriaUnverified",
  "filterTabAll", "filterTabEligible", "filterTabPartial", "filterTabIneligible",
  "authorityNoticeTitle", "disqualifiersHeading"
];

criticalKeys.forEach(key => {
  const hasEn = Boolean(TRANSLATIONS.en[key] && TRANSLATIONS.en[key].trim());
  const hasHi = Boolean(TRANSLATIONS.hi[key] && TRANSLATIONS.hi[key].trim());
  assert(hasEn && hasHi, `Key '${key}' is properly localized in both English and Hindi`);
});

// Check all schemes have bilingual metadata
SCHEMES_DATA.forEach(s => {
  assert(Boolean(s.nameEn && s.nameHi), `Scheme '${s.id}' has bilingual titles`);
  assert(Boolean(s.shortDescriptionEn && s.shortDescriptionHi), `Scheme '${s.id}' has bilingual short descriptions`);
  assert(Boolean(s.benefitsSummaryEn && s.benefitsSummaryHi), `Scheme '${s.id}' has bilingual benefits summary`);
  assert(Array.isArray(s.documentsRequiredEn) && Array.isArray(s.documentsRequiredHi), `Scheme '${s.id}' has bilingual required documents list`);
});

// -------------------------------------------------------------------------
// SUITE 3: Frontend DOM Bindings, Print & Save PDF Implementation
// -------------------------------------------------------------------------
console.log("\n-------------------------------------------------");
console.log("SUITE 3: DOM Bindings, Print/PDF & Official Portals");
console.log("-------------------------------------------------");

const rootDir = path.resolve(__dirname, "..");
const indexHtmlContent = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const appJsContent = fs.readFileSync(path.join(rootDir, "js/app.js"), "utf8");
const cssContent = fs.readFileSync(path.join(rootDir, "css/styles.css"), "utf8");

// Print / Save PDF Feature Verification
assert(indexHtmlContent.includes('id="btn-print-report"'), "Print/Save PDF button exists in index.html with id='btn-print-report'");
assert(appJsContent.includes("btnPrintReport.addEventListener(\"click\""), "Print button has click event listener attached in app.js");
assert(appJsContent.includes("window.print()"), "Print handler triggers window.print() in app.js");
assert(cssContent.includes("@media print"), "Print stylesheet (@media print) is implemented in styles.css");
assert(cssContent.includes(".site-header, .site-footer"), "Print stylesheet hides navigation bars and headers");
assert(cssContent.includes("page-break-inside: avoid"), "Print stylesheet prevents scheme cards from splitting across page breaks");

// Form Error Message elements & bindings
const formErrorSpans = [
  "err-age", "err-gender", "err-state", "err-category",
  "err-occupation", "err-income", "err-education", "err-technical"
];
formErrorSpans.forEach(errId => {
  assert(indexHtmlContent.includes(`id="${errId}"`), `Error container '#${errId}' exists in index.html`);
  assert(appJsContent.includes(`"${errId}"`), `Error container '#${errId}' is localized in app.js textMap`);
});

// Navigation Anchor Targets
const anchorMatches = indexHtmlContent.match(/href="#([^"]+)"/g) || [];
const anchorIds = [...new Set(anchorMatches.map(m => m.match(/href="#([^"]+)"/)[1]))];
anchorIds.forEach(targetId => {
  assert(indexHtmlContent.includes(`id="${targetId}"`), `Anchor target '#${targetId}' exists in index.html`);
});

// Official Portal Verification (HTTPS and genuine apex domains)
SCHEMES_DATA.forEach(scheme => {
  assert(scheme.officialPortalUrl.startsWith("https://"), `Scheme '${scheme.id}' portal URL is secure HTTPS`);
  assert(
    scheme.officialPortalUrl.includes(".gov.in") ||
    scheme.officialPortalUrl.includes(".nic.in") ||
    scheme.officialPortalUrl.includes(".org.in") ||
    scheme.officialPortalUrl.includes("aicte-india.org") ||
    scheme.officialPortalUrl.includes("nsdl.co.in"),
    `Scheme '${scheme.id}' portal domain is authentic: ${scheme.officialPortalUrl}`
  );
});

// Unverified / Possible Match CSS styling
assert(cssContent.includes(".criteria-row.unverified"), "CSS style for unverified criteria rows is implemented in styles.css");
assert(cssContent.includes(".criteria-badge.badge-unverified"), "CSS style for unverified status badges is implemented in styles.css");

// -------------------------------------------------------------------------
// FINAL CONSOLIDATED SUMMARY REPORT
// -------------------------------------------------------------------------
console.log("\n=================================================");
console.log("  CONSOLIDATED AUTOMATED TEST RESULTS");
console.log("=================================================");
console.log(`  TOTAL TESTS EXECUTED : ${totalPassed + totalFailed}`);
console.log(`  PASSED               : ${totalPassed}`);
console.log(`  FAILED               : ${totalFailed}`);
console.log(`  SKIPPED              : ${totalSkipped}`);
console.log("=================================================");

if (totalFailed > 0) {
  console.error("\nFAILURES ENCOUNTERED:");
  failureDetails.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.message}`);
    if (f.details) console.error(`     Details: ${f.details}`);
  });
  process.exit(1);
} else {
  console.log("ALL TESTS PASSED WITH ZERO ERRORS!\n");
}
