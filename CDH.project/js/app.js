/**
 * SchemeAI - Main Application Controller
 */

(function () {
  "use strict";

  // Application State
  const state = {
    lang: localStorage.getItem("schemeai_lang") || "en",
    lastEvaluatedResult: null,
    activeResultFilter: "all",
    activeExploreCategory: "all",
    exploreSearchQuery: "",
    activeModalSchemeId: null,
    bookmarkedSchemeIds: JSON.parse(localStorage.getItem("schemeai_bookmarks") || "[]")
  };

  // DOM Elements
  const elements = {
    // Nav & Controls
    langToggleBtn: document.getElementById("btn-language-toggle"),
    langToggleTxt: document.getElementById("txt-btnLanguage"),
    mobileMenuBtn: document.getElementById("mobile-toggle-btn"),
    navMenu: document.getElementById("nav-menu"),

    // Form
    eligibilityForm: document.getElementById("eligibility-form"),
    inputName: document.getElementById("input-name"),
    inputAge: document.getElementById("input-age"),
    selectGender: document.getElementById("select-gender"),
    selectState: document.getElementById("select-state"),
    selectCategory: document.getElementById("select-category"),
    selectOccupation: document.getElementById("select-occupation"),
    inputIncome: document.getElementById("input-income"),
    selectEducation: document.getElementById("select-education"),
    selectTechnical: document.getElementById("select-technical"),
    btnResetForm: document.getElementById("btn-reset-form"),
    btnFillFarmer: document.getElementById("btn-fill-farmer"),
    btnFillStudent: document.getElementById("btn-fill-student"),
    presetButtons: document.querySelectorAll(".btn-preset"),

    // Results Container
    resultsDisplay: document.getElementById("results-display"),
    summaryCitizenName: document.getElementById("summary-citizen-name"),
    summaryCitizenDemographics: document.getElementById("summary-citizen-demographics"),
    metricEligibleCount: document.getElementById("metric-eligible-count"),
    metricPartialCount: document.getElementById("metric-partial-count"),
    metricIneligibleCount: document.getElementById("metric-ineligible-count"),
    btnPrintReport: document.getElementById("btn-print-report"),
    btnModifyDetails: document.getElementById("btn-modify-details"),
    resultTabButtons: document.querySelectorAll(".result-tab-btn"),
    badgeTabAll: document.getElementById("badge-tab-all"),
    badgeTabEligible: document.getElementById("badge-tab-eligible"),
    badgeTabPartial: document.getElementById("badge-tab-partial"),
    badgeTabIneligible: document.getElementById("badge-tab-ineligible"),
    evaluatedSchemesContainer: document.getElementById("evaluated-schemes-container"),

    // Explore Section
    exploreSearchInput: document.getElementById("explore-search-input"),
    exploreCategoryChips: document.getElementById("explore-category-chips"),
    exploreSchemesContainer: document.getElementById("explore-schemes-container"),

    // Contact
    contactForm: document.getElementById("contact-form"),
    contactSuccessBox: document.getElementById("contact-success-box"),

    // Modal
    modalOverlay: document.getElementById("scheme-detail-modal"),
    modalSchemeTitle: document.getElementById("modal-scheme-title"),
    modalSchemeMinistry: document.getElementById("modal-scheme-ministry"),
    modalCriteriaContainer: document.getElementById("modal-criteria-container"),
    modalDocsContainer: document.getElementById("modal-docs-container"),
    modalDisqualifiersContainer: document.getElementById("modal-disqualifiers-container"),
    modalSourceAndDeadlineText: document.getElementById("modal-source-and-deadline-text"),
    modalLinkOfficial: document.getElementById("modal-link-official"),
    modalBtnClose: document.getElementById("modal-btn-close"),
    modalBtnDismiss: document.getElementById("modal-btn-dismiss"),
    modalTabButtons: document.querySelectorAll(".modal-tab-btn"),
    modalPanes: document.querySelectorAll(".modal-tab-pane"),

    // Toast
    toastContainer: document.getElementById("toast-container")
  };

  /**
   * Initializes the application
   */
  function init() {
    populateStateDropdown();
    renderExploreCategoryChips();
    renderExploreSchemes();
    applyLanguage(state.lang);
    bindEvents();
  }

  /**
   * Populates the State / Union Territory dropdown
   */
  function populateStateDropdown() {
    elements.selectState.innerHTML = "";
    
    // First option
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.id = "opt-selectState";
    defaultOpt.textContent = state.lang === "hi" ? "-- राज्य / केंद्र शासित प्रदेश चुनें --" : "-- Select State / UT --";
    elements.selectState.appendChild(defaultOpt);

    INDIAN_STATES.forEach(st => {
      const opt = document.createElement("option");
      opt.value = st;
      opt.textContent = st;
      elements.selectState.appendChild(opt);
    });
  }

  /**
   * Updates all UI text nodes according to current language
   */
  function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem("schemeai_lang", lang);
    document.documentElement.lang = lang;

    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Toggle button label
    elements.langToggleTxt.textContent = lang === "hi" ? "English" : "हिन्दी";

    // Text mapping by ID
    const textMap = {
      "txt-sampleDataNotice": t.sampleDataNotice,
      "txt-navTagline": t.navTagline,
      "txt-navHome": t.navHome,
      "txt-navChecker": t.navChecker,
      "txt-navExplore": t.navExplore,
      "txt-navFeatures": t.navFeatures,
      "txt-navAbout": t.navAbout,
      "txt-navContact": t.navContact,
      "txt-btnStartCheckingNav": t.btnStartChecking,
      "txt-heroBadge": t.heroBadge,
      "txt-heroTitle": t.heroTitle,
      "txt-heroSubtitle": t.heroSubtitle,
      "txt-btnStartChecking": t.btnStartChecking,
      "txt-btnExploreAll": t.btnExploreAll,
      "txt-heroStat1": t.heroStat1,
      "txt-heroStat2": t.heroStat2,
      "txt-heroStat3": t.heroStat3,
      "txt-heroStat4": t.heroStat4,
      "txt-checkerHeading": t.checkerHeading,
      "txt-checkerSubtitle": t.checkerSubtitle,
      "txt-btnFillSample": t.btnFillSample,
      "txt-btnFillSampleStudent": t.btnFillSampleStudent,
      "txt-labelName": t.labelName,
      "txt-helpName": t.helpName,
      "txt-labelAge": t.labelAge,
      "txt-helpAge": t.helpAge,
      "txt-labelGender": t.labelGender,
      "opt-selectGender": t.optSelectGender,
      "opt-female": t.optFemale,
      "opt-male": t.optMale,
      "opt-transgender": t.optTransgender,
      "txt-labelState": t.labelState,
      "opt-selectState": t.optSelectState,
      "txt-labelCategory": t.labelCategory,
      "opt-selectCategory": t.optSelectCategory,
      "opt-general": t.optGeneral,
      "opt-obc": t.optOBC,
      "opt-sc": t.optSC,
      "opt-st": t.optST,
      "opt-ews": t.optEWS,
      "txt-labelOccupation": t.labelOccupation,
      "opt-selectOccupation": t.optSelectOccupation,
      "opt-farmer": t.optFarmer,
      "opt-student": t.optStudent,
      "opt-selfEmployed": t.optSelfEmployed,
      "opt-salaried": t.optSalaried,
      "opt-dailyWage": t.optDailyWage,
      "opt-unemployed": t.optUnemployed,
      "opt-homemaker": t.optHomemaker,
      "opt-otherOcc": t.optOtherOcc,
      "txt-labelIncome": t.labelIncome,
      "txt-helpIncome": t.helpIncome,
      "preset-1": t.incomePreset1,
      "preset-2": t.incomePreset2,
      "preset-3": t.incomePreset3,
      "preset-4": t.incomePreset4,
      "txt-labelEducation": t.labelEducation,
      "opt-selectEducation": t.optSelectEducation,
      "opt-eduNone": t.optEduNone,
      "opt-edu10th": t.optEdu10th,
      "opt-edu12th": t.optEdu12th,
      "opt-eduDiploma": t.optEduDiploma,
      "opt-eduGraduate": t.optEduGraduate,
      "opt-eduPostGraduate": t.optEduPostGraduate,
      "txt-labelTechnicalDegree": t.labelTechnicalDegree,
      "opt-techNo": t.optTechNo,
      "opt-techYes": t.optTechYes,
      "txt-btnResetForm": t.btnResetForm,
      "txt-btnCheckNow": t.btnCheckNow,
      "err-age": t.errAgeRange,
      "err-gender": t.errGender,
      "err-state": t.errState,
      "err-category": t.errCategory,
      "err-occupation": t.errOccupation,
      "err-income": t.errIncomeValid,
      "err-education": t.errEducation,
      "err-technical": t.errTechnical,
      "txt-resultsHeading": t.resultsHeading,
      "txt-resultsSubtitle": t.resultsSubtitle,
      "txt-preliminaryDisclaimerTitle": t.preliminaryDisclaimerTitle,
      "txt-preliminaryDisclaimerText": t.preliminaryDisclaimerText,
      "txt-tagEligibleCount": t.tagEligibleCount,
      "txt-tagPartialCount": t.tagPartialCount,
      "txt-tagIneligibleCount": t.tagIneligibleCount,
      "txt-btnPrintReport": t.btnPrintReport,
      "txt-btnEditDetails": t.btnEditDetails,
      "txt-filterTabAll": t.filterTabAll,
      "txt-filterTabEligible": t.filterTabEligible,
      "txt-filterTabPartial": t.filterTabPartial,
      "txt-filterTabIneligible": t.filterTabIneligible,
      "txt-trySampleProfiles": t.txtTrySampleProfiles,
      "txt-liveShowcaseTitle": t.liveShowcaseTitle,
      "txt-exploreHeading": t.exploreHeading,
      "txt-exploreSubtitle": t.exploreSubtitle,
      "txt-featHeading": t.featHeading,
      "txt-featSubtitle": t.featSubtitle,
      "txt-feat1Title": t.feat1Title,
      "txt-feat1Desc": t.feat1Desc,
      "txt-feat2Title": t.feat2Title,
      "txt-feat2Desc": t.feat2Desc,
      "txt-feat3Title": t.feat3Title,
      "txt-feat3Desc": t.feat3Desc,
      "txt-feat4Title": t.feat4Title,
      "txt-feat4Desc": t.feat4Desc,
      "txt-aboutHeading": t.aboutHeading,
      "txt-aboutText1": t.aboutText1,
      "txt-aboutText2": t.aboutText2,
      "txt-legalDisclaimerTitle": t.legalDisclaimerTitle,
      "txt-legalDisclaimerText": t.legalDisclaimerText,
      "txt-contactHeading": t.contactHeading,
      "txt-contactSubtitle": t.contactSubtitle,
      "txt-contactName": t.contactName,
      "txt-contactEmail": t.contactEmail,
      "txt-contactSubject": t.contactSubject,
      "txt-contactMessage": t.contactMessage,
      "txt-btnSendMessage": t.btnSendMessage,
      "txt-contactSuccess": t.contactSuccess,
      "txt-helplinesTitle": t.helplinesTitle,
      "txt-helpline1": t.helpline1,
      "txt-helpline2": t.helpline2,
      "txt-helpline3": t.helpline3,
      "txt-helpline4": t.helpline4,
      "txt-modalCriteriaTab": t.modalCriteriaTab,
      "txt-modalDocumentsTab": t.modalDocumentsTab,
      "txt-modalDisqualifiersTab": t.modalDisqualifiersTab,
      "txt-disqualifiersHeading": t.disqualifiersHeading,
      "txt-authorityNoticeTitle": t.authorityNoticeTitle,
      "txt-modalClose": t.modalClose,
      "txt-btnApplyOfficial": t.btnApplyOfficial,
      "txt-footerTagline": t.footerTagline,
      "txt-footerCopy": t.footerCopy,
      "txt-footerBackToTop": t.footerBackToTop
    };

    Object.keys(textMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = textMap[id];
    });

    // Placeholders
    elements.inputName.placeholder = lang === "hi" ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar";
    elements.inputAge.placeholder = lang === "hi" ? "उदा. 28" : "e.g. 28";
    elements.inputIncome.placeholder = lang === "hi" ? "उदा. 180000" : "e.g. 180000";
    elements.exploreSearchInput.placeholder = t.searchPlaceholder;

    // Rerender active views with new language
    renderExploreCategoryChips();
    renderExploreSchemes();
    if (state.lastEvaluatedResult) {
      renderEvaluatedResults();
      if (state.activeModalSchemeId) {
        showSchemeDetailModal(state.activeModalSchemeId);
      }
    }
  }

  /**
   * Binds event listeners
   */
  function bindEvents() {
    // Language Toggle
    elements.langToggleBtn.addEventListener("click", () => {
      const newLang = state.lang === "en" ? "hi" : "en";
      applyLanguage(newLang);
      showToast(newLang === "hi" ? "भाषा बदलकर हिन्दी कर दी गई है" : "Language switched to English");
    });

    // Mobile Navigation Menu Toggle
    elements.mobileMenuBtn.addEventListener("click", () => {
      const isOpen = elements.navMenu.classList.toggle("open");
      elements.mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile nav when clicking a link
    elements.navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        elements.navMenu.classList.remove("open");
        elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Income preset buttons
    elements.presetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-income");
        elements.inputIncome.value = val;
        elements.inputIncome.classList.remove("is-invalid");
      });
    });

    // Quick fill sample profiles
    elements.btnFillFarmer.addEventListener("click", fillSampleFarmerProfile);
    elements.btnFillStudent.addEventListener("click", fillSampleStudentProfile);

    // Form Reset
    elements.btnResetForm.addEventListener("click", () => {
      clearFormValidationErrors();
      state.lastEvaluatedResult = null;
      elements.resultsDisplay.style.display = "none";
    });

    // Form Submit
    elements.eligibilityForm.addEventListener("submit", handleFormSubmit);

    // Result filter tabs
    elements.resultTabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        elements.resultTabButtons.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        state.activeResultFilter = btn.getAttribute("data-filter");
        renderEvaluatedResultsCards();
      });
    });

    // Print / PDF Report
    elements.btnPrintReport.addEventListener("click", () => {
      window.print();
    });

    // Modify Details Button
    elements.btnModifyDetails.addEventListener("click", () => {
      elements.eligibilityForm.scrollIntoView({ behavior: "smooth", block: "start" });
      elements.inputAge.focus();
    });

    // Explore Search Input
    elements.exploreSearchInput.addEventListener("input", (e) => {
      state.exploreSearchQuery = e.target.value.trim().toLowerCase();
      renderExploreSchemes();
    });

    // Contact form submit
    elements.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      elements.contactSuccessBox.style.display = "block";
      showToast(state.lang === "hi" ? "संदेश सफलतापूर्वक भेजा गया!" : "Message sent successfully!");
      elements.contactForm.reset();
    });

    // Modal tabs
    elements.modalTabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        elements.modalTabButtons.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        elements.modalPanes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const tabKey = btn.getAttribute("data-tab");
        const pane = document.getElementById(`pane-${tabKey}`);
        if (pane) pane.classList.add("active");
      });
    });

    // Modal close
    elements.modalBtnClose.addEventListener("click", closeModal);
    elements.modalBtnDismiss.addEventListener("click", closeModal);
    elements.modalOverlay.addEventListener("click", (e) => {
      if (e.target === elements.modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.modalOverlay.classList.contains("open")) {
        closeModal();
      }
    });
  }

  /**
   * Sample Profile: Farmer Ramesh Kumar
   */
  function fillSampleFarmerProfile() {
    clearFormValidationErrors();
    elements.inputName.value = "Ramesh Kumar";
    elements.inputAge.value = "42";
    elements.selectGender.value = "Male";
    elements.selectState.value = "Uttar Pradesh";
    elements.selectCategory.value = "OBC";
    elements.selectOccupation.value = "Farmer";
    elements.inputIncome.value = "180000";
    elements.selectEducation.value = "10th Pass";
    elements.selectTechnical.value = "false";
    showToast(state.lang === "hi" ? "किसान का नमूना प्रोफाइल लोड किया गया" : "Farmer sample profile loaded");
  }

  /**
   * Sample Profile: Technical Student Priya Sharma
   */
  function fillSampleStudentProfile() {
    clearFormValidationErrors();
    elements.inputName.value = "Priya Sharma";
    elements.inputAge.value = "19";
    elements.selectGender.value = "Female";
    elements.selectState.value = "Maharashtra";
    elements.selectCategory.value = "General";
    elements.selectOccupation.value = "Student";
    elements.inputIncome.value = "450000";
    elements.selectEducation.value = "12th Pass";
    elements.selectTechnical.value = "true";
    showToast(state.lang === "hi" ? "छात्रा का नमूना प्रोफाइल लोड किया गया" : "Student sample profile loaded");
  }

  /**
   * Clears form validation errors
   */
  function clearFormValidationErrors() {
    const inputs = elements.eligibilityForm.querySelectorAll(".is-invalid");
    inputs.forEach(el => el.classList.remove("is-invalid"));
  }

  /**
   * Handles Form Submission and Validation
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    clearFormValidationErrors();

    let isValid = true;

    // Validate Age
    const ageVal = parseInt(elements.inputAge.value, 10);
    if (isNaN(ageVal) || ageVal < 0 || ageVal > 100) {
      elements.inputAge.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Gender
    if (!elements.selectGender.value) {
      elements.selectGender.classList.add("is-invalid");
      isValid = false;
    }

    // Validate State
    if (!elements.selectState.value) {
      elements.selectState.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Category
    if (!elements.selectCategory.value) {
      elements.selectCategory.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Occupation
    if (!elements.selectOccupation.value) {
      elements.selectOccupation.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Income
    const incomeVal = parseFloat(elements.inputIncome.value);
    if (isNaN(incomeVal) || incomeVal < 0) {
      elements.inputIncome.classList.add("is-invalid");
      isValid = false;
    }

    // Validate Education
    if (!elements.selectEducation.value) {
      elements.selectEducation.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      const firstInvalid = elements.eligibilityForm.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      showToast(state.lang === "hi" ? "कृपया सभी आवश्यक फ़ील्ड सही तरीके से भरें।" : "Please complete all required fields correctly.");
      return;
    }

    // Construct profile object
    const userProfile = {
      name: elements.inputName.value.trim() || "Citizen",
      age: ageVal,
      gender: elements.selectGender.value,
      state: elements.selectState.value,
      category: elements.selectCategory.value,
      occupation: elements.selectOccupation.value,
      annualIncome: incomeVal,
      educationLevel: elements.selectEducation.value,
      hasTechnicalDegree: elements.selectTechnical.value === "true"
    };

    // Evaluate using transparent rule-based engine
    const evaluationResults = EligibilityEngine.evaluateAll(userProfile, SCHEMES_DATA);
    state.lastEvaluatedResult = evaluationResults;

    // Render results
    renderEvaluatedResults();

    // Smooth scroll to results
    elements.resultsDisplay.style.display = "block";
    elements.resultsDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(state.lang === "hi" ? "पात्रता मूल्यांकन सफलतापूर्वक पूरा हुआ!" : "Eligibility assessment completed!");
  }

  /**
   * Renders the Evaluation Results Container
   */
  function renderEvaluatedResults() {
    if (!state.lastEvaluatedResult) return;
    const res = state.lastEvaluatedResult;
    const p = res.userProfileSummary;
    const isHi = state.lang === "hi";

    // Summary Card Header
    elements.summaryCitizenName.textContent = isHi 
      ? `${p.name} - नागरिक पात्रता मूल्यांकन`
      : `${p.name}'s Eligibility Assessment`;

    elements.summaryCitizenDemographics.textContent = isHi
      ? `आयु: ${p.age} वर्ष | लिंग: ${p.gender} | श्रेणी: ${p.category} | व्यवसाय: ${p.occupation} | वार्षिक आय: ₹${parseFloat(p.annualIncome).toLocaleString("en-IN")}`
      : `Age: ${p.age} yrs | Gender: ${p.gender} | Category: ${p.category} | Occupation: ${p.occupation} | Income: ₹${parseFloat(p.annualIncome).toLocaleString("en-IN")}`;

    // Metrics
    elements.metricEligibleCount.textContent = res.eligibleCount;
    elements.metricPartialCount.textContent = res.partialCount;
    elements.metricIneligibleCount.textContent = res.ineligibleCount;

    // Badges on tabs
    elements.badgeTabAll.textContent = res.totalEvaluated;
    elements.badgeTabEligible.textContent = res.eligibleCount;
    elements.badgeTabPartial.textContent = res.partialCount;
    elements.badgeTabIneligible.textContent = res.ineligibleCount;

    renderEvaluatedResultsCards();
  }

  /**
   * Renders the filtered scheme cards in the results view
   */
  function renderEvaluatedResultsCards() {
    if (!state.lastEvaluatedResult) return;
    const isHi = state.lang === "hi";
    const container = elements.evaluatedSchemesContainer;
    container.innerHTML = "";

    let schemesToRender = [];
    if (state.activeResultFilter === "eligible") {
      schemesToRender = state.lastEvaluatedResult.eligible;
    } else if (state.activeResultFilter === "partial") {
      schemesToRender = state.lastEvaluatedResult.partial;
    } else if (state.activeResultFilter === "ineligible") {
      schemesToRender = state.lastEvaluatedResult.ineligible;
    } else {
      schemesToRender = state.lastEvaluatedResult.allResults;
    }

    if (schemesToRender.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            ${isHi ? "इस श्रेणी में कोई योजना नहीं मिली।" : "No schemes match the selected filter."}
          </p>
        </div>
      `;
      return;
    }

    schemesToRender.forEach(schemeEval => {
      const schemeOriginal = SCHEMES_DATA.find(s => s.id === schemeEval.schemeId);
      const card = createSchemeCardElement(schemeEval, schemeOriginal, true);
      container.appendChild(card);
    });
  }

  /**
   * Renders Category Filter Chips in Explore Section
   */
  function renderExploreCategoryChips() {
    elements.exploreCategoryChips.innerHTML = "";
    const isHi = state.lang === "hi";

    SCHEME_CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `chip-btn ${state.activeExploreCategory === cat.id ? "active" : ""}`;
      btn.setAttribute("data-cat", cat.id);
      btn.innerHTML = `<span>${cat.icon}</span> <span>${isHi ? cat.labelHi : cat.labelEn}</span>`;
      
      btn.addEventListener("click", () => {
        state.activeExploreCategory = cat.id;
        renderExploreCategoryChips();
        renderExploreSchemes();
      });

      elements.exploreCategoryChips.appendChild(btn);
    });
  }

  /**
   * Renders all schemes in the Explore Section
   */
  function renderExploreSchemes() {
    const isHi = state.lang === "hi";
    const container = elements.exploreSchemesContainer;
    container.innerHTML = "";

    const query = state.exploreSearchQuery;
    const cat = state.activeExploreCategory;

    const filtered = SCHEMES_DATA.filter(s => {
      // Category filter
      if (cat !== "all" && s.category !== cat) return false;

      // Text search
      if (query) {
        const titleEn = s.nameEn.toLowerCase();
        const titleHi = s.nameHi.toLowerCase();
        const descEn = s.shortDescriptionEn.toLowerCase();
        const descHi = s.shortDescriptionHi.toLowerCase();
        const ministryEn = s.ministryEn.toLowerCase();
        const ministryHi = s.ministryHi.toLowerCase();

        return (
          titleEn.includes(query) ||
          titleHi.includes(query) ||
          descEn.includes(query) ||
          descHi.includes(query) ||
          ministryEn.includes(query) ||
          ministryHi.includes(query)
        );
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            ${isHi ? "खोजे गए शब्दों से कोई योजना नहीं मिली। कृपया कोई अन्य कीवर्ड आज़माएं।" : "No schemes found matching your search. Try adjusting your query or category filter."}
          </p>
        </div>
      `;
      return;
    }

    filtered.forEach(s => {
      // Create non-evaluated card or evaluate against generic profile
      const card = createSchemeCardElement(null, s, false);
      container.appendChild(card);
    });
  }

  /**
   * Creates a modern scheme card DOM element
   * @param {Object|null} evalResult - Evaluation details if present
   * @param {Object} scheme - Base scheme object
   * @param {boolean} isEvaluationMode - Whether card is shown in Results or Explore view
   */
  function createSchemeCardElement(evalResult, scheme, isEvaluationMode) {
    const isHi = state.lang === "hi";
    const card = document.createElement("article");
    card.className = "scheme-card";

    const schemeName = isHi ? scheme.nameHi : scheme.nameEn;
    const ministry = isHi ? scheme.ministryHi : scheme.ministryEn;
    const desc = isHi ? scheme.shortDescriptionHi : scheme.shortDescriptionEn;
    const benefits = isHi ? scheme.benefitsSummaryHi : scheme.benefitsSummaryEn;
    const categoryLabel = isHi ? scheme.categoryLabelHi : scheme.categoryLabelEn;
    const isBookmarked = state.bookmarkedSchemeIds.includes(scheme.id);

    // Status Badge & Meter HTML (if evaluated)
    let statusBadgeHtml = "";
    let meterHtml = "";

    if (isEvaluationMode && evalResult) {
      const badgeClass = evalResult.badgeClass;
      const statusText = isHi ? evalResult.statusLabelHi : evalResult.statusLabelEn;
      const score = evalResult.matchPercentage;
      
      let meterColor = "fill-green";
      let statusIcon = "✓";
      if (evalResult.status === "POSSIBLE_MATCH" || evalResult.status === "PARTIALLY_ELIGIBLE") {
        meterColor = "fill-amber";
        statusIcon = "⚠️";
      } else if (evalResult.status === "NOT_ELIGIBLE") {
        meterColor = "fill-red";
        statusIcon = "✕";
      }

      statusBadgeHtml = `
        <span class="status-badge ${badgeClass}">
          <span aria-hidden="true">${statusIcon}</span>
          <span>${statusText}</span>
        </span>
      `;

      meterHtml = `
        <div class="match-meter-container">
          <div class="meter-header">
            <span>${isHi ? "नियम मिलान स्कोर" : "Criteria Match Score"}</span>
            <strong>${score}% (${evalResult.passedCriteriaCount}/${evalResult.totalCriteriaCount} ${isHi ? "सफल" : "passed"})</strong>
          </div>
          <div class="meter-bar">
            <div class="meter-fill ${meterColor}" style="width: ${score}%;"></div>
          </div>
        </div>
      `;
    } else {
      statusBadgeHtml = `
        <span class="status-badge" style="background: var(--bg-surface-alt); color: var(--text-muted);">
          <span>${scheme.level}</span>
        </span>
      `;
    }

    card.innerHTML = `
      <div class="scheme-card-header">
        <div class="card-top-row">
          <span class="sector-chip">${categoryLabel}</span>
          ${statusBadgeHtml}
        </div>
        <h3 class="scheme-card-title">${schemeName}</h3>
        <p class="scheme-ministry">${ministry}</p>
      </div>

      <div class="scheme-card-body">
        <p class="scheme-desc">${desc}</p>
        
        <div class="card-benefit-box">
          <div class="card-benefit-label">${isHi ? "मुख्य लाभ" : "Key Benefits"}</div>
          <div class="card-benefit-text">${benefits}</div>
        </div>

        ${meterHtml}
      </div>

      <div class="scheme-card-footer">
        <button type="button" class="btn-card-details" data-scheme-id="${scheme.id}">
          <span>${isHi ? "विवरण एवं पात्रता जांचें" : "View Breakdown"}</span>
        </button>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button type="button" class="btn-card-details btn-bookmark-toggle" data-bookmark-id="${scheme.id}" title="${isBookmarked ? (isHi ? "सहेजा गया" : "Saved") : (isHi ? "सहेजें" : "Save Scheme")}">
            <span>${isBookmarked ? "★" : "☆"}</span>
          </button>
          
          <a href="${scheme.officialPortalUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-apply" title="${isHi ? "आधिकारिक सरकारी पोर्टल खोलें" : "Open official Government portal"}">
            <span>${isHi ? "पोर्टल" : "Apply"}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    `;

    // Bind Details Modal click
    const detailsBtn = card.querySelector(`[data-scheme-id="${scheme.id}"]`);
    detailsBtn.addEventListener("click", () => {
      showSchemeDetailModal(scheme.id);
    });

    // Bind Bookmark click
    const bookmarkBtn = card.querySelector(`[data-bookmark-id="${scheme.id}"]`);
    bookmarkBtn.addEventListener("click", () => {
      toggleBookmark(scheme.id, bookmarkBtn);
    });

    return card;
  }

  /**
   * Toggles bookmark state for a scheme
   */
  function toggleBookmark(schemeId, buttonEl) {
    const isHi = state.lang === "hi";
    const idx = state.bookmarkedSchemeIds.indexOf(schemeId);

    if (idx > -1) {
      state.bookmarkedSchemeIds.splice(idx, 1);
      buttonEl.innerHTML = "<span>☆</span>";
      showToast(isHi ? "योजना बुकमार्क से हटा दी गई" : "Scheme removed from saved list");
    } else {
      state.bookmarkedSchemeIds.push(schemeId);
      buttonEl.innerHTML = "<span>★</span>";
      showToast(isHi ? "योजना सफलतापूर्वक सहेज ली गई!" : "Scheme saved to bookmarks!");
    }

    localStorage.setItem("schemeai_bookmarks", JSON.stringify(state.bookmarkedSchemeIds));
  }

  /**
   * Displays the detailed criteria match modal dialog
   */
  function showSchemeDetailModal(schemeId) {
    const isHi = state.lang === "hi";
    const scheme = SCHEMES_DATA.find(s => s.id === schemeId);
    if (!scheme) return;

    state.activeModalSchemeId = schemeId;

    elements.modalSchemeTitle.textContent = isHi ? scheme.nameHi : scheme.nameEn;
    elements.modalSchemeMinistry.textContent = isHi ? scheme.ministryHi : scheme.ministryEn;
    elements.modalLinkOfficial.href = scheme.officialPortalUrl;

    // Evaluation breakdown
    elements.modalCriteriaContainer.innerHTML = "";
    
    // Evaluate scheme if user submitted profile, or evaluate with current form state
    let evalOutcome = null;
    if (state.lastEvaluatedResult) {
      evalOutcome = state.lastEvaluatedResult.allResults.find(r => r.schemeId === schemeId);
    } else {
      // Evaluate against current values or default
      const tempProfile = {
        name: elements.inputName.value || "Citizen",
        age: parseInt(elements.inputAge.value, 10) || 25,
        gender: elements.selectGender.value || "All",
        state: elements.selectState.value || "All States / Union Territories",
        category: elements.selectCategory.value || "General",
        occupation: elements.selectOccupation.value || "Other",
        annualIncome: parseFloat(elements.inputIncome.value) || 200000,
        educationLevel: elements.selectEducation.value || "12th Pass",
        hasTechnicalDegree: elements.selectTechnical.value === "true"
      };
      evalOutcome = EligibilityEngine.evaluateScheme(tempProfile, scheme);
    }

    // Render Criteria Rows
    evalOutcome.criteriaResults.forEach(c => {
      const row = document.createElement("div");
      let icon = "✅";
      let badgeText = isHi ? "सफल" : "Satisfied";
      let badgeClass = "badge-pass";
      let rowClass = "pass";

      if (c.status === "unverified") {
        icon = "⚠️";
        badgeText = isHi ? "अपुष्ट / जानकारी आवश्यक" : "Needs Info";
        badgeClass = "badge-unverified";
        rowClass = "unverified";
      } else if (c.status === "fail") {
        icon = "❌";
        badgeText = isHi ? "असफल" : "Unmet";
        badgeClass = "badge-fail";
        rowClass = "fail";
      }

      row.className = `criteria-row ${rowClass}`;
      const criterionName = isHi ? c.nameHi : c.nameEn;
      const reason = isHi ? c.reasonHi : c.reasonEn;

      row.innerHTML = `
        <div class="criteria-icon" aria-hidden="true">${icon}</div>
        <div class="criteria-info">
          <div class="criteria-title-row">
            <span class="criteria-name">${criterionName}</span>
            <span class="criteria-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="criteria-details">${reason}</div>
          <div class="criteria-values">
            <span class="criteria-val-tag">${isHi ? "आपका विवरण:" : "Your Input:"} <strong>${c.userValue}</strong></span>
            <span class="criteria-val-tag">${isHi ? "सरकारी नियम:" : "Official Rule:"} <strong>${c.ruleValue}</strong></span>
          </div>
        </div>
      `;

      elements.modalCriteriaContainer.appendChild(row);
    });

    // Render Documents Checklist
    elements.modalDocsContainer.innerHTML = "";
    const docs = isHi ? scheme.documentsRequiredHi : scheme.documentsRequiredEn;
    docs.forEach(doc => {
      const li = document.createElement("li");
      li.className = "doc-item";
      li.innerHTML = `<span class="doc-icon" aria-hidden="true">📄</span> <span>${doc}</span>`;
      elements.modalDocsContainer.appendChild(li);
    });

    // Render Disqualifiers
    elements.modalDisqualifiersContainer.innerHTML = "";
    const disqualifiers = scheme.rules.disqualifiers || [];
    if (disqualifiers.length === 0) {
      elements.modalDisqualifiersContainer.innerHTML = `<li>${isHi ? "कोई विशिष्ट अपात्रता शर्त नहीं।" : "No explicit negative list specified."}</li>`;
    } else {
      disqualifiers.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d;
        elements.modalDisqualifiersContainer.appendChild(li);
      });
    }

    // Render Authority & Application Cycle
    if (elements.modalSourceAndDeadlineText) {
      const deadline = isHi 
        ? (scheme.applicationDeadlineHi || "आधिकारिक पोर्टल पर पूरे वित्तीय वर्ष आवेदन खुला रहता है।")
        : (scheme.applicationDeadlineEn || "Continuous open enrollment across the financial year on the official portal.");
      const source = isHi
        ? (scheme.officialSourceAuthority || "भारत सरकार आधिकारिक पोर्टल दिशानिर्देश")
        : (scheme.officialSourceAuthority || "Government of India Official Portal Guidelines");
      elements.modalSourceAndDeadlineText.innerHTML = `<strong>${isHi ? "स्रोत:" : "Source:"}</strong> ${source} (${scheme.officialPortalUrl})<br><strong>${isHi ? "आवेदन चक्र:" : "Cycle:"}</strong> ${deadline}`;
    }

    // Default to Criteria tab
    elements.modalTabButtons[0].click();

    // Show modal
    elements.modalOverlay.classList.add("open");
    elements.modalBtnClose.focus();
  }

  /**
   * Closes the detailed modal dialog
   */
  function closeModal() {
    elements.modalOverlay.classList.remove("open");
    state.activeModalSchemeId = null;
  }

  /**
   * Displays temporary toast notification
   */
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // Start app on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }


  // Register the service worker for PWA support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .catch((error) => {
          console.error("SchemeAI service worker registration failed:", error);
        });
    });
  }

})();