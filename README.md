# 🏛️ SchemeAI - Indian Government Scheme Eligibility Checker

**SchemeAI** is a modern, responsive, citizen-centric web application designed to help Indian citizens discover and verify their eligibility for central and state government welfare schemes using transparent, explainable rule-based matching.

---

## 🌟 Key Features

1. **Modern, Responsive Indian Govtech Aesthetic**
   - Clean Indian public service blue-and-white palette (`#0a2540`, `#0b5cab`, `#ffffff`) with subtle tricolor accents.
   - Mobile and desktop responsive design built with standard modern CSS3 (Flexbox & Grid).
   - Accessible form controls with high-contrast states and clear error feedback.

2. **Dual Language Support (English & हिन्दी)**
   - Instant one-click toggle in the header (`English` ⇄ `हिन्दी`).
   - Seamlessly translates navigation, form labels, criteria explanations, and scheme descriptions without losing active form inputs.

3. **Citizen Eligibility Assessment**
   - Captures key demographic & economic parameters:
     - Full Name (Optional)
     - Age (0 – 100 years)
     - Gender (Female, Male, Transgender / Other)
     - State / Union Territory (All 37 States & UTs)
     - Social Category (General, OBC, SC, ST, EWS)
     - Current Occupation (Farmer, Student, Entrepreneur, Salaried, Daily Wage Worker, Unemployed, Homemaker, Other)
     - Annual Family Income (with quick INR presets)
     - Highest Education Level (Below 10th to Post-Graduate)
     - Technical Degree / Diploma Enrollment Status
   - One-click sample profile buttons for rapid testing:
     - 🌾 **Sample Farmer Profile** (Ramesh Kumar, 42, OBC, Farmer, ₹1.8L)
     - 🎓 **Sample Student Profile** (Priya Sharma, 19, General, Technical Degree, ₹4.5L)

4. **Transparent, Explainable Rule-Based Matching**
   - **No Black-Box Hallucinations:** Every eligibility outcome is calculated deterministically against published government criteria.
   - **Detailed Breakdown Modal:** Shows an itemized check of all rules (Age, Gender, Social Category, Income, Occupation, Education, Technical Degree, Domicile State) with exact reasons why a criterion passed or failed.
   - **Statutory Preliminary Assessment Disclaimer:** Explicitly reminds citizens that the result is an algorithmic assessment and final sanction rests exclusively with the relevant government department.

5. **Explore Schemes Repository**
   - Instant keyword search across scheme titles, descriptions, and ministries.
   - Sector category chips: Agriculture, Healthcare, Education, Business & Loans, Women & Child, Housing, Social Security, and Skill/Employment.
   - Authentic official application links directly to `.gov.in`, `.nic.in`, and verified statutory portals.

6. **Citizen Utilities**
   - **Print / Save as PDF:** One-click clean print stylesheet to generate or print a citizen eligibility summary.
   - **Bookmark Schemes:** Save favorite or eligible schemes locally in your browser (`localStorage`).
   - **Official Helplines:** Quick reference for National Consumer Helpline (1915), Ayushman Bharat (14555), Kisan Call Centre (1800-180-1551), and Cyber Fraud (1930).

---

## 🚀 How to Run Locally (100% Free & Offline-Ready)

SchemeAI is built with pure **HTML5, CSS3, and JavaScript** with **zero paid tools, zero paid APIs, and no external build steps**.

### Option 1: Direct Browser Launch (Easiest)
Simply double-click [`index.html`](file:///c:/Users/ADMIN/OneDrive/Desktop/CDH.project/index.html) or right-click and choose **Open with > Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Using Python Local Server
If Python is installed on your system, open your terminal / command prompt in this folder and run:
```bash
python -m http.server 8000
```
Then visit **`http://localhost:8000`** in your browser.

### Option 3: Using Node.js or VS Code Live Server
```bash
npx serve .
```
Or right-click `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 🧪 Running the Automated Verification Tests

The project includes comprehensive automated test suites covering eligibility logic, boundaries, edge cases, and frontend integrity:

1. **Eligibility Engine Rule & Edge Case Verification:**
   ```bash
   node tests/test-eligibility.js
   ```
   *Verifies 43 demographic & edge-case scenarios including marginal farmers, female technical students, SC/ST students, girl child accounts, high-income professionals, negative income handling, exact boundary income checks (boundary pass vs boundary + ₹1 fail), missing field handling (never treating missing information as proof of eligibility), APY age boundaries (18, 40, 41, 17), and education hierarchy.*

2. **Frontend DOM, Localization & Integrity Verification:**
   ```bash
   node tests/test-frontend-integrity.js
   ```
   *Verifies 101 validation checkpoints ensuring all DOM bindings, full English and Hindi (हिन्दी) translation symmetry, error message element bindings, internal anchor link targets, CSS classes, and verified official HTTPS government portal links.*

---

## 📁 Project Structure

```
CDH.project/
├── index.html                   # Semantic, accessible main application page
├── README.md                    # Project documentation & run guide
├── css/
│   └── styles.css               # Indian Govtech responsive design system & print styles
├── js/
│   ├── schemes-data.js          # Curated database of 12 flagship Indian central schemes
│   ├── translations.js          # Full English and Hindi (हिन्दी) localization dictionary
│   ├── eligibility-engine.js    # Transparent deterministic eligibility evaluation engine
│   └── app.js                   # Application controller, DOM events, search, modals & PDF print
└── tests/
    ├── test-eligibility.js      # Automated demographic test cases
    └── test-frontend-integrity.js # Frontend schema and DOM binding validation
```

---

## 🏛️ Curated Sample Government Schemes Included

All schemes included use authentic official portals and verified guidelines:
- **PM Kisan Samman Nidhi** (`pmkisan.gov.in`)
- **Ayushman Bharat PM-JAY** (`beneficiary.nha.gov.in`)
- **Pradhan Mantri Mudra Yojana** (`mudra.org.in`)
- **Post-Matric Scholarship for SC/ST/OBC** (`scholarships.gov.in`)
- **Sukanya Samriddhi Yojana** (`indiapost.gov.in`)
- **AICTE Pragati Scholarship for Girls** (`aicte-india.org`)
- **Pradhan Mantri Awas Yojana** (`pmaymis.gov.in`)
- **PM SVANidhi for Street Vendors** (`pmsvanidhi.mohua.gov.in`)
- **Atal Pension Yojana** (`npscra.nsdl.co.in`)
- **National Apprenticeship Promotion Scheme** (`apprenticeshipindia.gov.in`)
- **Pradhan Mantri Ujjwala Yojana 2.0** (`pmuy.gov.in`)
- **Prime Minister's Employment Generation Programme** (`kviconline.gov.in`)

---

## ⚖️ Statutory Notice
SchemeAI is an educational and public citizen assistance prototype. All scheme rules and links are curated from publicly available central government portals. SchemeAI is not affiliated with the Government of India; official sanction and disbursements are subject to verification by the respective statutory departments.
