/**
 * Automated Comprehensive Test Suite for SchemeAI Eligibility Engine
 * Covers standard personas, edge cases, boundaries, missing information, and unsupported inputs.
 */

const { SCHEMES_DATA } = require("../js/schemes-data.js");
const { EligibilityEngine } = require("../js/eligibility-engine.js");

console.log("=================================================");
console.log("  SchemeAI - Eligibility Engine Verification Suite");
console.log("=================================================\n");

let passedTests = 0;
let failedTests = 0;

function assert(condition, testDescription) {
  if (condition) {
    console.log(`[PASS] ${testDescription}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testDescription}`);
    failedTests++;
  }
}

// ----------------------------------------------------------------
// SCENARIO 1: Small Marginal Farmer
// ----------------------------------------------------------------
console.log("\n--- Scenario 1: Small Marginal Farmer ---");
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
const pmKisanMatch = farmerResults.allResults.find(r => r.schemeId === "pm-kisan");
assert(pmKisanMatch !== undefined, "PM Kisan is present in evaluated schemes");
assert(pmKisanMatch.status === "ELIGIBLE", "Farmer Ramesh is ELIGIBLE for PM-KISAN");
assert(pmKisanMatch.criteriaResults.every(c => c.status === "pass"), "All criteria passed for PM-KISAN");

const pmJayMatch = farmerResults.allResults.find(r => r.schemeId === "pm-jay");
assert(pmJayMatch.status === "ELIGIBLE", "Low-income farmer is ELIGIBLE for PM-JAY (Ayushman Bharat)");

