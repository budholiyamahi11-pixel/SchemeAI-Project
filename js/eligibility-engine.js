/**
 * SchemeAI - Transparent Rule-Based Eligibility Engine
 * 
 * CORE PRINCIPLES:
 * 1. Deterministic & Explainable: No opaque black-box or hallucinated models.
 * 2. Strict Requirement Verification: A scheme is an ELIGIBLE match ONLY when all
 *    mandatory criteria are confirmed satisfied with valid user data.
 * 3. Never Treat Missing Information as Proof: Unprovided or missing fields
 *    result in an "unverified" criterion state and place the scheme into
 *    "POSSIBLE_MATCH" (Needs More Information), never "ELIGIBLE".
 * 4. Explicit Disqualification: Any failed mandatory criterion marks the scheme "NOT_ELIGIBLE".
 */

const EDUCATION_LEVEL_RANKS = {
  "None": 0,
  "Below 10th": 1,
  "10th Pass": 2,
  "12th Pass": 3,
  "Diploma / ITI": 4,
  "Graduate": 5,
  "Post-Graduate": 6
};

const VALID_SOCIAL_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const VALID_GENDERS = ["Female", "Male", "Transgender", "Other"];

class EligibilityEngine {
  /**
   * Evaluates a single user profile against a single scheme
   * @param {Object} userProfile 
   * @param {Object} scheme 
   * @returns {Object} Detailed evaluation outcome
   */
  static evaluateScheme(userProfile = {}, scheme) {
    if (!scheme || !scheme.rules) {
      throw new Error("Invalid scheme definition passed to evaluateScheme.");
    }

    const rules = scheme.rules;
    const criteriaResults = [];

    // -------------------------------------------------------------
    // 1. AGE CHECK
    // -------------------------------------------------------------
    const minAge = rules.minAge ?? 0;
    const maxAge = rules.maxAge ?? 120;
    const rawAge = userProfile.age;
    const userAge = (rawAge !== undefined && rawAge !== null && rawAge !== "") 
      ? parseInt(rawAge, 10) 
      : NaN;

    let ageStatus = "pass";
    let ageUserVal = `${userAge} years`;
    let ageReasonEn = "";
    let ageReasonHi = "";

    if (isNaN(userAge)) {
      ageStatus = "unverified";
      ageUserVal = "Not provided";
      ageReasonEn = `Age was not provided; cannot verify age requirement of ${minAge}-${maxAge} years.`;
      ageReasonHi = `आयु दर्ज नहीं की गई है; ${minAge}-${maxAge} वर्ष की आयु आवश्यकता की पुष्टि नहीं की जा सकती।`;
    } else if (userAge < 0 || userAge > 120) {
      ageStatus = "fail";
      ageReasonEn = `Invalid age (${userAge} yrs). Must be a realistic age between 0 and 100 years.`;
      ageReasonHi = `अमान्य आयु (${userAge} वर्ष)। आयु 0 से 100 वर्ष के बीच होनी चाहिए।`;
    } else if (userAge < minAge || userAge > maxAge) {
      ageStatus = "fail";
      ageReasonEn = `Applicant age must be between ${minAge} and ${maxAge} years (entered: ${userAge} yrs).`;
      ageReasonHi = `आवेदक की आयु ${minAge} से ${maxAge} वर्ष के बीच होनी चाहिए (दर्ज: ${userAge} वर्ष)।`;
    } else {
      ageStatus = "pass";
      ageReasonEn = `Your age (${userAge} yrs) satisfies the required range of ${minAge}-${maxAge} years.`;
      ageReasonHi = `आपकी आयु (${userAge} वर्ष) आवश्यक सीमा ${minAge}-${maxAge} वर्ष के अंतर्गत है।`;
    }

    criteriaResults.push({
      key: "age",
      nameEn: "Age Criterion",
      nameHi: "आयु मानदंड",
      status: ageStatus,
      passed: ageStatus === "pass",
      failed: ageStatus === "fail",
      isUnverified: ageStatus === "unverified",
      isMandatory: true,
      userValue: ageUserVal,
      ruleValue: `${minAge} to ${maxAge} years`,
      reasonEn: ageReasonEn,
      reasonHi: ageReasonHi
    });

    // -------------------------------------------------------------
    // 2. GENDER CHECK
    // -------------------------------------------------------------
    const rawGender = userProfile.gender;
    const userGender = (rawGender && typeof rawGender === "string") ? rawGender.trim() : "";
    const allowedGenders = rules.allowedGenders || ["All"];

    let genderStatus = "pass";
    let genderUserVal = userGender || "Not provided";
    let genderReasonEn = "";
    let genderReasonHi = "";

    if (!userGender) {
      genderStatus = "unverified";
      genderReasonEn = "Gender was not provided; cannot confirm gender-specific eligibility.";
      genderReasonHi = "लिंग दर्ज नहीं किया गया है; लिंग-आधारित पात्रता की पुष्टि नहीं की जा सकती।";
    } else if (!allowedGenders.includes("All") && !allowedGenders.includes(userGender)) {
      genderStatus = "fail";
      genderReasonEn = `This scheme is exclusively reserved for ${allowedGenders.join("/")} applicants.`;
      genderReasonHi = `यह योजना केवल ${allowedGenders.join("/")} आवेदकों के लिए आरक्षित है।`;
    } else {
      genderStatus = "pass";
      genderReasonEn = allowedGenders.includes("All") 
        ? `Open to all genders (entered: ${userGender}).` 
        : `Scheme specifically supports ${userGender} applicants.`;
      genderReasonHi = allowedGenders.includes("All") 
        ? `सभी लिंगों के लिए मान्य (दर्ज: ${userGender})।` 
        : `यह योजना विशेष रूप से ${userGender} आवेदकों के लिए है।`;
    }

    criteriaResults.push({
      key: "gender",
      nameEn: "Gender Eligibility",
      nameHi: "लिंग पात्रता",
      status: genderStatus,
      passed: genderStatus === "pass",
      failed: genderStatus === "fail",
      isUnverified: genderStatus === "unverified",
      isMandatory: true,
      userValue: genderUserVal,
      ruleValue: allowedGenders.join(", "),
      reasonEn: genderReasonEn,
      reasonHi: genderReasonHi
    });

    // -------------------------------------------------------------
    // 3. SOCIAL CATEGORY CHECK
    // -------------------------------------------------------------
    const rawCategory = userProfile.category;
    const userCategory = (rawCategory && typeof rawCategory === "string") ? rawCategory.trim() : "";
    const allowedCategories = rules.allowedCategories || ["All"];

    let categoryStatus = "pass";
    let categoryUserVal = userCategory || "Not provided";
    let categoryReasonEn = "";
    let categoryReasonHi = "";

    if (!userCategory) {
      categoryStatus = "unverified";
      categoryReasonEn = "Social category was not provided; cannot verify affirmative action / category criteria.";
      categoryReasonHi = "सामाजिक श्रेणी दर्ज नहीं की गई है; श्रेणी पात्रता की पुष्टि नहीं की जा सकती।";
    } else if (!VALID_SOCIAL_CATEGORIES.includes(userCategory)) {
      categoryStatus = "fail";
      categoryReasonEn = `Unsupported social category '${userCategory}'. Must be General, OBC, SC, ST, or EWS.`;
      categoryReasonHi = `अमान्य सामाजिक श्रेणी '${userCategory}'। मान्य श्रेणियां: General, OBC, SC, ST, EWS।`;
    } else if (!allowedCategories.includes("All") && !allowedCategories.includes(userCategory)) {
      categoryStatus = "fail";
      categoryReasonEn = `Scheme is reserved for ${allowedCategories.join(", ")} categories. '${userCategory}' does not match.`;
      categoryReasonHi = `यह योजना केवल ${allowedCategories.join(", ")} के लिए है। '${userCategory}' इससे मेल नहीं खाती।`;
    } else {
      categoryStatus = "pass";
      categoryReasonEn = allowedCategories.includes("All")
        ? `Open to all categories (General, OBC, SC, ST, EWS). Declared: ${userCategory}.`
        : `Category '${userCategory}' is eligible under reserved target criteria.`;
      categoryReasonHi = allowedCategories.includes("All")
        ? `सभी श्रेणियों के लिए मान्य (दर्ज: ${userCategory})।`
        : `'${userCategory}' श्रेणी इस योजना के तहत पात्र है।`;
    }

    criteriaResults.push({
      key: "category",
      nameEn: "Social Category",
      nameHi: "सामाजिक श्रेणी",
      status: categoryStatus,
      passed: categoryStatus === "pass",
      failed: categoryStatus === "fail",
      isUnverified: categoryStatus === "unverified",
      isMandatory: true,
      userValue: categoryUserVal,
      ruleValue: allowedCategories.includes("All") ? "Open to All Categories" : allowedCategories.join(", "),
      reasonEn: categoryReasonEn,
      reasonHi: categoryReasonHi
    });

    // -------------------------------------------------------------
    // 4. ANNUAL FAMILY INCOME CHECK (With strict boundary & non-negative checks)
    // -------------------------------------------------------------
    const rawIncome = userProfile.annualIncome;
    const userIncome = (rawIncome !== undefined && rawIncome !== null && rawIncome !== "") 
      ? parseFloat(rawIncome) 
      : NaN;
    const maxIncome = rules.maxIncome;

    let incomeStatus = "pass";
    let incomeUserVal = isNaN(userIncome) ? "Not provided" : `₹${userIncome.toLocaleString("en-IN")} / year`;
    let incomeRuleDisplay = (maxIncome !== null && maxIncome !== undefined)
      ? `Up to ₹${maxIncome.toLocaleString("en-IN")} / year`
      : "No strict upper income cap defined";
    let incomeRuleDisplayHi = (maxIncome !== null && maxIncome !== undefined)
      ? `अधिकतम ₹${maxIncome.toLocaleString("en-IN")} / वर्ष`
      : "कोई सख्त अधिकतम आय सीमा नहीं";

    let incomeReasonEn = "";
    let incomeReasonHi = "";

    if (isNaN(userIncome)) {
      incomeStatus = "unverified";
      incomeReasonEn = "Annual family income was not provided; cannot verify income ceiling.";
      incomeReasonHi = "वार्षिक पारिवारिक आय दर्ज नहीं की गई है; आय सीमा की पुष्टि नहीं की जा सकती।";
    } else if (userIncome < 0) {
      incomeStatus = "fail";
      incomeReasonEn = `Invalid negative income (₹${userIncome}). Annual family income must be ₹0 or greater.`;
      incomeReasonHi = `अमान्य ऋणात्मक आय (₹${userIncome})। वार्षिक पारिवारिक आय ₹0 या अधिक होनी चाहिए।`;
    } else if (maxIncome !== null && maxIncome !== undefined && userIncome > maxIncome) {
      incomeStatus = "fail";
      incomeReasonEn = `Your family income (₹${userIncome.toLocaleString("en-IN")}) exceeds the scheme's ceiling of ₹${maxIncome.toLocaleString("en-IN")}.`;
      incomeReasonHi = `आपकी पारिवारिक आय (₹${userIncome.toLocaleString("en-IN")}) योजना की अधिकतम सीमा (₹${maxIncome.toLocaleString("en-IN")}) से अधिक है।`;
    } else {
      incomeStatus = "pass";
      incomeReasonEn = (maxIncome === null || maxIncome === undefined)
        ? `No upper income cap defined (declared: ₹${userIncome.toLocaleString("en-IN")}).`
        : `Your family income (₹${userIncome.toLocaleString("en-IN")}) is within the ceiling of ₹${maxIncome.toLocaleString("en-IN")}.`;
      incomeReasonHi = (maxIncome === null || maxIncome === undefined)
        ? `कोई सख्त आय सीमा नहीं है (दर्ज: ₹${userIncome.toLocaleString("en-IN")})।`
        : `आपकी पारिवारिक आय सीमा (₹${maxIncome.toLocaleString("en-IN")}) के अंतर्गत है।`;
    }

    criteriaResults.push({
      key: "income",
      nameEn: "Annual Family Income",
      nameHi: "वार्षिक पारिवारिक आय",
      status: incomeStatus,
      passed: incomeStatus === "pass",
      failed: incomeStatus === "fail",
      isUnverified: incomeStatus === "unverified",
      isMandatory: true,
      userValue: incomeUserVal,
      ruleValue: incomeRuleDisplay,
      reasonEn: incomeReasonEn,
      reasonHi: incomeReasonHi
    });

    // -------------------------------------------------------------
    // 5. OCCUPATION CHECK
    // -------------------------------------------------------------
    const rawOccupation = userProfile.occupation;
    const userOccupation = (rawOccupation && typeof rawOccupation === "string") ? rawOccupation.trim() : "";
    const allowedOccupations = rules.allowedOccupations || ["All"];

    let occStatus = "pass";
    let occUserVal = userOccupation || "Not provided";
    let occReasonEn = "";
    let occReasonHi = "";

    if (!userOccupation) {
      occStatus = "unverified";
      occReasonEn = "Occupation was not provided; cannot verify beneficiary sector requirement.";
      occReasonHi = "व्यवसाय दर्ज नहीं किया गया है; लाभार्थी क्षेत्र की पुष्टि नहीं की जा सकती।";
    } else if (!allowedOccupations.includes("All") && !allowedOccupations.includes(userOccupation)) {
      occStatus = "fail";
      occReasonEn = `Targeted to: ${allowedOccupations.join(", ")}. Your declared occupation is '${userOccupation}'.`;
      occReasonHi = `यह योजना ${allowedOccupations.join(", ")} के लिए लक्षित है। आपका पेशा '${userOccupation}' है।`;
    } else {
      occStatus = "pass";
      occReasonEn = allowedOccupations.includes("All")
        ? `Open regardless of profession (declared: '${userOccupation}').`
        : `Your occupation '${userOccupation}' matches the target beneficiary segment.`;
      occReasonHi = allowedOccupations.includes("All")
        ? `सभी व्यवसायों के लिए मान्य (दर्ज: '${userOccupation}')।`
        : `आपका व्यवसाय '${userOccupation}' इस योजना के अनुकूल है।`;
    }

    criteriaResults.push({
      key: "occupation",
      nameEn: "Occupation / Activity",
      nameHi: "व्यवसाय / कार्यक्षेत्र",
      status: occStatus,
      passed: occStatus === "pass",
      failed: occStatus === "fail",
      isUnverified: occStatus === "unverified",
      isMandatory: true,
      userValue: occUserVal,
      ruleValue: allowedOccupations.includes("All") ? "Any Occupation" : allowedOccupations.join(", "),
      reasonEn: occReasonEn,
      reasonHi: occReasonHi
    });

    // -------------------------------------------------------------
    // 6. EDUCATION LEVEL CHECK
    // -------------------------------------------------------------
    const rawEducation = userProfile.educationLevel;
    const userEducation = (rawEducation && typeof rawEducation === "string") ? rawEducation.trim() : "";
    const requiredEducation = rules.minEducation || "None";
    const userRank = EDUCATION_LEVEL_RANKS[userEducation] ?? (userEducation ? 0 : -1);
    const requiredRank = EDUCATION_LEVEL_RANKS[requiredEducation] ?? 0;

    let eduStatus = "pass";
    let eduUserVal = userEducation || "Not provided";
    let eduReasonEn = "";
    let eduReasonHi = "";

    if (!userEducation) {
      eduStatus = "unverified";
      eduReasonEn = "Education level was not provided; cannot verify minimum educational standard.";
      eduReasonHi = "शैक्षणिक योग्यता दर्ज नहीं की गई है; न्यूनतम शैक्षिक आवश्यकता की पुष्टि नहीं की जा सकती।";
    } else if (userRank < requiredRank) {
      eduStatus = "fail";
      eduReasonEn = `Requires at least ${requiredEducation}. Declared level is ${userEducation}.`;
      eduReasonHi = `न्यूनतम ${requiredEducation} आवश्यक है। वर्तमान स्तर ${userEducation} है।`;
    } else {
      eduStatus = "pass";
      eduReasonEn = requiredEducation === "None"
        ? `No minimum educational degree required (declared: ${userEducation}).`
        : `Your education level (${userEducation}) satisfies the minimum requirement (${requiredEducation}).`;
      eduReasonHi = requiredEducation === "None"
        ? `किसी न्यूनतम शैक्षणिक डिग्री की आवश्यकता नहीं (दर्ज: ${userEducation})।`
        : `आपकी शिक्षा (${userEducation}) न्यूनतम आवश्यकता (${requiredEducation}) को पूरा करती है।`;
    }

    criteriaResults.push({
      key: "education",
      nameEn: "Education Qualification",
      nameHi: "शैक्षणिक योग्यता",
      status: eduStatus,
      passed: eduStatus === "pass",
      failed: eduStatus === "fail",
      isUnverified: eduStatus === "unverified",
      isMandatory: true,
      userValue: eduUserVal,
      ruleValue: requiredEducation === "None" ? "No minimum qualification needed" : `Minimum ${requiredEducation}`,
      reasonEn: eduReasonEn,
      reasonHi: eduReasonHi
    });

    // -------------------------------------------------------------
    // 7. TECHNICAL DEGREE CHECK
    // -------------------------------------------------------------
    const rawTech = userProfile.hasTechnicalDegree;
    const requiresTechnicalDegree = rules.requiresTechnicalDegree;
    let techStatus = "pass";
    let techUserVal = "No";
    let techRule = "Not required";
    let techReasonEn = "";
    let techReasonHi = "";

    if (requiresTechnicalDegree === true) {
      techRule = "Technical / Professional Degree Required (B.Tech, B.E., Diploma, etc.)";
      if (rawTech === undefined || rawTech === null || rawTech === "") {
        techStatus = "unverified";
        techUserVal = "Not specified";
        techReasonEn = "Technical degree enrollment status was not specified. Scheme requires approved technical degree/diploma.";
        techReasonHi = "तकनीकी डिग्री की स्थिति दर्ज नहीं की गई। योजना के लिए अनुमोदित डिग्री/डिप्लोमा आवश्यक है।";
      } else if (Boolean(rawTech) === true) {
        techStatus = "pass";
        techUserVal = "Yes (Enrolled / Completed)";
        techReasonEn = "You meet the technical degree enrollment condition.";
        techReasonHi = "आप तकनीकी डिग्री की शर्त को पूरा करते हैं।";
      } else {
        techStatus = "fail";
        techUserVal = "No";
        techReasonEn = "This scheme specifically requires enrollment in an approved technical/engineering degree or diploma program.";
        techReasonHi = "इस योजना के लिए अनुमोदित तकनीकी/इंजीनियरिंग डिग्री या डिप्लोमा अनिवार्य है।";
      }
    } else {
      techStatus = "pass";
      techUserVal = rawTech ? "Yes" : "No";
      techReasonEn = "No specialized technical degree is mandated for this scheme.";
      techReasonHi = "इस योजना के लिए किसी तकनीकी डिग्री की आवश्यकता नहीं है।";
    }

    criteriaResults.push({
      key: "technicalDegree",
      nameEn: "Technical Degree Requirement",
      nameHi: "तकनीकी डिग्री की शर्त",
      status: techStatus,
      passed: techStatus === "pass",
      failed: techStatus === "fail",
      isUnverified: techStatus === "unverified",
      isMandatory: requiresTechnicalDegree === true,
      userValue: techUserVal,
      ruleValue: techRule,
      reasonEn: techReasonEn,
      reasonHi: techReasonHi
    });

    // -------------------------------------------------------------
    // 8. STATE / DOMICILE CHECK
    // -------------------------------------------------------------
    const rawState = userProfile.state;
    const userState = (rawState && typeof rawState === "string") ? rawState.trim() : "";
    const targetStates = scheme.targetStates || ["All"];

    let stateStatus = "pass";
    let stateUserVal = userState || "Not provided";
    let stateReasonEn = "";
    let stateReasonHi = "";

    if (!userState) {
      stateStatus = "unverified";
      stateReasonEn = "Domicile state was not provided; cannot verify territorial eligibility.";
      stateReasonHi = "राज्य दर्ज नहीं किया गया है; अधिकार क्षेत्र की पात्रता की पुष्टि नहीं की जा सकती।";
    } else if (!targetStates.includes("All") && !targetStates.includes(userState)) {
      stateStatus = "fail";
      stateReasonEn = `Restricted to: ${targetStates.join(", ")}. Declared domicile: ${userState}.`;
      stateReasonHi = `केवल ${targetStates.join(", ")} में लागू। आपका राज्य: ${userState}।`;
    } else {
      stateStatus = "pass";
      stateReasonEn = targetStates.includes("All")
        ? `Applicable across all States & UTs in India (declared: ${userState}).`
        : `Applicable in declared state (${userState}).`;
      stateReasonHi = targetStates.includes("All")
        ? `भारत के सभी राज्यों और केंद्र शासित प्रदेशों में लागू (राज्य: ${userState})।`
        : `घोषित राज्य (${userState}) में लागू।`;
    }

    criteriaResults.push({
      key: "state",
      nameEn: "State / Jurisdiction",
      nameHi: "राज्य / अधिकार क्षेत्र",
      status: stateStatus,
      passed: stateStatus === "pass",
      failed: stateStatus === "fail",
      isUnverified: stateStatus === "unverified",
      isMandatory: true,
      userValue: stateUserVal,
      ruleValue: targetStates.includes("All") ? "Pan-India (All States & UTs)" : targetStates.join(", "),
      reasonEn: stateReasonEn,
      reasonHi: stateReasonHi
    });

    // -------------------------------------------------------------
    // SCORE & THREE-TIER STATUS DETERMINATION
    // -------------------------------------------------------------
    const totalCriteria = criteriaResults.length;
    const passedCriteria = criteriaResults.filter(c => c.status === "pass");
    const failedCriteria = criteriaResults.filter(c => c.status === "fail");
    const unverifiedCriteria = criteriaResults.filter(c => c.status === "unverified");

    const matchPercentage = Math.round((passedCriteria.length / totalCriteria) * 100);

    let status = "ELIGIBLE";
    let statusLabelEn = "Likely Eligible";
    let statusLabelHi = "संभावित रूप से पात्र";
    let badgeClass = "badge-eligible";

    // RULE 1: Any mandatory failure immediately disqualifies the applicant
    if (failedCriteria.length > 0) {
      status = "NOT_ELIGIBLE";
      statusLabelEn = "Non-Match (Ineligible)";
      statusLabelHi = "फिलहाल अपात्र";
      badgeClass = "badge-ineligible";
    }
    // RULE 2: If no criteria failed, but any information is missing or unverified:
    // It is a POSSIBLE MATCH that needs more information. Never declare ELIGIBLE with missing data!
    else if (unverifiedCriteria.length > 0) {
      status = "POSSIBLE_MATCH";
      statusLabelEn = "Possible Match (Needs Info)";
      statusLabelHi = "संभावित मेल (जानकारी आवश्यक)";
      badgeClass = "badge-partial";
    }
    // RULE 3: All mandatory criteria are confirmed SATISFIED with valid user data
    else {
      status = "ELIGIBLE";
      statusLabelEn = "Likely Eligible";
      statusLabelHi = "संभावित रूप से पात्र";
      badgeClass = "badge-eligible";
    }

    return {
      schemeId: scheme.id,
      schemeNameEn: scheme.nameEn,
      schemeNameHi: scheme.nameHi,
      schemeCode: scheme.code,
      category: scheme.category,
      level: scheme.level,
      officialPortalUrl: scheme.officialPortalUrl,
      status,
      statusLabelEn,
      statusLabelHi,
      badgeClass,
      matchPercentage,
      passedCriteriaCount: passedCriteria.length,
      failedCriteriaCount: failedCriteria.length,
      unverifiedCriteriaCount: unverifiedCriteria.length,
      totalCriteriaCount: totalCriteria,
      criteriaResults,
      benefitsSummaryEn: scheme.benefitsSummaryEn,
      benefitsSummaryHi: scheme.benefitsSummaryHi,
      documentsRequiredEn: scheme.documentsRequiredEn,
      documentsRequiredHi: scheme.documentsRequiredHi,
      disqualifiers: scheme.rules.disqualifiers || [],
      disclaimerEn: "PRELIMINARY ASSESSMENT: This eligibility indication is generated using rule-based comparison against publicly available guidelines. Final eligibility, verification, and sanction are determined solely by the competent Government authority during formal application review.",
      disclaimerHi: "प्रारंभिक मूल्यांकन: यह पात्रता परिणाम सार्वजनिक दिशानिर्देशों के नियम-आधारित मिलान द्वारा तैयार किया गया है। अंतिम पात्रता, सत्यापन और स्वीकृति केवल संबंधित सरकारी प्राधिकरण द्वारा औपचारिक आवेदन समीक्षा के दौरान निर्धारित की जाती है।"
    };
  }

