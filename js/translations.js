/**
 * SchemeAI - Complete English & Hindi Localization Dictionary
 */

const TRANSLATIONS = {
  en: {
    // Navigation
    navBrand: "SchemeAI",
    navTagline: "India Gov Scheme Eligibility Checker",
    navHome: "Home",
    navChecker: "Check Eligibility",
    navExplore: "Explore Schemes",
    navFeatures: "Features",
    navAbout: "About",
    navContact: "Contact",
    btnStartChecking: "Start Checking Eligibility",
    btnExploreAll: "Browse All Schemes",
    btnLanguage: "हिन्दी",
    btnInstallApp: "Install App",
    offlineNotice: "Offline Mode: Showing cached scheme guidelines. Connect to the internet to ensure you are checking against the latest official rules. Eligibility cannot be confirmed while offline.",
    offlineResultsWarning: "⚠️ Generated while offline using cached rules. Please connect to the internet to verify current official government guidelines.",

    // Hero Section
    heroBadge: "🇮🇳 Free Public Citizen Service · 100% Free · No Registration Required",
    heroTitle: "Find Government Schemes You Are Actually Eligible For",
    heroSubtitle: "Navigating India's welfare landscape can be overwhelming. SchemeAI uses transparent, rule-based matching to instantly show you verified welfare schemes, benefits, documents needed, and direct official application portals.",
    heroStat1: "12+ Verified Schemes",
    heroStat2: "100% Rule Transparency",
    heroStat3: "Zero Data Stored",
    heroStat4: "Official Gov Portals",
    liveShowcaseTitle: "Live Schemes Showcase",

    // Sample notice
    sampleDataNotice: "Sample Data Notice: All schemes displayed are verified samples modeled on real Government of India guidelines. No government authority endorsement is implied.",

    // Eligibility Checker Form
    checkerHeading: "Citizen Eligibility Assessment",
    checkerSubtitle: "Enter your demographic and economic details below. Our transparent engine checks your profile against official scheme criteria in real time without sending your personal data to any external server.",
    txtTrySampleProfiles: "⚡ Try Sample Profiles:",
    btnFillSample: "Fill Sample Profile (Farmer)",
    btnFillSampleStudent: "Fill Sample Profile (Student)",

    labelName: "Full Name (Optional)",
    placeholderName: "e.g. Ramesh Kumar",
    helpName: "Used only to personalize your eligibility report.",

    labelAge: "Age (in years)*",
    placeholderAge: "e.g. 28",
    helpAge: "Must be a valid age between 0 and 100.",

    labelGender: "Gender*",
    optSelectGender: "-- Select Gender --",
    optFemale: "Female",
    optMale: "Male",
    optTransgender: "Transgender / Other",

    labelState: "State / Union Territory*",
    optSelectState: "-- Select State / UT --",

    labelCategory: "Social Category*",
    optSelectCategory: "-- Select Category --",
    optGeneral: "General (Open)",
    optOBC: "OBC (Other Backward Class)",
    optSC: "SC (Scheduled Caste)",
    optST: "ST (Scheduled Tribe)",
    optEWS: "EWS (Economically Weaker Section)",

    labelOccupation: "Current Occupation*",
    optSelectOccupation: "-- Select Occupation --",
    optFarmer: "Farmer / Agriculture",
    optStudent: "Student",
    optSelfEmployed: "Self-Employed / Entrepreneur",
    optSalaried: "Salaried Employee",
    optDailyWage: "Daily Wage / Informal Worker",
    optUnemployed: "Unemployed Youth",
    optHomemaker: "Homemaker",
    optOtherOcc: "Other / Gig Worker",

    labelIncome: "Annual Family Income (in ₹ INR)*",
    placeholderIncome: "e.g. 180000",
    helpIncome: "Total gross family income per year before taxes.",
    incomePreset1: "< ₹1.5 Lakh",
    incomePreset2: "< ₹2.5 Lakh",
    incomePreset3: "< ₹5.0 Lakh",
    incomePreset4: "< ₹8.0 Lakh",

    labelEducation: "Highest Education Level*",
    optSelectEducation: "-- Select Education Level --",
    optEduNone: "None / Below 10th",
    optEdu10th: "10th Pass",
    optEdu12th: "12th Pass",
    optEduDiploma: "Diploma / ITI",
    optEduGraduate: "Graduate (B.A., B.Sc., B.Com., etc.)",
    optEduPostGraduate: "Post-Graduate or Higher",

    labelTechnicalDegree: "Enrolled in or holds an AICTE/UGC Technical Degree / Diploma?*",
    optTechNo: "No (General / Humanities / Commerce)",
    optTechYes: "Yes (Engineering, Technology, Polytechnic)",

    btnCheckNow: "Check My Scheme Eligibility",
    btnResetForm: "Reset Form",

    // Form errors
    errRequired: "This field is required.",
    errAgeRange: "Please enter a valid age between 0 and 100.",
    errGender: "Please select your gender.",
    errState: "Please select your state or union territory.",
    errCategory: "Please select your social category.",
    errOccupation: "Please select your primary occupation.",
    errIncomeValid: "Please enter a valid positive income figure (₹0 or greater).",
    errEducation: "Please select your education qualification.",
    errTechnical: "Please select technical degree status.",

    // Results Section
    resultsHeading: "Eligibility Evaluation Results",
    resultsSubtitle: "Based on the details provided, here is your transparent scheme-by-scheme breakdown.",
    preliminaryDisclaimerTitle: "Preliminary Assessment Notice",
    preliminaryDisclaimerText: "This eligibility assessment is calculated purely using transparent rule-based logic matching your self-declared details against official scheme guidelines. SchemeAI does not guarantee benefits; formal eligibility, scrutiny of genuine documents, and final sanction are determined solely by the competent Government department upon formal application.",
    tagEligibleCount: "Likely Eligible",
    tagPartialCount: "Possible / Needs Info",
    tagIneligibleCount: "Non-Match (Ineligible)",
    btnPrintReport: "Print / Save PDF Report",
    btnEditDetails: "Modify Details",
    filterTabAll: "All Schemes",
    filterTabEligible: "Likely Eligible",
    filterTabPartial: "Possible Match (Needs Info)",
    filterTabIneligible: "Non-Match (Ineligible)",

    // Card Details
    cardMinistry: "Ministry",
    cardBenefits: "Key Benefits",
    cardMatchScore: "Criteria Match Score",
    btnViewReasons: "View Breakdown",
    btnApplyOfficial: "Official Application Portal",
    btnBookmark: "Save Scheme",
    btnBookmarked: "Saved",

    // Modal
    modalTitle: "Detailed Scheme Match Analysis",
    modalCriteriaTab: "Why This Matches / Fails",
    modalDocumentsTab: "Documents Required",
    modalDisqualifiersTab: "Disqualifiers & Rules",
    disqualifiersHeading: "Key Disqualification Conditions:",
    authorityNoticeTitle: "Authoritative Source & Application Timeline:",
    modalClose: "Close",
    mandatoryBadge: "Mandatory Criterion",
    criteriaSatisfied: "Satisfied",
    criteriaUnmet: "Unmet",
    criteriaUnverified: "Needs Info / Unverified",
    yourInputLabel: "Your Input:",
    officialRuleLabel: "Official Rule:",

    // Explore Section
    exploreHeading: "Explore All Central Government Schemes",
    exploreSubtitle: "Browse our curated repository of verified flagship schemes across Agriculture, Healthcare, Education, and Welfare.",
    searchPlaceholder: "Search by scheme name, keyword (e.g. loan, scholarship, farmer)...",
    filterAllCategories: "All Sectors",

    // Features Section
    featHeading: "Why SchemeAI?",
    featSubtitle: "Empowering citizens with explainable, accessible public scheme discovery.",
    feat1Title: "100% Rule Transparency",
    feat1Desc: "No opaque or fabricated AI outputs. Every recommendation clearly displays the exact rule condition, your entered detail, and why it passed or failed.",
    feat2Title: "No User Tracking / 100% Free",
    feat2Desc: "No phone OTPs, no passwords, no fee. Evaluation runs entirely inside your browser, keeping your sensitive economic data confidential.",
    feat3Title: "Authentic Official Portals",
    feat3Desc: "Direct outbound links to verified .gov.in, .nic.in, and .org.in official portals. Never fall prey to fake intermediaries or scam agents.",
    feat4Title: "Bilingual Experience",
    feat4Desc: "Easily switch between English and Hindi at any time with a single click without losing your active form details.",

    // About Section
    aboutHeading: "About SchemeAI Initiative",
    aboutText1: "SchemeAI is an independent citizen-centric project built to bridge the awareness gap between eligible Indian beneficiaries and public welfare schemes.",
    aboutText2: "Every year, thousands of crores in public welfare funds remain underutilized because deserving citizens are unaware of schemes or find eligibility rules convoluted. SchemeAI translates complex ministerial criteria into a simple, actionable digital checker.",
    legalDisclaimerTitle: "Statutory Disclaimer",
    legalDisclaimerText: "SchemeAI is a public informational tool. It is NOT affiliated with, authorized by, or an official service of the Government of India or any State Government. Final eligibility, entitlement, and sanction of any scheme are decided exclusively by the competent designated statutory authorities upon formal submission of required applications and authentic documentation.",

    // Contact Section
    contactHeading: "Contact & Citizen Helpdesk",
    contactSubtitle: "Have questions, suggestions, or want to report an updated scheme guideline?",
    contactName: "Your Name",
    contactEmail: "Email Address",
    contactSubject: "Subject / Scheme Inquiry",
    contactMessage: "Your Message",
    btnSendMessage: "Submit Message",
    contactSuccess: "Thank you for reaching out! In a live environment, your inquiry is routed to our volunteer support team.",
    helplinesTitle: "National Citizen Helplines",
    helpline1: "National Consumer Helpline: 1915 / 1800-11-4000",
    helpline2: "Ayushman Bharat National Call Centre: 14555",
    helpline3: "Kisan Call Centre: 1800-180-1551",
    helpline4: "Cyber Fraud Helpline: 1930",

    // Footer
    footerTagline: "Transparent Public Scheme Discovery for a Self-Reliant India (AtmaNirbhar Bharat).",
    footerCopy: "Built with standard Open Web Technologies (HTML, CSS, JS). Free & Open Access.",
    footerBackToTop: "Back to Top ↑"
  },

  hi: {
    // Navigation
    navBrand: "SchemeAI",
    navTagline: "भारत सरकार योजना पात्रता चेकर",
    navHome: "होम",
    navChecker: "पात्रता जांचें",
    navExplore: "योजनाएं खोजें",
    navFeatures: "विशेषताएं",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    btnStartChecking: "पात्रता की जांच शुरू करें",
    btnExploreAll: "सभी योजनाएं देखें",
    btnLanguage: "English",
    btnInstallApp: "ऐप इंस्टॉल करें",
    offlineNotice: "ऑफलाइन मोड: कैश्ड योजना दिशानिर्देश दिखाए जा रहे हैं। नवीनतम आधिकारिक नियमों से जांचने के लिए कृपया इंटरनेट से जुड़ें। ऑफलाइन होने पर पात्रता की पुष्टि नहीं की जा सकती।",
    offlineResultsWarning: "⚠️ ऑफलाइन रहते हुए कैश्ड नियमों से निर्मित। वर्तमान आधिकारिक सरकारी दिशानिर्देशों को सत्यापित करने के लिए कृपया इंटरनेट से जुड़ें।",

    // Hero Section
    heroBadge: "🇮🇳 निःशुल्क नागरिक सेवा · 100% मुफ्त · किसी पंजीकरण की आवश्यकता नहीं",
    heroTitle: "उन सरकारी योजनाओं को खोजें जिनके आप वास्तव में पात्र हैं",
    heroSubtitle: "भारत की कल्याणकारी योजनाओं को समझना अब और भी आसान। SchemeAI पारदर्शी, नियम-आधारित तकनीक का उपयोग करके आपको सत्यापित योजनाएं, लाभ, आवश्यक दस्तावेज और आधिकारिक आवेदन पोर्टल तुरंत दिखाता है।",
    heroStat1: "12+ सत्यापित योजनाएं",
    heroStat2: "100% नियम पारदर्शिता",
    heroStat3: "शून्य डेटा संग्रह",
    heroStat4: "सत्यापित सरकारी पोर्टल",
    liveShowcaseTitle: "सक्रिय योजनाएं प्रदर्शन",

    // Sample notice
    sampleDataNotice: "नमूना डेटा सूचना: प्रदर्शित सभी योजनाएं वास्तविक भारत सरकार के दिशानिर्देशों पर आधारित सत्यापित नमूने हैं। किसी सरकारी प्राधिकरण के संबद्ध होने का दावा नहीं है।",

    // Eligibility Checker Form
    checkerHeading: "नागरिक पात्रता मूल्यांकन",
    checkerSubtitle: "नीचे अपनी जनसांख्यिकीय और आर्थिक जानकारी दर्ज करें। हमारा पारदर्शी इंजन आपके डेटा को किसी बाहरी सर्वर पर भेजे बिना वास्तविक समय में आधिकारिक मानदंडों से मिलान करता है।",
    txtTrySampleProfiles: "⚡ नमूना प्रोफ़ाइल आज़माएं:",
    btnFillSample: "नमूना प्रोफ़ाइल भरें (किसान)",
    btnFillSampleStudent: "नमूना प्रोफ़ाइल भरें (छात्रा)",

    labelName: "पूरा नाम (वैकल्पिक)",
    placeholderName: "उदा. रमेश कुमार",
    helpName: "केवल आपकी रिपोर्ट को वैयक्तिकृत करने के लिए उपयोग किया जाता है।",

    labelAge: "आयु (वर्षों में)*",
    placeholderAge: "उदा. 28",
    helpAge: "0 से 100 के बीच एक मान्य आयु दर्ज करें।",

    labelGender: "लिंग*",
    optSelectGender: "-- लिंग चुनें --",
    optFemale: "महिला",
    optMale: "पुरुष",
    optTransgender: "ट्रांसजेंडर / अन्य",

    labelState: "राज्य / केंद्र शासित प्रदेश*",
    optSelectState: "-- राज्य चुनें --",

    labelCategory: "सामाजिक श्रेणी*",
    optSelectCategory: "-- श्रेणी चुनें --",
    optGeneral: "सामान्य (General)",
    optOBC: "अन्य पिछड़ा वर्ग (OBC)",
    optSC: "अनुसूचित जाति (SC)",
    optST: "अनुसूचित जनजाति (ST)",
    optEWS: "आर्थिक रूप से कमजोर वर्ग (EWS)",

    labelOccupation: "वर्तमान व्यवसाय*",
    optSelectOccupation: "-- व्यवसाय चुनें --",
    optFarmer: "किसान / कृषि",
    optStudent: "विद्यार्थी (छात्र)",
    optSelfEmployed: "स्वरोजगार / उद्यमी",
    optSalaried: "वेतनभोगी कर्मचारी",
    optDailyWage: "दैनिक वेतनभोगी / अनौपचारिक श्रमिक",
    optUnemployed: "बेरोजगार युवा",
    optHomemaker: "गृहिणी",
    optOtherOcc: "अन्य / गिग वर्कर",

    labelIncome: "वार्षिक पारिवारिक आय (₹ रुपये में)*",
    placeholderIncome: "उदा. 180000",
    helpIncome: "कर से पूर्व कुल पारिवारिक वार्षिक आय।",
    incomePreset1: "< ₹1.5 लाख",
    incomePreset2: "< ₹2.5 लाख",
    incomePreset3: "< ₹5.0 लाख",
    incomePreset4: "< ₹8.0 लाख",

    labelEducation: "उच्चतम शैक्षणिक योग्यता*",
    optSelectEducation: "-- शैक्षणिक स्तर चुनें --",
    optEduNone: "कोई नहीं / 10वीं से कम",
    optEdu10th: "10वीं उत्तीर्ण",
    optEdu12th: "12वीं उत्तीर्ण",
    optEduDiploma: "डिप्लोमा / आईटीआई",
    optEduGraduate: "स्नातक (बी.ए., बी.एससी., बी.कॉम आदि)",
    optEduPostGraduate: "स्नातकोत्तर या उच्चतर",

    labelTechnicalDegree: "क्या आपके पास एआईसीटीई/यूजीसी अनुमोदित तकनीकी डिग्री/डिप्लोमा है?*",
    optTechNo: "नहीं (सामान्य / कला / वाणिज्य)",
    optTechYes: "हाँ (इंजीनियरिंग, तकनीकी, पॉलिटेक्निक)",

    btnCheckNow: "मेरी पात्रता की जांच करें",
    btnResetForm: "फॉर्म रीसेट करें",

    // Form errors
    errRequired: "यह जानकारी भरना अनिवार्य है।",
    errAgeRange: "कृपया 0 से 100 के बीच एक मान्य आयु दर्ज करें।",
    errGender: "कृपया अपना लिंग चुनें।",
    errState: "कृपया अपना राज्य या केंद्र शासित प्रदेश चुनें।",
    errCategory: "कृपया अपनी सामाजिक श्रेणी चुनें।",
    errOccupation: "कृपया अपना प्राथमिक व्यवसाय चुनें।",
    errIncomeValid: "कृपया एक वैध धनात्मक आय राशि दर्ज करें (₹0 या अधिक)।",
    errEducation: "कृपया अपनी शैक्षणिक योग्यता चुनें।",
    errTechnical: "कृपया तकनीकी डिग्री की स्थिति चुनें।",

    // Results Section
    resultsHeading: "पात्रता मूल्यांकन परिणाम",
    resultsSubtitle: "आपके द्वारा दी गई जानकारी के आधार पर विस्तृत एवं पारदर्शी योजना-वार विवरण नीचे दिया गया है।",
    preliminaryDisclaimerTitle: "प्रारंभिक मूल्यांकन सूचना",
    preliminaryDisclaimerText: "यह पात्रता मूल्यांकन आपके द्वारा दर्ज विवरण को आधिकारिक योजना दिशानिर्देशों के साथ पारदर्शी नियम-आधारित मिलान द्वारा तैयार किया गया है। SchemeAI किसी लाभ की गारंटी नहीं देता है; अंतिम पात्रता, वास्तविक दस्तावेजों की जांच और स्वीकृति केवल संबंधित सरकारी विभाग द्वारा औपचारिक आवेदन पर निर्धारित की जाती है।",
    tagEligibleCount: "संभावित रूप से पात्र",
    tagPartialCount: "संभावित / अपुष्ट",
    tagIneligibleCount: "फिलहाल अपात्र",
    btnPrintReport: "रिपोर्ट प्रिंट / पीडीएफ सहेजें",
    btnEditDetails: "जानकारी बदलें",
    filterTabAll: "सभी योजनाएं",
    filterTabEligible: "संभावित पात्र",
    filterTabPartial: "संभावित मेल (जानकारी आवश्यक)",
    filterTabIneligible: "अपात्र",

    // Card Details
    cardMinistry: "मंत्रालय",
    cardBenefits: "मुख्य लाभ",
    cardMatchScore: "मानदंड मिलान स्कोर",
    btnViewReasons: "विवरण एवं पात्रता जांचें",
    btnApplyOfficial: "आधिकारिक आवेदन पोर्टल",
    btnBookmark: "योजना सहेजें",
    btnBookmarked: "सहेजा गया",

    // Modal
    modalTitle: "विस्तृत योजना मिलान विश्लेषण",
    modalCriteriaTab: "पात्रता विश्लेषण (सफल / असफल)",
    modalDocumentsTab: "आवश्यक दस्तावेज",
    modalDisqualifiersTab: "अपात्रता शर्तें एवं नियम",
    disqualifiersHeading: "प्रमुख अपात्रता शर्तें:",
    authorityNoticeTitle: "आधिकारिक स्रोत एवं आवेदन समय-सीमा:",
    modalClose: "बंद करें",
    mandatoryBadge: "अनिवार्य मानदंड",
    criteriaSatisfied: "सफल",
    criteriaUnmet: "असफल",
    criteriaUnverified: "अपुष्ट / जानकारी आवश्यक",
    yourInputLabel: "आपका विवरण:",
    officialRuleLabel: "सरकारी नियम:",

    // Explore Section
    exploreHeading: "सभी केंद्र व राज्य सरकारी योजनाएं",
    exploreSubtitle: "कृषि, स्वास्थ्य, शिक्षा और जन कल्याण के प्रमुख कार्यक्रमों की हमारी सत्यापित सूची देखें।",
    searchPlaceholder: "योजना का नाम, कीवर्ड खोजें (उदा. ऋण, छात्रवृत्ति, किसान)...",
    filterAllCategories: "सभी क्षेत्र",

    // Features Section
    featHeading: "SchemeAI क्यों चुनें?",
    featSubtitle: "सुलभ, पारदर्शी और सटीक सार्वजनिक योजनाओं की खोज के लिए नागरिकों का साथी।",
    feat1Title: "100% नियम पारदर्शिता",
    feat1Desc: "कोई अस्पष्ट या मनगढ़ंत परिणाम नहीं। प्रत्येक सिफारिश में स्पष्ट रूप से दिखाया जाता है कि कौन सा नियम पास हुआ और कौन सा फेल।",
    feat2Title: "कोई डेटा ट्रैकिंग नहीं / 100% मुफ्त",
    feat2Desc: "ना फोन ओटीपी, ना पासवर्ड, ना शुल्क। संपूर्ण मूल्यांकन आपके ब्राउज़र में होता है, जिससे आपकी आर्थिक जानकारी निजी रहती है।",
    feat3Title: "सत्यापित आधिकारिक पोर्टल",
    feat3Desc: "केवल .gov.in, .nic.in, और .org.in आधिकारिक पोर्टलों के सीधे लिंक। दलालों या धोखाधड़ी से बचें।",
    feat4Title: "द्विभाषी अनुभव",
    feat4Desc: "एक क्लिक में किसी भी समय अंग्रेजी और हिंदी के बीच स्विच करें।",

    // About Section
    aboutHeading: "SchemeAI पहल के बारे में",
    aboutText1: "SchemeAI एक स्वतंत्र नागरिक-केंद्रित पहल है जो जरूरतमंद नागरिकों और सरकारी योजनाओं के बीच की दूरी को मिटाने के लिए बनाई गई है।",
    aboutText2: "हर साल हजारों करोड़ रुपये का कल्याणकारी बजट इसलिए अप्रयुक्त रह जाता है क्योंकि पात्र नागरिकों को नियमों की सही जानकारी नहीं होती। SchemeAI जटिल दिशानिर्देशों को एक आसान डिजिटल चेकर में बदलता है।",
    legalDisclaimerTitle: "वैधानिक अस्वीकरण",
    legalDisclaimerText: "SchemeAI एक सार्वजनिक सूचनात्मक मंच है। यह भारत सरकार या किसी भी राज्य सरकार का आधिकारिक पोर्टल नहीं है। अंतिम पात्रता, सत्यापन और स्वीकृति केवल संबंधित सरकारी प्राधिकरण द्वारा औपचारिक आवेदन समीक्षा के बाद ही दी जाती है।",

    // Contact Section
    contactHeading: "संपर्क एवं नागरिक सहायता",
    contactSubtitle: "कोई सुझाव है या किसी योजना के बारे में प्रश्न पूछना चाहते हैं?",
    contactName: "आपका नाम",
    contactEmail: "ईमेल पता",
    contactSubject: "विषय / योजना का नाम",
    contactMessage: "आपका संदेश",
    btnSendMessage: "संदेश भेजें",
    contactSuccess: "हमसे संपर्क करने के लिए धन्यवाद! आपकी प्रतिक्रिया हमारे सहायता दल को प्राप्त हो गई है।",
    helplinesTitle: "राष्ट्रीय नागरिक हेल्पलाइन नंबर",
    helpline1: "राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915 / 1800-11-4000",
    helpline2: "आयुष्मान भारत कॉल सेंटर: 14555",
    helpline3: "किसान कॉल सेंटर: 1800-180-1551",
    helpline4: "साइबर वित्तीय धोखाधड़ी हेल्पलाइन: 1930",

    // Footer
    footerTagline: "आत्मनिर्भर भारत के लिए पारदर्शी सरकारी योजना खोज मंच।",
    footerCopy: "ओपन वेब तकनीकों (HTML, CSS, JS) द्वारा निर्मित। पूर्णतः निःशुल्क।",
    footerBackToTop: "शीर्ष पर जाएं ↑"
  }
};

// Export for tests & browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRANSLATIONS };
}
