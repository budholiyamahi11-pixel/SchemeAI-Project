/**
 * SchemeAI - Government Schemes Database
 * 
 * DISCLAIMER & STATUTORY NOTICE:
 * This dataset contains curated sample government schemes verified against official
 * Government of India portals and published ministerial operational guidelines.
 * All portal links correspond to genuine, authorized Government of India (.gov.in, .nic.in,
 * .org.in, or statutory authority) web portals.
 * No government endorsement of this educational tool is implied.
 */

const SCHEMES_DATA = [
  {
    id: "pm-kisan",
    code: "PM-KISAN",
    nameEn: "PM Kisan Samman Nidhi Yojana",
    nameHi: "प्रधानमंत्री किसान सम्मान निधि योजना",
    ministryEn: "Ministry of Agriculture and Farmers Welfare",
    ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
    category: "agriculture",
    categoryLabelEn: "Agriculture & Rural",
    categoryLabelHi: "कृषि एवं ग्रामीण",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://pmkisan.gov.in/",
    officialSourceAuthority: "Department of Agriculture & Farmers Welfare",
    verificationStatus: "Verified against Operational Guidelines (pmkisan.gov.in)",
    applicationCycleEn: "Continuous open enrollment throughout the financial year via Farmer Corner / CSC.",
    applicationCycleHi: "आधिकारिक पोर्टल पर फार्मर कॉर्नर / सीएससी के माध्यम से पूरे वित्तीय वर्ष निरंतर नामांकन सक्रिय।",
    shortDescriptionEn: "Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 to all landholding farmer families.",
    shortDescriptionHi: "सभी पात्र भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता ₹2,000 की तीन समान किस्तों में।",
    fullDescriptionEn: "Under PM-KISAN, financial assistance of ₹6,000 per annum is provided to eligible cultivable landholding farmer families across the country in three equal four-monthly installments of ₹2,000, credited directly into Aadhaar-seeded bank accounts through Direct Benefit Transfer (DBT).",
    fullDescriptionHi: "पीएम-किसान योजना के अंतर्गत देश भर के पात्र भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता चार महीने के अंतराल पर ₹2,000 की तीन समान किस्तों में सीधे आधार से जुड़े बैंक खातों (DBT) में दी जाती है।",
    benefitsSummaryEn: "₹6,000 per year credited directly to Aadhaar-linked bank accounts in 3 instalments of ₹2,000.",
    benefitsSummaryHi: "₹6,000 प्रति वर्ष 3 किस्तों (₹2,000 प्रत्येक) में सीधे आधार-लिंक्ड बैंक खाते में।",
    documentsRequiredEn: [
      "Aadhaar Card (Mandatory)",
      "Land ownership documents / Land Mutation record (Khasra-Khatauni in applicant's name)",
      "Active Aadhaar-seeded Bank Account passbook",
      "Mobile number linked with Aadhaar (for e-KYC)"
    ],
    documentsRequiredHi: [
      "आधार कार्ड (अनिवार्य)",
      "भूमि स्वामित्व दस्तावेज / भू-अभिलेख खसरा-खतौनी (आवेदक के नाम पर)",
      "सक्रिय आधार-लिंक्ड बैंक खाता पासबुक",
      "आधार से जुड़ा मोबाइल नंबर (e-KYC हेतु)"
    ],
    rules: {
      minAge: 18,
      maxAge: 100,
      allowedGenders: ["All"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["Farmer"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Institutional landholders (land held in institutional name)",
        "Present or former holders of constitutional posts",
        "Present or former Ministers, MPs, MLAs, MLCs, Mayors, or District Panchayat Chairpersons",
        "Serving or retired officers and employees of Central/State Govt, PSEs, or Local Bodies (excluding Multi Tasking Staff / Group D)",
        "Superannuated/retired pensioners with monthly pension of ₹10,000 or more",
        "Persons who paid Income Tax in the last assessment year",
        "Professionals (Doctors, Engineers, Lawyers, Chartered Accountants, Architects) practicing with professional councils"
      ]
    }
  },
  {
    id: "pm-jay",
    code: "PM-JAY",
    nameEn: "Ayushman Bharat - PM Jan Arogya Yojana",
    nameHi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    ministryEn: "National Health Authority (Ministry of Health and Family Welfare)",
    ministryHi: "राष्ट्रीय स्वास्थ्य प्राधिकरण (स्वास्थ्य एवं परिवार कल्याण मंत्रालय)",
    category: "healthcare",
    categoryLabelEn: "Healthcare",
    categoryLabelHi: "स्वास्थ्य सेवा",
    level: "Centrally Sponsored",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://beneficiary.nha.gov.in/",
    officialSourceAuthority: "National Health Authority (NHA)",
    verificationStatus: "Verified against NHA Ayushman Bharat Guidelines",
    applicationCycleEn: "Continuous enrollment and Ayushman Card generation via beneficiary.nha.gov.in and Ayushman Arogya Mandirs.",
    applicationCycleHi: "beneficiary.nha.gov.in एवं आयुष्मान आरोग्य मंदिरों के माध्यम से निरंतर आयुष्मान कार्ड निर्माण सक्रिय।",
    shortDescriptionEn: "World's largest health assurance scheme providing health cover of up to ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    shortDescriptionHi: "द्वितीयक और तृतीयक अस्पताल भर्ती के लिए प्रति पात्र परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य कवर प्रदान करने वाली विश्व की सबसे बड़ी योजना।",
    fullDescriptionEn: "Ayushman Bharat PM-JAY provides cashless and paperless hospitalization coverage up to ₹5,00,000 per eligible family per year across 27,000+ empaneled public and private hospitals nationwide. Beneficiary eligibility is identified based on rural deprivation criteria and urban occupational criteria from SECC 2011 and active state food security beneficiary lists.",
    fullDescriptionHi: "आयुष्मान भारत पीएम-जेएवाई गरीब और कमजोर परिवारों को ₹5,00,000 तक कैशलेस अस्पताल भर्ती सुविधा देती है। इसमें 27,000+ पैनलबद्ध अस्पतालों में दवाएं, ऑपरेशन, आईसीयू और 15 दिनों तक का अस्पताल पश्चात खर्च शामिल है।",
    benefitsSummaryEn: "Cashless health cover up to ₹5,00,000 per family per year across 27,000+ empaneled hospitals.",
    benefitsSummaryHi: "27,000+ पैनलबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5,00,000 तक कैशलेस स्वास्थ्य सुरक्षा।",
    documentsRequiredEn: [
      "Aadhaar Card of all family members",
      "Ration Card or State Family ID / SECC confirmation",
      "Registered mobile number linked with Aadhaar"
    ],
    documentsRequiredHi: [
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "राशन कार्ड या राज्य परिवार आईडी / SECC पुष्टि",
      "आधार से जुड़ा पंजीकृत मोबाइल नंबर"
    ],
    rules: {
      minAge: 0,
      maxAge: 100,
      allowedGenders: ["All"],
      maxIncome: 250000,
      allowedCategories: ["All"],
      allowedOccupations: ["Daily Wage / Informal Worker", "Farmer", "Unemployed", "Homemaker", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Households owning motorized 2/3/4 wheeler or mechanized boat",
        "Households owning mechanized three/four wheeler agricultural equipment",
        "Households with Kisan Credit Card with credit limit of ₹50,000 or above",
        "Households with any member as a regular Government salaried employee",
        "Households paying Income Tax or Professional Tax",
        "Households with pucca house having more than 3 rooms"
      ]
    }
  },
  {
    id: "pm-daksh",
    code: "PM-DAKSH",
    nameEn: "PM-DAKSH (Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi)",
    nameHi: "प्रधानमंत्री दक्ष योजना (दक्षता और कुशलता संपन्न हितग्राही)",
    ministryEn: "Ministry of Social Justice and Empowerment",
    ministryHi: "सामाजिक न्याय और अधिकारिता मंत्रालय",
    category: "employment",
    categoryLabelEn: "Skill & Employment",
    categoryLabelHi: "कौशल एवं रोजगार",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://pmdaksh.dosje.gov.in/",
    officialSourceAuthority: "Ministry of Social Justice and Empowerment (MoSJE)",
    verificationStatus: "Verified against PM-DAKSH Scheme Guidelines (pmdaksh.dosje.gov.in)",
    applicationCycleEn: "Training batches and portal registration announced periodically on pmdaksh.dosje.gov.in.",
    applicationCycleHi: "pmdaksh.dosje.gov.in पोर्टल पर समय-समय पर प्रशिक्षण बैच हेतु पंजीकरण सक्रिय रहता है।",
    shortDescriptionEn: "Free skill development training with monthly stipend of ₹1,000-₹1,500 and placement assistance for SC, OBC, EWS, and Sanitation workers.",
    shortDescriptionHi: "एससी, ओबीसी, ईडब्ल्यूएस और सफाई कर्मचारियों के लिए ₹1,000-₹1,500 मासिक वजीफे और रोजगार सहायता के साथ मुफ्त कौशल प्रशिक्षण।",
    fullDescriptionEn: "PM-DAKSH is a National Action Plan under MoSJE for skilling target groups: Scheduled Castes (SC), Other Backward Classes (OBC with income < ₹3 Lakh), Economically Weaker/Backward Classes (income < ₹1 Lakh), De-notified Tribes, and Safai Karamcharis. Offers free Upskilling, Reskilling, Short Term, and Long Term Training with wage/self-employment assistance and stipends.",
    fullDescriptionHi: "पीएम-दक्ष योजना सामाजिक न्याय और अधिकारिता मंत्रालय द्वारा अनुसूचित जाति, अन्य पिछड़ा वर्ग (आय < ₹3 लाख), ईडब्ल्यूएस/ईबीसी (आय < ₹1 लाख) और सफाई कर्मचारियों को सशक्त बनाने के लिए चलाई जाती है। इसमें उच्च-स्तरीय मुफ्त प्रशिक्षण और ₹1,000-₹1,500/माह का स्टाइपेंड मिलता है।",
    benefitsSummaryEn: "100% free skill training, certification, placement linkage, plus ₹1,000 - ₹1,500 monthly stipend during non-residential training.",
    benefitsSummaryHi: "100% मुफ्त कौशल प्रमाणन, रोजगार सहायता, और गैर-आवासीय प्रशिक्षण में ₹1,000 - ₹1,500 प्रति माह स्टाइपेंड।",
    documentsRequiredEn: [
      "Aadhaar Card",
      "Caste Certificate (for SC / OBC candidates)",
      "Income Certificate (for OBC < ₹3 Lakh / EWS < ₹1 Lakh; not required for SC/Safai Karamcharis)",
      "Active Bank Account seeded with Aadhaar",
      "Educational marksheet (as per selected trade/course requirement)"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "जाति प्रमाण पत्र (SC/OBC उम्मीदवारों के लिए)",
      "आय प्रमाण पत्र (OBC < ₹3 लाख / EWS < ₹1 लाख हेतु)",
      "आधार से जुड़ा बैंक खाता पासबुक",
      "शैक्षणिक योग्यता अंकतालिका (संबंधित ट्रेड के अनुसार)"
    ],
    rules: {
      minAge: 18,
      maxAge: 45,
      allowedGenders: ["All"],
      maxIncome: 300000,
      allowedCategories: ["SC", "OBC", "EWS"],
      allowedOccupations: ["Unemployed", "Daily Wage / Informal Worker", "Other", "Student"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Age strictly below 18 years or above 45 years",
        "OBC candidates with family income exceeding ₹3.00 Lakh per annum",
        "EWS/EBC candidates with family income exceeding ₹1.00 Lakh per annum",
        "Candidates already availed similar government funded training within the past financial year"
      ]
    }
  },
  {
    id: "pm-pragati-scholarship",
    code: "AICTE-PRAGATI",
    nameEn: "AICTE Pragati Scholarship for Girl Students",
    nameHi: "एआईसीटीई प्रगति छात्रवृत्ति (तकनीकी डिग्री/डिप्लोमा छात्राएं)",
    ministryEn: "Ministry of Education & All India Council for Technical Education (AICTE)",
    ministryHi: "शिक्षा मंत्रालय एवं अखिल भारतीय तकनीकी शिक्षा परिषद",
    category: "education",
    categoryLabelEn: "Education & Technical",
    categoryLabelHi: "शिक्षा एवं तकनीकी",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-schemes/pragati-scholarship-scheme",
    officialSourceAuthority: "AICTE & Ministry of Education",
    verificationStatus: "Verified against AICTE Pragati Scheme Guidelines",
    applicationCycleEn: "Annual application window on National Scholarship Portal (NSP scholarships.gov.in), typically July/August to October/November.",
    applicationCycleHi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर वार्षिक आवेदन सत्र, आमतौर पर जुलाई/अगस्त से अक्टूबर/नवंबर तक।",
    shortDescriptionEn: "₹50,000 per year assistance for meritorious girl students admitted to AICTE-approved technical Degree or Diploma programs.",
    shortDescriptionHi: "एआईसीटीई-स्वीकृत तकनीकी डिग्री या डिप्लोमा में नामांकित मेधावी छात्राओं के लिए ₹50,000 प्रति वर्ष की छात्रवृत्ति।",
    fullDescriptionEn: "Pragati Scholarship scheme aims at providing financial support for the advancement of girls pursuing technical education. Covers up to 10,000 scholarships annually (5,000 for Degree, 5,000 for Diploma) for college tuition fees, purchase of books, equipment, computer/laptop, and software.",
    fullDescriptionHi: "प्रगति छात्रवृत्ति योजना बालिकाओं को तकनीकी शिक्षा हासिल करने के लिए सहायता प्रदान करती है। इसमें कॉलेज ट्यूशन फीस, किताबें, कंप्यूटर/लैपटॉप और सॉफ्टवेयर के लिए ₹50,000 प्रति वर्ष दिए जाते हैं।",
    benefitsSummaryEn: "₹50,000 per annum for each year of technical study (Degree: 4 years, Diploma: 3 years).",
    benefitsSummaryHi: "तकनीकी अध्ययन के प्रत्येक वर्ष के लिए ₹50,000 प्रति वर्ष (डिग्री: 4 वर्ष, डिप्लोमा: 3 वर्ष)।",
    documentsRequiredEn: [
      "AICTE approved institute admission allotment letter",
      "10th & 12th marksheet",
      "Annual family income certificate (< ₹8 Lakh per annum)",
      "Bank Account details seeded with Aadhaar",
      "Tuition fee receipt / Bonafide certificate"
    ],
    documentsRequiredHi: [
      "एआईसीटीई मान्यता प्राप्त संस्थान प्रवेश पत्र",
      "10वीं और 12वीं की अंकतालिका",
      "वार्षिक पारिवारिक आय प्रमाण पत्र (< ₹8 लाख)",
      "आधार से जुड़ा बैंक खाता",
      "कॉलेज शुल्क रसीद / बोनाफाइड प्रमाणपत्र"
    ],
    rules: {
      minAge: 16,
      maxAge: 30,
      allowedGenders: ["Female"],
      maxIncome: 800000,
      allowedCategories: ["All"],
      allowedOccupations: ["Student"],
      minEducation: "12th Pass",
      requiresTechnicalDegree: true,
      disqualifiers: [
        "Family income exceeding ₹8.00 Lakh per annum",
        "Male applicants (strictly reserved for female girl students)",
        "Non-technical general streams (e.g. BA, B.Com, Plain B.Sc)",
        "More than 2 girl children per family"
      ]
    }
  },
  {
    id: "aicte-swanath",
    code: "AICTE-SWANATH",
    nameEn: "AICTE Swanath Scholarship Scheme",
    nameHi: "एआईसीटीई स्वनाथ छात्रवृत्ति योजना",
    ministryEn: "Ministry of Education & All India Council for Technical Education (AICTE)",
    ministryHi: "शिक्षा मंत्रालय एवं अखिल भारतीय तकनीकी शिक्षा परिषद",
    category: "education",
    categoryLabelEn: "Education & Technical",
    categoryLabelHi: "शिक्षा एवं तकनीकी",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-schemes/swanath-scholarship-scheme",
    officialSourceAuthority: "AICTE & Ministry of Education",
    verificationStatus: "Verified against AICTE Swanath Scheme Guidelines",
    applicationCycleEn: "Annual application window on National Scholarship Portal (NSP scholarships.gov.in), typically July/August to October/November.",
    applicationCycleHi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर वार्षिक आवेदन सत्र, आमतौर पर जुलाई/अगस्त से अक्टूबर/नवंबर तक।",
    shortDescriptionEn: "₹50,000/year assistance for orphans, children who lost parents to COVID-19, or wards of martyred personnel pursuing technical courses.",
    shortDescriptionHi: "अनाथ बच्चों, कोविड-19 में माता-पिता खोने वाले या शहीद सैनिकों/अर्धसैनिक जवानों के बच्चों के लिए ₹50,000 प्रति वर्ष की छात्रवृत्ति।",
    fullDescriptionEn: "The AICTE Swanath Scholarship Scheme provides financial assistance to deserving students pursuing technical education who are: (i) Orphan students, OR (ii) Either or both parents died due to COVID-19, OR (iii) Wards of Armed Forces and Central Paramilitary Forces martyred in action. Covers Degree and Diploma programs in AICTE approved institutions.",
    fullDescriptionHi: "स्वनाथ योजना एआईसीटीई द्वारा अनाथ छात्रों, कोविड-19 के कारण माता-पिता को खोने वाले बच्चों और देश के लिए शहीद सैनिकों/अर्धसैनिक बलों के बच्चों को तकनीकी डिग्री या डिप्लोमा पूरा करने के लिए ₹50,000 प्रति वर्ष प्रदान करती है।",
    benefitsSummaryEn: "₹50,000 per annum for each year of technical study (Degree: 4 years, Diploma: 3 years).",
    benefitsSummaryHi: "तकनीकी अध्ययन के प्रत्येक वर्ष के लिए ₹50,000 प्रति वर्ष (डिग्री: 4 वर्ष, डिप्लोमा: 3 वर्ष)।",
    documentsRequiredEn: [
      "AICTE approved institute admission allotment letter",
      "Category proof: Orphan certificate / COVID-19 death certificate of parent(s) / Shaheed certificate from Armed/Paramilitary Forces",
      "Family Income Certificate (< ₹8 Lakh; not applicable for orphans)",
      "10th & 12th marksheet",
      "Aadhaar seeded bank account passbook"
    ],
    documentsRequiredHi: [
      "एआईसीटीई मान्यता प्राप्त संस्थान प्रवेश पत्र",
      "श्रेणी प्रमाण: अनाथ प्रमाणपत्र / माता-पिता का कोविड-19 मृत्यु प्रमाणपत्र / शहीद प्रमाणपत्र",
      "पारिवारिक आय प्रमाण पत्र (< ₹8 लाख; अनाथों हेतु आवश्यक नहीं)",
      "10वीं और 12वीं की अंकतालिका",
      "आधार से जुड़ा बैंक खाता पासबुक"
    ],
    rules: {
      minAge: 16,
      maxAge: 30,
      allowedGenders: ["All"],
      maxIncome: 800000,
      allowedCategories: ["All"],
      allowedOccupations: ["Student"],
      minEducation: "10th Pass",
      requiresTechnicalDegree: true,
      disqualifiers: [
        "Family income exceeding ₹8.00 Lakh per annum (not applicable to orphan candidates)",
        "Candidates enrolled in non-technical or non-AICTE approved general programs (e.g. BA, B.Com)",
        "Candidates not belonging to Orphan, COVID-19 deceased parent, or Martyr ward categories"
      ]
    }
  },
  {
    id: "sukanya-samriddhi",
    code: "SSY",
    nameEn: "Sukanya Samriddhi Yojana",
    nameHi: "सुकन्या समृद्धि योजना (बेटी बचाओ, बेटी पढ़ाओ)",
    ministryEn: "Ministry of Women and Child Development & Ministry of Finance",
    ministryHi: "महिला एवं बाल विकास मंत्रालय एवं वित्त मंत्रालय",
    category: "women",
    categoryLabelEn: "Women & Child",
    categoryLabelHi: "महिला एवं बाल विकास",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    officialSourceAuthority: "Department of Posts & Reserve Bank of India (RBI)",
    verificationStatus: "Verified against Government Savings Promotion Rules / RBI Guidelines",
    applicationCycleEn: "Continuous account opening throughout the year at any Post Office or authorized commercial bank branch.",
    applicationCycleHi: "किसी भी डाकघर या अधिकृत बैंक शाखा में पूरे वर्ष खाता खोलने की सुविधा निरंतर उपलब्ध।",
    shortDescriptionEn: "High sovereign-guaranteed interest savings scheme designed for the higher education and marriage of a girl child up to 10 years of age.",
    shortDescriptionHi: "10 वर्ष तक की बालिकाओं की उच्च शिक्षा और भविष्य के लिए उच्च संप्रभु-गारंटीकृत ब्याज दर वाली छोटी बचत योजना।",
    fullDescriptionEn: "Sukanya Samriddhi Account can be opened by parents or legal guardians for a girl child from her birth up to the age of 10 years. Offers sovereign-guaranteed high interest (currently around 8.2% p.a.), Triple tax exemption (EEE) under Section 80C, with maturity after 21 years from account opening or upon marriage after attaining 18 years.",
    fullDescriptionHi: "बेटी बचाओ बेटी पढ़ाओ के तहत शुरू की गई यह योजना 10 वर्ष से कम आयु की बालिकाओं के लिए अभिभावक द्वारा खोली जा सकती है। यह 8.2% वार्षिक ब्याज दर और धारा 80C के तहत पूर्ण कर छूट (EEE) प्रदान करती है।",
    benefitsSummaryEn: "Guaranteed interest rate (8.2% p.a.), Triple tax exemption (EEE), maturity at 21 years or marriage after 18.",
    benefitsSummaryHi: "8.2% वार्षिक ब्याज दर, धारा 80C के तहत पूर्ण कर छूट, 21 वर्ष या 18 वर्ष बाद विवाह पर परिपक्वता।",
    documentsRequiredEn: [
      "Girl child birth certificate (issued by municipal authority or registrar)",
      "Parent / Legal Guardian Aadhaar Card & PAN Card",
      "Proof of address (Voter ID, Utility bill, Passport)",
      "Passport size photos of parent/guardian and child"
    ],
    documentsRequiredHi: [
      "बालिका का जन्म प्रमाण पत्र (सक्षम नगर निकाय या रजिस्ट्रार द्वारा)",
      "माता-पिता / अभिभावक का आधार कार्ड और पैन कार्ड",
      "निवास प्रमाण पत्र (वोटर आईडी, बिजली बिल)",
      "पासपोर्ट आकार के फोटो"
    ],
    rules: {
      minAge: 0,
      maxAge: 10,
      allowedGenders: ["Female"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["All", "Student", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Child age strictly exceeding 10 years at time of account opening",
        "Male child applicants (strictly reserved for girl children only)",
        "More than 2 accounts per family (except in case of twin/triplet girl births after the first child)"
      ]
    }
  },
  {
    id: "pm-mudra",
    code: "PMMY",
    nameEn: "Pradhan Mantri Mudra Yojana",
    nameHi: "प्रधानमंत्री मुद्रा योजना",
    ministryEn: "Department of Financial Services (Ministry of Finance)",
    ministryHi: "वित्तीय सेवाएं विभाग (वित्त मंत्रालय)",
    category: "finance",
    categoryLabelEn: "Business & Microfinance",
    categoryLabelHi: "व्यवसाय एवं सूक्ष्म वित्त",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.mudra.org.in/",
    officialSourceAuthority: "Department of Financial Services / MUDRA",
    verificationStatus: "Verified against PMMY Guidelines (mudra.org.in)",
    applicationCycleEn: "Continuous application processing across all commercial, regional rural, and cooperative banks and Udyamitra portal.",
    applicationCycleHi: "सभी वाणिज्यिक, क्षेत्रीय ग्रामीण, सहकारी बैंकों और उद्यममित्र पोर्टल पर निरंतर आवेदन सक्रिय।",
    shortDescriptionEn: "Collateral-free micro loans up to ₹10-20 lakh for non-corporate, non-farm small/micro enterprises.",
    shortDescriptionHi: "गैर-कॉर्पोरेट, गैर-कृषि लघु एवं सूक्ष्म उद्यमों के लिए ₹10-20 लाख तक का बिना गारंटी का सूक्ष्म ऋण।",
    fullDescriptionEn: "PMMY provides institutional collateral-free loans to micro and small businesses under three categories: Shishu (loans up to ₹50,000), Kishore (loans ₹50,001 to ₹5,00,000), and Tarun / Tarun Plus (loans up to ₹10,00,000 / ₹20,00,000). No third-party collateral security is required.",
    fullDescriptionHi: "मुद्रा योजना तीन श्रेणियों के तहत सूक्ष्म व्यवसायों को ऋण प्रदान करती है: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख) और तरुण (₹5 लाख से ₹10-20 लाख)। किसी तीसरे पक्ष की गारंटी की आवश्यकता नहीं है।",
    benefitsSummaryEn: "Collateral-free loans up to ₹20 Lakh with subsidized interest rates and flexible tenure.",
    benefitsSummaryHi: "बिना किसी गारंटी के ₹20 लाख तक का ऋण, रियायती ब्याज दर और आसान अवधि।",
    documentsRequiredEn: [
      "Aadhaar Card & PAN Card",
      "Business address proof and Udyam Registration Certificate",
      "Bank statement of last 6 months",
      "Business Project report / quotation for machinery"
    ],
    documentsRequiredHi: [
      "आधार कार्ड एवं पैन कार्ड",
      "व्यवसाय का पता प्रमाण एवं उद्यम पंजीकरण",
      "पिछले 6 माह का बैंक विवरण",
      "प्रोजेक्ट रिपोर्ट / मशीनरी कोटेशन"
    ],
    rules: {
      minAge: 18,
      maxAge: 65,
      allowedGenders: ["All"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["Self-Employed / Entrepreneur", "Daily Wage / Informal Worker", "Unemployed", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Defaulters with any existing Bank or Financial Institution",
        "Large corporations or medium/large scale industries"
      ]
    }
  },
  {
    id: "post-matric-sc-st",
    code: "PMS-SC-ST",
    nameEn: "Post-Matric Scholarship for SC/ST/OBC Students",
    nameHi: "अनुसूचित जाति / जनजाति / अन्य पिछड़ा वर्ग छात्रों हेतु पोस्ट-मैट्रिक छात्रवृत्ति",
    ministryEn: "Ministry of Social Justice and Empowerment / Ministry of Tribal Affairs",
    ministryHi: "सामाजिक न्याय और अधिकारिता मंत्रालय / जनजातीय कार्य मंत्रालय",
    category: "education",
    categoryLabelEn: "Education & Scholarship",
    categoryLabelHi: "शिक्षा एवं छात्रवृत्ति",
    level: "Centrally Sponsored",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://scholarships.gov.in/",
    officialSourceAuthority: "National Scholarship Portal (NSP)",
    verificationStatus: "Verified against NSP Post-Matric Guidelines",
    applicationCycleEn: "Annual window on National Scholarship Portal (NSP scholarships.gov.in), typically July to November.",
    applicationCycleHi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर वार्षिक सत्र, आमतौर पर जुलाई से नवंबर तक।",
    shortDescriptionEn: "Financial support to SC, ST, and OBC students pursuing higher education from Class 11 through Post-Graduation.",
    shortDescriptionHi: "कक्षा 11 से लेकर स्नातकोत्तर तक उच्च शिक्षा प्राप्त करने वाले SC, ST और OBC छात्रों को 100% शुल्क प्रतिपूर्ति और निर्वाह भत्ता।",
    fullDescriptionEn: "The Post Matric Scholarship aims to support students belonging to disadvantaged categories to complete their education. It covers non-refundable compulsory course fees, monthly maintenance allowance, study tour charges, and thesis typing charges.",
    fullDescriptionHi: "पोस्ट मैट्रिक छात्रवृत्ति वंचित वर्गों के छात्रों को उच्च शिक्षा पूरी करने के लिए प्रोत्साहित करती है। इसमें कॉलेज की अनिवार्य गैर-वापसी योग्य फीस और मासिक रखरखाव भत्ता दिया जाता है।",
    benefitsSummaryEn: "100% compulsory tuition fee reimbursement plus monthly maintenance allowance up to ₹13,500 per year.",
    benefitsSummaryHi: "100% अनिवार्य शैक्षणिक शुल्क प्रतिपूर्ति और ₹13,500/वर्ष तक मासिक निर्वाह भत्ता।",
    documentsRequiredEn: [
      "Caste Certificate issued by competent revenue authority",
      "Income Certificate (family income < ₹2.5 Lakh per annum)",
      "Previous year marksheet (Class 10th / 12th / Degree)",
      "Fee receipt & Bonafide certificate from recognized college/school",
      "Aadhaar-seeded Bank Account passbook"
    ],
    documentsRequiredHi: [
      "सक्षम प्राधिकारी द्वारा जारी जाति प्रमाण पत्र",
      "वार्षिक आय प्रमाण पत्र (< ₹2.5 लाख प्रति वर्ष)",
      "पिछली कक्षा की अंकतालिका (10वीं/12वीं/डिग्री)",
      "कॉलेज से फीस रसीद एवं बोनाफाइड प्रमाणपत्र",
      "आधार से जुड़ा बैंक खाता पासबुक"
    ],
    rules: {
      minAge: 15,
      maxAge: 35,
      allowedGenders: ["All"],
      maxIncome: 250000,
      allowedCategories: ["SC", "ST", "OBC"],
      allowedOccupations: ["Student"],
      minEducation: "10th Pass",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Family income exceeding ₹2.50 lakh per annum",
        "Students currently repeating the same class/standard",
        "Students enrolled in parallel degree courses of same level"
      ]
    }
  },
  {
    id: "pm-awas-yojana",
    code: "PMAY",
    nameEn: "Pradhan Mantri Awas Yojana (PMAY-U / PMAY-G)",
    nameHi: "प्रधानमंत्री आवास योजना (शहरी एवं ग्रामीण)",
    ministryEn: "Ministry of Housing and Urban Affairs / Ministry of Rural Development",
    ministryHi: "आवासन और शहरी कार्य मंत्रालय / ग्रामीण विकास मंत्रालय",
    category: "housing",
    categoryLabelEn: "Housing & Shelter",
    categoryLabelHi: "आवास एवं आश्रय",
    level: "Centrally Sponsored",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://pmaymis.gov.in/",
    officialSourceAuthority: "Ministry of Housing and Urban Affairs (MoHUA)",
    verificationStatus: "Verified against PMAY Guidelines (pmaymis.gov.in / pmayg.nic.in)",
    applicationCycleEn: "Continuous enrollment through Municipal Corporation / Gram Panchayat / PMAY-MIS portal.",
    applicationCycleHi: "नगर निगम / ग्राम पंचायत / PMAY-MIS पोर्टल के माध्यम से निरंतर आवेदन सक्रिय।",
    shortDescriptionEn: "Interest subsidy and direct financial grant for constructing or purchasing a permanent pucca house for low-income and EWS families.",
    shortDescriptionHi: "कम आय वाले और ईडब्ल्यूएस परिवारों के लिए पक्का मकान बनाने या खरीदने के लिए ब्याज सब्सिडी और प्रत्यक्ष अनुदान।",
    fullDescriptionEn: "PMAY addresses the affordable housing requirements of urban and rural poor, economically weaker sections (EWS), and low-income groups (LIG). Provides interest subsidy on housing loans or direct financial assistance of up to ₹1.20 - ₹2.67 lakh for constructing a permanent pucca house.",
    fullDescriptionHi: "पीएम आवास योजना गरीबों और निम्न आय वर्ग के परिवारों के लिए पक्के मकान का सपना पूरा करती है। इसके तहत ₹1.20 से ₹2.67 लाख तक की सब्सिडी और प्रत्यक्ष अनुदान दिया जाता है।",
    benefitsSummaryEn: "Up to ₹2.67 Lakh interest subsidy on home loans (CLSS) or direct house construction grant of ₹1.20 - ₹1.30 Lakh.",
    benefitsSummaryHi: "होम लोन पर ₹2.67 लाख तक की ब्याज सब्सिडी या ग्रामीण मकान निर्माण हेतु ₹1.20 - ₹1.30 लाख का सीधा अनुदान।",
    documentsRequiredEn: [
      "Aadhaar Card of all family members",
      "Income certificate or BPL card",
      "Land ownership document / NOC from municipal or gram panchayat",
      "Bank Account details",
      "Affidavit confirming no existing pucca house in India"
    ],
    documentsRequiredHi: [
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "आय प्रमाण पत्र या बीपीएल कार्ड",
      "भूमि स्वामित्व दस्तावेज / पंचायत या नगर निकाय की एनओसी",
      "बैंक खाता विवरण",
      "शपथ पत्र कि पूरे देश में कोई पक्का मकान नहीं है"
    ],
    rules: {
      minAge: 18,
      maxAge: 70,
      allowedGenders: ["All"],
      maxIncome: 600000,
      allowedCategories: ["All"],
      allowedOccupations: ["All", "Daily Wage / Informal Worker", "Farmer", "Self-Employed / Entrepreneur", "Homemaker", "Unemployed", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Beneficiary family already owns a pucca house anywhere in India",
        "Family income exceeding ₹6.00 Lakh per annum for EWS/LIG assistance"
      ]
    }
  },
  {
    id: "pm-svanidhi",
    code: "PM-SVANIDHI",
    nameEn: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    nameHi: "पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)",
    ministryEn: "Ministry of Housing and Urban Affairs",
    ministryHi: "आवासन और शहरी कार्य मंत्रालय",
    category: "finance",
    categoryLabelEn: "Business & Microfinance",
    categoryLabelHi: "व्यवसाय एवं सूक्ष्म वित्त",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://pmsvanidhi.mohua.gov.in/",
    officialSourceAuthority: "Ministry of Housing and Urban Affairs (MoHUA)",
    verificationStatus: "Verified against PM SVANidhi Guidelines (pmsvanidhi.mohua.gov.in)",
    applicationCycleEn: "Continuous application on pmsvanidhi.mohua.gov.in and through Urban Local Bodies (ULBs).",
    applicationCycleHi: "pmsvanidhi.mohua.gov.in पोर्टल और शहरी स्थानीय निकायों के माध्यम से निरंतर आवेदन सक्रिय।",
    shortDescriptionEn: "Affordable working capital micro-credit up to ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy for street vendors.",
    shortDescriptionHi: "स्ट्रीट वेंडरों/फेरीवालों के लिए ₹10,000, ₹20,000 और ₹50,000 तक का कार्यशील पूंजी ऋण 7% ब्याज सब्सिडी के साथ।",
    fullDescriptionEn: "PM SVANidhi is a special micro-credit scheme launched to empower urban, peri-urban, and rural street vendors. Offers an initial working capital loan of ₹10,000, scalable to ₹20,000 and ₹50,000 on timely repayment, plus cashback incentives up to ₹1,200 per year on digital transactions.",
    fullDescriptionHi: "यह योजना रेहड़ी-पटरी वालों और फेरीवालों को आत्मनिर्भर बनाने के लिए शुरू की गई है। इसमें समय पर पुनर्भुगतान पर ₹10,000 से लेकर ₹50,000 तक की पूंजी और डिजिटल लेनदेन पर ₹1,200/वर्ष तक कैशबैक मिलता है।",
    benefitsSummaryEn: "Collateral-free loan: ₹10,000 (1st tranche), ₹20,000 (2nd), ₹50,000 (3rd) with 7% interest subsidy & up to ₹1,200 annual digital cashback.",
    benefitsSummaryHi: "बिना गारंटी ऋण: ₹10,000, ₹20,000, ₹50,000, साथ ही 7% ब्याज सब्सिडी और ₹1,200 तक वार्षिक डिजिटल कैशबैक।",
    documentsRequiredEn: [
      "Vending Certificate or Identity Card issued by Urban Local Body (ULB) / Letter of Recommendation (LoR)",
      "Aadhaar Card",
      "Bank Account details",
      "Mobile number linked to Aadhaar"
    ],
    documentsRequiredHi: [
      "शहरी स्थानीय निकाय द्वारा जारी वेंडिंग प्रमाणपत्र / पहचान पत्र / अनुशंसा पत्र (LoR)",
      "आधार कार्ड",
      "बैंक खाता विवरण",
      "आधार से जुड़ा मोबाइल नंबर"
    ],
    rules: {
      minAge: 18,
      maxAge: 70,
      allowedGenders: ["All"],
      maxIncome: 300000,
      allowedCategories: ["All"],
      allowedOccupations: ["Daily Wage / Informal Worker", "Self-Employed / Entrepreneur", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Persons not engaged in street vending or informal retail",
        "Defaulted bank credit history"
      ]
    }
  },
  {
    id: "atal-pension-yojana",
    code: "APY",
    nameEn: "Atal Pension Yojana",
    nameHi: "अटल पेंशन योजना",
    ministryEn: "Pension Fund Regulatory and Development Authority (PFRDA / Ministry of Finance)",
    ministryHi: "पेंशन निधि विनियामक और विकास प्राधिकरण (वित्त मंत्रालय)",
    category: "social-security",
    categoryLabelEn: "Social Security & Pension",
    categoryLabelHi: "सामाजिक सुरक्षा एवं पेंशन",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.npscra.nsdl.co.in/atal-pension-yojana.php",
    officialSourceAuthority: "PFRDA / Department of Financial Services",
    verificationStatus: "Verified against PFRDA APY Scheme Guidelines",
    applicationCycleEn: "Continuous enrollment at any Bank branch or Post Office across India.",
    applicationCycleHi: "भारत भर में किसी भी बैंक शाखा या डाकघर में निरंतर नामांकन सक्रिय।",
    shortDescriptionEn: "Guaranteed monthly pension of ₹1,000 to ₹5,000 from age 60 for unorganized sector workers.",
    shortDescriptionHi: "असंगठित क्षेत्र के कामगारों के लिए 60 वर्ष की आयु से ₹1,000 से ₹5,000 तक की गारंटीकृत मासिक पेंशन।",
    fullDescriptionEn: "APY is open to all Indian citizens between 18 and 40 years of age. Subscribers receive a guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 after attaining 60 years of age, depending on contribution amount. In case of death, the pension continues to the spouse, and the corpus is returned to the nominee.",
    fullDescriptionHi: "यह योजना 18 से 40 वर्ष के सभी भारतीय नागरिकों के लिए है। 60 वर्ष पूरे होने पर अंशदान के आधार पर ₹1,000 से ₹5,000 की न्यूनतम मासिक पेंशन जीवनभर मिलती है। जीवनसाथी और नॉमिनी को भी पूर्ण वित्तीय सुरक्षा मिलती है।",
    benefitsSummaryEn: "Lifetime guaranteed monthly pension of ₹1,000 to ₹5,000 from age 60, with spouse continuation and corpus return.",
    benefitsSummaryHi: "60 वर्ष की आयु से आजीवन ₹1,000 से ₹5,000 तक की पक्की मासिक पेंशन, पति/पत्नी को निरंतरता और नॉमिनी को जमा पूंजी।",
    documentsRequiredEn: [
      "Aadhaar Card",
      "Savings Bank Account with Auto-Debit facility enabled",
      "Active Mobile Number"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "ऑटो-डेबिट सुविधा युक्त बचत बैंक खाता",
      "सक्रिय मोबाइल नंबर"
    ],
    rules: {
      minAge: 18,
      maxAge: 40,
      allowedGenders: ["All"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["Daily Wage / Informal Worker", "Farmer", "Self-Employed / Entrepreneur", "Homemaker", "Unemployed", "Other", "Salaried Employee"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Age strictly below 18 or above 40 years at time of entry",
        "Income Tax payers (individuals who pay or have paid income tax are ineligible to join APY since Oct 1, 2022)"
      ]
    }
  },
  {
    id: "naps-apprenticeship",
    code: "NAPS",
    nameEn: "National Apprenticeship Promotion Scheme (NAPS)",
    nameHi: "राष्ट्रीय शिक्षुता संवर्धन योजना (एनएपीएस)",
    ministryEn: "Ministry of Skill Development and Entrepreneurship (MSDE)",
    ministryHi: "कौशल विकास और उद्यमिता मंत्रालय",
    category: "employment",
    categoryLabelEn: "Skill & Employment",
    categoryLabelHi: "कौशल एवं रोजगार",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.apprenticeshipindia.gov.in/",
    officialSourceAuthority: "Ministry of Skill Development and Entrepreneurship (MSDE)",
    verificationStatus: "Verified against MSDE NAPS Guidelines (apprenticeshipindia.gov.in)",
    applicationCycleEn: "Continuous apprenticeship opportunity matching and registration on apprenticeshipindia.gov.in.",
    applicationCycleHi: "apprenticeshipindia.gov.in पोर्टल पर निरंतर शिक्षुता अवसर एवं पंजीकरण सक्रिय।",
    shortDescriptionEn: "On-the-job industrial apprenticeship training with monthly stipend support of up to ₹1,500/month by the Government.",
    shortDescriptionHi: "उद्योगों में ऑन-द-जॉब ट्रेनिंग एवं सरकार द्वारा प्रति माह ₹1,500 तक का मासिक वजीफा (स्टाइपेंड)।",
    fullDescriptionEn: "NAPS promotes apprenticeship training across industrial sectors by sharing 25% of prescribed stipend up to ₹1,500 per month per apprentice with employers, ensuring youth gain practical industry exposure and employable skills.",
    fullDescriptionHi: "यह योजना युवाओं को व्यावहारिक औद्योगिक कौशल और अनुभव प्रदान करती है। सरकार नियोक्ताओं के साथ प्रति प्रशिक्षु ₹1,500 प्रति माह तक का स्टाइपेंड साझा करती है।",
    benefitsSummaryEn: "Monthly stipend (Government reimburses up to ₹1,500/month) + recognized National Apprenticeship Certificate.",
    benefitsSummaryHi: "मासिक स्टाइपेंड (सरकार द्वारा ₹1,500/माह तक अनुदान) एवं मान्यता प्राप्त राष्ट्रीय शिक्षुता प्रमाणपत्र।",
    documentsRequiredEn: [
      "Aadhaar Card",
      "Educational qualification certificate (10th/12th/ITI/Diploma/Degree)",
      "Bank Account details",
      "Apprenticeship portal profile registration"
    ],
    documentsRequiredHi: [
      "आधार कार्ड",
      "शैक्षणिक योग्यता प्रमाण पत्र (10वीं/12वीं/आईटीआई/डिप्लोमा/डिग्री)",
      "बैंक खाता विवरण",
      "शिक्षुता पोर्टल प्रोफाइल पंजीकरण"
    ],
    rules: {
      minAge: 18,
      maxAge: 35,
      allowedGenders: ["All"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["Unemployed", "Student", "Other"],
      minEducation: "10th Pass",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Age below 18 years",
        "Candidates already undergoing another full-time government apprenticeship"
      ]
    }
  },
  {
    id: "pm-ujjwala-yojana",
    code: "PMUY",
    nameEn: "Pradhan Mantri Ujjwala Yojana 2.0",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना 2.0",
    ministryEn: "Ministry of Petroleum and Natural Gas",
    ministryHi: "पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय",
    category: "women",
    categoryLabelEn: "Women & Energy",
    categoryLabelHi: "महिला एवं स्वच्छ ऊर्जा",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.pmuy.gov.in/",
    officialSourceAuthority: "Ministry of Petroleum and Natural Gas (MoPNG)",
    verificationStatus: "Verified against PMUY 2.0 Guidelines (pmuy.gov.in)",
    applicationCycleEn: "Continuous enrollment at LPG distributorships and online via pmuy.gov.in.",
    applicationCycleHi: "एलपीजी वितरकों और pmuy.gov.in पोर्टल पर निरंतर नामांकन सक्रिय।",
    shortDescriptionEn: "Deposit-free LPG cooking gas connection with first refill and stove provided free of cost to adult women from BPL households.",
    shortDescriptionHi: "बीपीएल परिवारों की वयस्क महिलाओं को पहले रिफिल और चूल्हे के साथ मुफ्त एलपीजी गैस कनेक्शन।",
    fullDescriptionEn: "PMUY provides clean cooking fuel to rural and deprived households to replace biomass firewood. Beneficiary receives a free gas connection, security deposit waiver, the first 14.2 kg LPG refill free, and a free hotplate (stove).",
    fullDescriptionHi: "उज्ज्वला योजना महिलाओं के स्वास्थ्य की रक्षा और स्वच्छ ईंधन उपलब्ध कराने के लिए शुरू की गई है। पात्र महिलाओं को सुरक्षा जमा राशि के बिना मुफ्त एलपीजी कनेक्शन, पहला भरा सिलेंडर और गैस चूल्हा मुफ्त दिया जाता है।",
    benefitsSummaryEn: "100% deposit-free LPG connection, 1st cylinder refill completely free, plus free two-burner stove.",
    benefitsSummaryHi: "बिना किसी जमा राशि के नया एलपीजी कनेक्शन, पहला सिलेंडर रिफिल बिल्कुल मुफ्त एवं गैस चूल्हा मुफ्त।",
    documentsRequiredEn: [
      "Aadhaar Card of adult female applicant and adult family members",
      "Ration Card or BPL certificate",
      "Bank Account Passbook (Aadhaar linked)",
      "Self-declaration of residency"
    ],
    documentsRequiredHi: [
      "महिला आवेदक एवं परिवार के वयस्क सदस्यों का आधार कार्ड",
      "राशन कार्ड या बीपीएल प्रमाण पत्र",
      "आधार से जुड़ा बैंक खाता पासबुक",
      "निवास का स्व-घोषणा पत्र"
    ],
    rules: {
      minAge: 18,
      maxAge: 75,
      allowedGenders: ["Female"],
      maxIncome: 200000,
      allowedCategories: ["All"],
      allowedOccupations: ["All", "Homemaker", "Daily Wage / Informal Worker", "Farmer", "Unemployed", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Male applicants (strictly issued in name of an adult woman of household)",
        "Household already possesses an active LPG connection from any OMC"
      ]
    }
  },
  {
    id: "pmegp-loan",
    code: "PMEGP",
    nameEn: "Prime Minister's Employment Generation Programme",
    nameHi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)",
    ministryEn: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    ministryHi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय",
    category: "finance",
    categoryLabelEn: "Business & MSME",
    categoryLabelHi: "व्यवसाय एवं एमएसएमई",
    level: "Central Sector",
    targetStates: ["All"],
    isSampleData: true,
    officialPortalUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    officialSourceAuthority: "Khadi and Village Industries Commission (KVIC / MoMSME)",
    verificationStatus: "Verified against PMEGP Scheme Guidelines (kviconline.gov.in)",
    applicationCycleEn: "Continuous online application portal on kviconline.gov.in throughout the year.",
    applicationCycleHi: "kviconline.gov.in पोर्टल पर पूरे वर्ष निरंतर ऑनलाइन आवेदन सक्रिय।",
    shortDescriptionEn: "Credit-linked subsidy program offering 15% to 35% government subsidy for starting new micro-enterprises up to ₹50 Lakh.",
    shortDescriptionHi: "नया सूक्ष्म उद्यम शुरू करने के लिए 15% से 35% तक सरकारी सब्सिडी के साथ ₹50 लाख तक का बैंक ऋण।",
    fullDescriptionEn: "PMEGP is a major credit-linked subsidy program implemented through KVIC, KVIB, and DIC. Helps traditional artisans and unemployed youth establish manufacturing units (up to ₹50 Lakh) or service units (up to ₹20 Lakh) with government margin money subsidy ranging from 15% to 35%.",
    fullDescriptionHi: "यह योजना नए व्यवसाय या उद्योग स्थापित करने के लिए वित्तीय सहायता प्रदान करती है। विनिर्माण क्षेत्र में ₹50 लाख और सेवा क्षेत्र में ₹20 लाख तक की परियोजना लागत पर 15% से 35% तक की सरकारी सब्सिडी दी जाती है।",
    benefitsSummaryEn: "Up to 35% government subsidy (margin money) on project cost up to ₹50 Lakh (Manufacturing) & ₹20 Lakh (Service).",
    benefitsSummaryHi: "विनिर्माण हेतु ₹50 लाख और सेवा हेतु ₹20 लाख की लागत पर 35% तक सरकारी अनुदान (सब्सिडी)।",
    documentsRequiredEn: [
      "Aadhaar Card & PAN Card",
      "Detailed Project Report (DPR)",
      "Special category certificate (SC/ST/OBC/Women/Ex-serviceman if applicable)",
      "Educational qualification certificate (minimum 8th pass for projects > ₹10L in manufacturing)",
      "EDP (Entrepreneurship Development Training) certificate"
    ],
    documentsRequiredHi: [
      "आधार कार्ड एवं पैन कार्ड",
      "विस्तृत परियोजना रिपोर्ट (डीपीआर)",
      "विशेष श्रेणी प्रमाण पत्र (यदि लागू हो)",
      "शैक्षणिक योग्यता प्रमाण पत्र (8वीं पास विनिर्माण में ₹10 लाख से ऊपर की परियोजनाओं के लिए)",
      "उद्यमिता विकास प्रशिक्षण (ईडीपी) प्रमाण पत्र"
    ],
    rules: {
      minAge: 18,
      maxAge: 65,
      allowedGenders: ["All"],
      maxIncome: null,
      allowedCategories: ["All"],
      allowedOccupations: ["Unemployed", "Self-Employed / Entrepreneur", "Other"],
      minEducation: "None",
      requiresTechnicalDegree: null,
      disqualifiers: [
        "Existing units or units that have already availed any other central/state subsidy",
        "Projects in negative list (meat, intoxicants, tobacco, polythene carry bags < 20 microns)"
      ]
    }
  }
];

// Helper metadata
const SCHEME_CATEGORIES = [
  { id: "all", labelEn: "All Categories", labelHi: "सभी श्रेणियां", icon: "🏛️" },
  { id: "agriculture", labelEn: "Agriculture & Rural", labelHi: "कृषि एवं ग्रामीण", icon: "🌾" },
  { id: "education", labelEn: "Education & Scholarship", labelHi: "शिक्षा एवं छात्रवृत्ति", icon: "🎓" },
  { id: "healthcare", labelEn: "Healthcare", labelHi: "स्वास्थ्य सेवा", icon: "🩺" },
  { id: "finance", labelEn: "Business & Loan", labelHi: "व्यवसाय एवं ऋण", icon: "💼" },
  { id: "women", labelEn: "Women & Child", labelHi: "महिला एवं बाल कल्याण", icon: "👩" },
  { id: "housing", labelEn: "Housing & Shelter", labelHi: "आवास एवं आश्रय", icon: "🏠" },
  { id: "social-security", labelEn: "Social Security", labelHi: "सामाजिक सुरक्षा", icon: "🛡️" },
  { id: "employment", labelEn: "Skill & Employment", labelHi: "कौशल एवं रोजगार", icon: "⚙️" }
];

const INDIAN_STATES = [
  "All States / Union Territories",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// Export for browser & node test runner
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCHEMES_DATA, SCHEME_CATEGORIES, INDIAN_STATES };
}