  /**
   * Evaluates a user profile against all schemes in the database
   * @param {Object} userProfile 
   * @param {Array} schemesList 
   * @returns {Object} Grouped results with sorted lists
   */
  static evaluateAll(userProfile = {}, schemesList = []) {
    const results = schemesList.map(scheme => this.evaluateScheme(userProfile, scheme));

    // Sort: First ELIGIBLE (highest score), then POSSIBLE_MATCH, then NOT_ELIGIBLE
    const statusPriority = { "ELIGIBLE": 3, "POSSIBLE_MATCH": 2, "NOT_ELIGIBLE": 1 };
    results.sort((a, b) => {
      const pDiff = statusPriority[b.status] - statusPriority[a.status];
      if (pDiff !== 0) return pDiff;
      return b.matchPercentage - a.matchPercentage;
    });

    const eligible = results.filter(r => r.status === "ELIGIBLE");
    const partial = results.filter(r => r.status === "POSSIBLE_MATCH");
    const ineligible = results.filter(r => r.status === "NOT_ELIGIBLE");

    return {
      totalEvaluated: schemesList.length,
      eligibleCount: eligible.length,
      partialCount: partial.length,
      ineligibleCount: ineligible.length,
      allResults: results,
      eligible,
      partial,
      ineligible,
      evaluatedAt: new Date().toISOString(),
      userProfileSummary: {
        name: (userProfile.name && userProfile.name.trim()) || "Citizen",
        age: userProfile.age !== undefined && userProfile.age !== null ? userProfile.age : "Not provided",
        gender: userProfile.gender || "Not provided",
        category: userProfile.category || "Not provided",
        state: userProfile.state || "Not provided",
        occupation: userProfile.occupation || "Not provided",
        annualIncome: userProfile.annualIncome !== undefined && userProfile.annualIncome !== null ? userProfile.annualIncome : "Not provided",
        educationLevel: userProfile.educationLevel || "Not provided",
        hasTechnicalDegree: Boolean(userProfile.hasTechnicalDegree)
      }
    };
  }
}

// Export for node tests & browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { 
    EligibilityEngine, 
    EDUCATION_LEVEL_RANKS, 
    VALID_SOCIAL_CATEGORIES, 
    VALID_GENDERS 
  };
}