// ----------------------------------------------------------------
// SCENARIO 2: Female Engineering Student (AICTE Pragati)
// ----------------------------------------------------------------
console.log("\n--- Scenario 2: Female Engineering Student (AICTE Pragati) ---");
const femaleTechStudent = {
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

const priyaResults = EligibilityEngine.evaluateAll(femaleTechStudent, SCHEMES_DATA);
const pragatiMatch = priyaResults.allResults.find(r => r.schemeId === "pm-pragati-scholarship");
assert(pragatiMatch.status === "ELIGIBLE", "Female technical student is ELIGIBLE for AICTE Pragati Scholarship");
assert(pragatiMatch.criteriaResults.find(c => c.key === "technicalDegree").status === "pass", "Technical degree check passed");
assert(pragatiMatch.criteriaResults.find(c => c.key === "gender").status === "pass", "Gender check passed for Pragati");

// Male student disqualification check
const maleTechStudent = { ...femaleTechStudent, gender: "Male" };
const malePragati = EligibilityEngine.evaluateScheme(maleTechStudent, SCHEMES_DATA.find(s => s.id === "pm-pragati-scholarship"));
assert(malePragati.status === "NOT_ELIGIBLE", "Male student is correctly NOT_ELIGIBLE for Pragati Scholarship");
assert(malePragati.criteriaResults.find(c => c.key === "gender").status === "fail", "Pragati gender check fails for male with clear reason");

// ----------------------------------------------------------------
// SCENARIO 3: SC Category Higher Education Student
// ----------------------------------------------------------------
console.log("\n--- Scenario 3: SC Category Student (Post-Matric) ---");
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

const scResults = EligibilityEngine.evaluateAll(scStudent, SCHEMES_DATA);
const postMatricMatch = scResults.allResults.find(r => r.schemeId === "post-matric-sc-st");
assert(postMatricMatch.status === "ELIGIBLE", "Amit Paswan is ELIGIBLE for Post-Matric SC/ST Scholarship");

// General student exceeding income for Post-Matric
const generalStudentHighIncome = { ...scStudent, category: "General", annualIncome: 600000 };
const genMatch = EligibilityEngine.evaluateScheme(generalStudentHighIncome, SCHEMES_DATA.find(s => s.id === "post-matric-sc-st"));
assert(genMatch.status === "NOT_ELIGIBLE", "High income General student is NOT_ELIGIBLE for Post-Matric SC/ST/OBC Scholarship");
assert(genMatch.criteriaResults.find(c => c.key === "category").status === "fail", "Category mismatch flagged as fail");
assert(genMatch.criteriaResults.find(c => c.key === "income").status === "fail", "Income limit exceeded flagged as fail");

// ----------------------------------------------------------------
// SCENARIO 4: Sukanya Samriddhi Yojana (Girl Child <= 10)
// ----------------------------------------------------------------
console.log("\n--- Scenario 4: Sukanya Samriddhi Yojana Age & Gender check ---");
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
const ssyMatch = EligibilityEngine.evaluateScheme(youngGirl, SCHEMES_DATA.find(s => s.id === "sukanya-samriddhi"));
assert(ssyMatch.status === "ELIGIBLE", "Girl child aged 6 is ELIGIBLE for Sukanya Samriddhi Yojana");

const adultFemaleSSY = { ...youngGirl, age: 24 };
const ssyAdultMatch = EligibilityEngine.evaluateScheme(adultFemaleSSY, SCHEMES_DATA.find(s => s.id === "sukanya-samriddhi"));
assert(ssyAdultMatch.status === "NOT_ELIGIBLE", "Adult woman aged 24 is NOT_ELIGIBLE for Sukanya Samriddhi account opening (>10 yrs)");

// ----------------------------------------------------------------
// SCENARIO 5: High Income Corporate Executive
// ----------------------------------------------------------------
console.log("\n--- Scenario 5: High Income Earner (> ₹25 Lakh) ---");
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
const highIncomeResults = EligibilityEngine.evaluateAll(highIncomeExec, SCHEMES_DATA);
assert(highIncomeResults.eligibleCount < 4, "High earner has limited subsidized scheme matches");
const pmKisanHigh = highIncomeResults.allResults.find(r => r.schemeId === "pm-kisan");
assert(pmKisanHigh.status === "NOT_ELIGIBLE", "High salaried professional is not eligible for PM-KISAN");

// ----------------------------------------------------------------
// SCENARIO 6: Edge Case - Negative Income Validation
// ----------------------------------------------------------------
console.log("\n--- Scenario 6: Edge Case - Negative Income Input ---");
const negativeIncomeProfile = {
  ...farmerProfile,
  annualIncome: -50000
};
const negativeIncomeRes = EligibilityEngine.evaluateScheme(negativeIncomeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(negativeIncomeRes.status === "NOT_ELIGIBLE", "Negative income must cause scheme to be NOT_ELIGIBLE");
assert(negativeIncomeRes.criteriaResults.find(c => c.key === "income").status === "fail", "Income criterion is flagged as fail for negative value");

// ----------------------------------------------------------------
// SCENARIO 7: Edge Case - Exact Boundary Income Checks
// ----------------------------------------------------------------
console.log("\n--- Scenario 7: Edge Case - Income Exactly at Boundary ---");
const postMatricScheme = SCHEMES_DATA.find(s => s.id === "post-matric-sc-st"); // maxIncome = 250000

// Exact boundary: 250000 (must PASS)
const boundaryProfileExact = { ...scStudent, annualIncome: 250000 };
const boundaryResExact = EligibilityEngine.evaluateScheme(boundaryProfileExact, postMatricScheme);
assert(boundaryResExact.criteriaResults.find(c => c.key === "income").status === "pass", "Income exactly at limit (₹2,50,000) must PASS");
assert(boundaryResExact.status === "ELIGIBLE", "Applicant with boundary income is ELIGIBLE");

// Just over boundary: 250001 (must FAIL)
const boundaryProfileOver = { ...scStudent, annualIncome: 250001 };
const boundaryResOver = EligibilityEngine.evaluateScheme(boundaryProfileOver, postMatricScheme);
assert(boundaryResOver.criteriaResults.find(c => c.key === "income").status === "fail", "Income ₹1 over limit (₹2,50,001) must FAIL");
assert(boundaryResOver.status === "NOT_ELIGIBLE", "Applicant exceeding boundary by ₹1 is NOT_ELIGIBLE");

// ----------------------------------------------------------------
// SCENARIO 8: Edge Case - Missing Information (Never Treat Missing as Proof)
// ----------------------------------------------------------------
console.log("\n--- Scenario 8: Edge Case - Missing Fields & Unverified Information ---");

// Empty profile
const emptyProfile = {};
const emptyProfileResults = EligibilityEngine.evaluateAll(emptyProfile, SCHEMES_DATA);
assert(emptyProfileResults.eligibleCount === 0, "Empty profile must result in 0 ELIGIBLE schemes (no missing info as proof)");
assert(emptyProfileResults.partialCount > 0, "Schemes without failed mandatory criteria become POSSIBLE_MATCH");

// Profile with missing income
const missingIncomeProfile = {
  ...farmerProfile,
  annualIncome: undefined
};
const missingIncomeRes = EligibilityEngine.evaluateScheme(missingIncomeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(missingIncomeRes.status === "POSSIBLE_MATCH", "Missing income makes PM-KISAN a POSSIBLE_MATCH (Needs Info), NOT ELIGIBLE");
assert(missingIncomeRes.criteriaResults.find(c => c.key === "income").status === "unverified", "Income is unverified when not provided");

// Profile with missing state
const missingStateProfile = {
  ...farmerProfile,
  state: ""
};
const missingStateRes = EligibilityEngine.evaluateScheme(missingStateProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(missingStateRes.status === "POSSIBLE_MATCH", "Missing state cannot assume All-India proof; must be POSSIBLE_MATCH");
assert(missingStateRes.criteriaResults.find(c => c.key === "state").status === "unverified", "State criterion is unverified when empty");

// Profile with missing gender on gender-specific scheme
const missingGenderProfile = {
  ...femaleTechStudent,
  gender: ""
};
const missingGenderRes = EligibilityEngine.evaluateScheme(missingGenderProfile, SCHEMES_DATA.find(s => s.id === "pm-pragati-scholarship"));
assert(missingGenderRes.status === "POSSIBLE_MATCH", "Missing gender on Pragati scheme must be POSSIBLE_MATCH, not ELIGIBLE");

// ----------------------------------------------------------------
// SCENARIO 9: Edge Case - Unsupported / Invalid Social Category
// ----------------------------------------------------------------
console.log("\n--- Scenario 9: Edge Case - Unsupported Social Category ---");
const invalidCategoryProfile = {
  ...farmerProfile,
  category: "NonExistentCategory"
};
const invalidCategoryRes = EligibilityEngine.evaluateScheme(invalidCategoryProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(invalidCategoryRes.status === "NOT_ELIGIBLE", "Unsupported category must make scheme NOT_ELIGIBLE");
assert(invalidCategoryRes.criteriaResults.find(c => c.key === "category").status === "fail", "Category flagged as fail for unsupported string");

// ----------------------------------------------------------------
// SCENARIO 10: Edge Case - Invalid Age (< 0 or > 120)
// ----------------------------------------------------------------
console.log("\n--- Scenario 10: Edge Case - Invalid Age ---");
const negativeAgeProfile = { ...farmerProfile, age: -10 };
const negativeAgeRes = EligibilityEngine.evaluateScheme(negativeAgeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(negativeAgeRes.status === "NOT_ELIGIBLE", "Negative age (-10) must be NOT_ELIGIBLE");
assert(negativeAgeRes.criteriaResults.find(c => c.key === "age").status === "fail", "Negative age criterion fails");

const superOldAgeProfile = { ...farmerProfile, age: 140 };
const superOldRes = EligibilityEngine.evaluateScheme(superOldAgeProfile, SCHEMES_DATA.find(s => s.id === "pm-kisan"));
assert(superOldRes.status === "NOT_ELIGIBLE", "Age 140 exceeds realistic limits and must be NOT_ELIGIBLE");

// ----------------------------------------------------------------
// SCENARIO 11: Atal Pension Yojana Age Boundaries (18 to 40)
// ----------------------------------------------------------------
console.log("\n--- Scenario 11: Atal Pension Yojana Age Boundaries (18 - 40) ---");
const apyScheme = SCHEMES_DATA.find(s => s.id === "atal-pension-yojana");
const baseApyCandidate = {
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

// Lower boundary (18) -> PASS
const apy18 = EligibilityEngine.evaluateScheme({ ...baseApyCandidate, age: 18 }, apyScheme);
assert(apy18.status === "ELIGIBLE", "Age 18 (min boundary) is ELIGIBLE for APY");

// Upper boundary (40) -> PASS
const apy40 = EligibilityEngine.evaluateScheme({ ...baseApyCandidate, age: 40 }, apyScheme);
assert(apy40.status === "ELIGIBLE", "Age 40 (max boundary) is ELIGIBLE for APY");

// Below boundary (17) -> FAIL
const apy17 = EligibilityEngine.evaluateScheme({ ...baseApyCandidate, age: 17 }, apyScheme);
assert(apy17.status === "NOT_ELIGIBLE", "Age 17 (below boundary) is NOT_ELIGIBLE for APY");

// Above boundary (41) -> FAIL
const apy41 = EligibilityEngine.evaluateScheme({ ...baseApyCandidate, age: 41 }, apyScheme);
assert(apy41.status === "NOT_ELIGIBLE", "Age 41 (above boundary) is NOT_ELIGIBLE for APY");

// ----------------------------------------------------------------
// SCENARIO 12: Street Vendor Profile (PM SVANidhi)
// ----------------------------------------------------------------
console.log("\n--- Scenario 12: Street Vendor Profile (PM SVANidhi) ---");
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
const svanidhiMatch = EligibilityEngine.evaluateScheme(vendorProfile, SCHEMES_DATA.find(s => s.id === "pm-svanidhi"));
assert(svanidhiMatch.status === "ELIGIBLE", "Informal worker/street vendor is ELIGIBLE for PM SVANidhi");

// ----------------------------------------------------------------
// SCENARIO 13: Education Level Hierarchy Check
// ----------------------------------------------------------------
console.log("\n--- Scenario 13: Education Level Hierarchy Check ---");
// Scheme requires 10th Pass (e.g. NAPS Apprenticeship)
const napsScheme = SCHEMES_DATA.find(s => s.id === "naps-apprenticeship");

const graduateCandidate = { ...baseApyCandidate, age: 22, occupation: "Unemployed", educationLevel: "Graduate" };
const gradRes = EligibilityEngine.evaluateScheme(graduateCandidate, napsScheme);
assert(gradRes.criteriaResults.find(c => c.key === "education").status === "pass", "Graduate level satisfies 10th pass requirement");

const below10thCandidate = { ...baseApyCandidate, age: 22, occupation: "Unemployed", educationLevel: "Below 10th" };
const below10thRes = EligibilityEngine.evaluateScheme(below10thCandidate, napsScheme);
assert(below10thRes.criteriaResults.find(c => c.key === "education").status === "fail", "Below 10th fails 10th pass requirement");
assert(below10thRes.status === "NOT_ELIGIBLE", "Below 10th candidate is NOT_ELIGIBLE for NAPS");

// ----------------------------------------------------------------
// SCENARIO 14: PM-DAKSH Yojana (Skill Training & Stipend)
// ----------------------------------------------------------------
console.log("\n--- Scenario 14: PM-DAKSH Yojana Verification ---");
const dakshScheme = SCHEMES_DATA.find(s => s.id === "pm-daksh");
assert(dakshScheme !== undefined, "PM-DAKSH scheme exists in database");

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

// Age > 45 disqualification
const dakshOverAge = { ...eligibleDakshCandidate, age: 48 };
const dakshOverAgeRes = EligibilityEngine.evaluateScheme(dakshOverAge, dakshScheme);
assert(dakshOverAgeRes.status === "NOT_ELIGIBLE", "Candidate aged 48 (exceeding 45 yrs) is NOT_ELIGIBLE for PM-DAKSH");

// OBC income > 3 Lakh disqualification
const dakshOBCExceed = { ...eligibleDakshCandidate, category: "OBC", annualIncome: 350000 };
const dakshOBCRes = EligibilityEngine.evaluateScheme(dakshOBCExceed, dakshScheme);
assert(dakshOBCRes.status === "NOT_ELIGIBLE", "OBC candidate with income > ₹3 Lakh is NOT_ELIGIBLE for PM-DAKSH");

// ----------------------------------------------------------------
// SCENARIO 15: AICTE Swanath Scholarship Scheme
// ----------------------------------------------------------------
console.log("\n--- Scenario 15: AICTE Swanath Scholarship Scheme ---");
const swanathScheme = SCHEMES_DATA.find(s => s.id === "aicte-swanath");
assert(swanathScheme !== undefined, "AICTE Swanath scheme exists in database");

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
assert(swanathRes.status === "ELIGIBLE", "Technical degree student meeting income limit is ELIGIBLE for AICTE Swanath");

// Non-technical degree disqualification
const swanathNonTech = { ...swanathCandidate, hasTechnicalDegree: false };
const swanathNonTechRes = EligibilityEngine.evaluateScheme(swanathNonTech, swanathScheme);
assert(swanathNonTechRes.status === "NOT_ELIGIBLE", "Student without technical degree enrollment is NOT_ELIGIBLE for AICTE Swanath");

// ----------------------------------------------------------------
// SCENARIO 16: PM-KISAN Age Limit Audit (Senior Citizen Farmer 75+)
// ----------------------------------------------------------------
console.log("\n--- Scenario 16: PM-KISAN Senior Citizen Landholder Verification ---");
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

console.log("\n=================================================");
console.log(`TEST SUMMARY: ${passedTests} Passed, ${failedTests} Failed`);
console.log("=================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!\n");
}
