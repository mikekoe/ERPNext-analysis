# Greenlife ERPNext-analysis
This project is use to evaluate the performance of ERPNext through a pharmaceutical manufacturing and inventory management case study based on Greenlife Pharmaceuticals Nigeria. The tools used includes Playwright, TypeScript, REST API automation, MariaDB, SQL, CI/CD through GitHub Actions and Apache JMeter
The live link will soon be up.

## Project Structure

erp-quality-engineering/
│
├── README.md
├── GREENLIFE-ERPNext-QUALITY-ENGINEERING-ARCHITECTURE.svg
├── docs/
│   ├── GREENLIFE-BRD.md
│   ├── GREENLIFE-TEST-PLAN.md
│   ├── GREENLIFE_EXPLORATORY-TEST-CHARTER-AND-SESSION-LOG.xlsx
│   ├── GREENLIFE-RTM.xlsx
│   ├── TEST-EXECUTION-REPORT.md
│   ├── DEFECT-REPORT.md
├── tests/
│   ├── ui/
│   │   ├── inventory/
│   │   ├── manufacturing/
│   │   └── quality/
│   ├── api/
│   │   ├── inventory/
│   │   ├── manufacturing/
│   │   └── quality/
│   ├── database/
│   └── performance/
├── playwright/
│   ├── fixtures/
│   ├── pages/
│   └── utils/
├── test-data.xlsx
├── .github/
│   └── workflows/
│       └── quality-checks.yml
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json


## Quality Engineering Architecture

The architecture below illustrates the quality engineering approach
that is used for testing ERPNext in the Greenlife Pharmaceuticals.

It covers the business workflow, test planning and design, exploratory testing, UI and API automation, database validation, performance testing, and quality reporting.

![Greenlife ERPNext Quality Engineering Architecture](./Greenlife-ERPNext-Quality-Engineering-Architecture.svg)