# 🚄 CP.pt QA Automation Test Suite

This project is a UI and API automated test suite for [cp.pt](https://www.cp.pt/passageiros/en). It is part of a test task for a QA Engineer role.

---

## 📁 Project Structure

```
.
├── backend_tests          # API tests (Python + Pytest)
│   ├── api                # API layer
│   ├── config             # Test config files
│   ├── fixtures           # Common API fixtures
│   ├── tests              # Test files
│   └── utils              # Utility functions
├── ui_tests               # UI tests (TypeScript + Playwright)
│   ├── config             # Test data and configuration
│   ├── fixtures           # UI test fixtures (shared setup)
│   ├── locators           # Page-specific locators
│   ├── pages              # Page Object Model classes
│   ├── tests              # Test specs
│   └── utils              # Utility functions (e.g., date formatting)
├── reports                # Allure test results and reports
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 🧲 Tech Stack

| Layer       | Tools Used              |
| ----------- | ----------------------- |
| UI Testing  | Playwright, TypeScript  |
| API Testing | Python, Pytest          |
| Reporting   | Allure                  |
| Assertion   | Playwright Test, Pytest |

---

## 💻 Quick Start

### ✅ Run UI Tests

```bash
npm run test:ui
```

### 📊 Generate and Open Allure Report

```bash
npm run report:ui
```

> Generates and opens a visual test report at `./reports/ui_tests_allure_report`.

---

## ⚙️ Allure Setup (UI Tests)

Make sure to install the reporter:

```bash
npm install -D allure-playwright
```

In your `playwright.config.ts`:

```ts
reporters: [
  ['allure-playwright', { outputFolder: './reports/ui_tests_allure_results' }]
]
```

---

## 📌 Test Example: Buy Tickets Flow

* Navigates to the Buy Tickets page
* Fills out travel form (e.g., Lagos → Porto Campanha)
* Selects departure and return dates
* Submits the form
* Cancels and verifies that search parameters persist

---

## 🧠 Improvements in Progress / TODO

*

---

## 🧑‍💻 Author

**Nick Mizin**
QA Automation Engineer

---

## 📬 Contact

* Email: [mizmannikolay@gmail.com](mailto:mizmannikolay@gmail.com)
* LinkedIn: [https://www.linkedin.com/in/nikolay-mizin/](https://www.linkedin.com/in/nikolay-mizin/)
