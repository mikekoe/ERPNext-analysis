# Test Summary Report: Greenlife Pharmaceuticals ERPNext Quality Engineering

## 1. Overview

This report summarises the testing performed on an ERPNext implementation configured for **Greenlife Pharmaceuticals Limited**, a Nigerian pharmaceutical manufacturing and inventory case study. The goal was to check that ERPNext correctly supports procurement, batch-controlled warehouse stock, manufacturing and stock traceability, using manual exploratory testing, UI automation, API testing, database validation and performance testing.

This is a solo portfolio project. The system under test is a local development instance, not a Greenlife production system, and no regulatory compliance is claimed.

| Item              | Detail                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| System under test | ERPNext 16.55.0 (Frappe 16.56.0, Bench 5.31.1)                           |
| Instance          | `http://greenlife.localhost:8000` (local only)                           |
| Company record    | `GreenLife Pharma`                                                       |
| Repository        | `mikekoe/ERPNext-analysis`, branch `feature/greenlife-pharma-QA`         |
| Test stack        | Playwright + TypeScript, Postman, Apache JMeter, MariaDB, GitHub Actions |

## 2. Scope

**In scope:**

- Inventory and warehouses (items, item groups, stock transfers, balances, valuation)
- Procurement (purchase receipts, accepted and rejected quantities, batch assignment, tax templates)
- Manufacturing (BOM, Work Order, Material Transfer for Manufacture, Manufacture Stock Entry)
- Batch and serial tracking, and quality inspection
- The Frappe REST API behind these workflows

**Out of scope:** ERPNext source-code testing and unrelated ERPNext modules.

## 3. Approach

1. **Manual exploratory testing:** 11 charters, with screenshot evidence kept in `Manual-Exploratory-evidence/`.
2. **UI automation (Playwright):** page object model, fixtures and stored authentication state (`tests/auth.setup.ts` saves `.auth/user.json` for faster logins). Locators were identified with Playwright codegen.
3. **API testing (Postman):** a 73-request collection using token authentication. Scripts assert `docstatus`, business status and stock effects, not just HTTP codes.
4. **Database validation:** SQL checks against MariaDB.
5. **Performance testing (JMeter):** baseline, load, three stress configurations and a 30-minute endurance run.
6. **Quality gates and CI:** lint, typecheck and format checks before pushing, plus a GitHub Actions Playwright workflow.

Credentials are supplied through environment variables (`.env`, never committed), with `.env.example` provided.

## 4. Results at a Glance

| Test type                 |        Executed |     Passed | Failed / issues                  | Outcome                |
| ------------------------- | --------------: | ---------: | -------------------------------- | ---------------------- |
| Manual exploratory        |     11 charters |        n/a | 2 defects, 1 environment blocker | Defects raised         |
| Playwright UI             |              20 |         20 | 0                                | Pass                   |
| Postman API               |              73 | 69 (94.5%) | 4                                | Mostly pass            |
| JMeter stress (3 runs)    |             n/a |        n/a | 0% errors                        | Pass                   |
| JMeter endurance (30 min) | 115,676 samples |        n/a | 22 failed (0.02%)                | Pass with observations |

## 5. Manual Exploratory Testing

Eleven exploratory charters covered the core procurement-to-manufacturing flow. They produced three notable findings.

| ID                                | Finding                                                                                                            | Classification                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| GLP-CAP001-002 (CH-009, TEST-092) | Material Issue was allowed even though the outgoing quality inspection was **Rejected**.                           | Defect                                          |
| TEST-091                          | Both an **Accepted** and a **Rejected** outgoing inspection were submitted against Work Order `MFG-WO-2026-00004`. | Defect                                          |
| CH-011 (TEST-093)                 | A separate test user could not log in because the email login link did not work.                                   | Environment blocker, **not** a confirmed defect |

**Why the defects matter:** in a pharmaceutical setting, quality inspection is meant to gate stock movement. Issuing rejected material, or holding contradictory inspection outcomes on one Work Order, undermines traceability and batch-release control. Severity and priority ratings should be recorded in the defect report.

## 6. UI Automation (Playwright)

| Module                          |  Tests | Passed | Failed |
| ------------------------------- | -----: | -----: | -----: |
| Authentication                  |      7 |      7 |      0 |
| Inventory management            |     11 |     11 |      0 |
| Manufacturing (BOM, Work Order) |      2 |      2 |      0 |
| **Total**                       | **20** | **20** |  **0** |

Inventory coverage includes item groups, purchase receipts, stock management, stock reports and warehouses. All suites ran against the local instance.

**Observation:** manufacturing has only 2 UI tests compared with 11 for inventory. It is the highest-risk area and the thinnest in automated coverage.

## 7. API Testing (Postman)

The 73-request collection (34 GET, 31 POST, 4 PUT, 4 DELETE) has 62 requests with post-response test scripts and 8 with pre-request scripts.

| Folder                                 | Requests |
| -------------------------------------- | -------: |
| Authentication and onboarding          |        5 |
| Inventory                              |       18 |
| Procurement                            |        7 |
| Manufacturing                          |       30 |
| Negative / error handling / edge cases |       13 |

| Category    | Passed |  Total |      Rate |
| ----------- | -----: | -----: | --------: |
| Positive    |     57 |     60 |     95.0% |
| Negative    |     12 |     13 |     92.3% |
| **Overall** | **69** | **73** | **94.5%** |

**Execution note:** the positive tests form one dependent workflow (create purchase receipt, submit, BOM, Work Order, material transfer, finish, verify finished-goods stock). They change record state, so they should not be re-run blindly against the same data. A positive failure may come from document state or run order rather than a defect, so it needs checking before it is classified. The negative suite is safe to run in the Collection Runner.

**Gap:** the four failed requests are not individually identified in the README. They should be listed with their cause (defect, test-data state or script issue).

## 8. Performance Testing (JMeter)

Four GET endpoints were measured: Item, Warehouse, Bin and Work Order.

| Metric             | Baseline |  Load | Stress 10 | Stress 20 | Stress 30 | Endurance |
| ------------------ | -------: | ----: | --------: | --------: | --------: | --------: |
| Samples            |        4 |   100 |       200 |       400 |       600 |   115,676 |
| Average (ms)       |       90 |  58.8 |      55.6 |      61.0 |      75.6 |     459.2 |
| P95 (ms)           |      90* |  70.4 |        63 |        71 |        92 |       686 |
| P99 (ms)           |      90* | 114.1 |      74.1 |        82 |       111 |       919 |
| Throughput (req/s) |    11.08 | 10.87 |     19.71 |     37.76 |     55.09 |     64.26 |
| Error rate         |       0% |    0% |        0% |        0% |        0% |     0.02% |

\*Baseline percentiles are not meaningful because there was one sample per endpoint.

**Key points:**

- Throughput scaled with load, and the three stress runs had zero errors.
- During the 30-minute endurance run, average response time rose to about 459 ms (P95 686 ms, P99 919 ms).
- The 22 failures, 12 HTTP 401 and 10 HTTP 500, clustered around minutes 17 to 21. Possible causes include an expired session or token, or resource pressure on the local instance. This needs investigation.
- Results come from a single local machine, so they show relative behaviour rather than production capacity.

## 9. Database Validation

The README lists SQL / MariaDB validation as executed, covering cross-document checks between Work Orders, Stock Entries, Batches, Serial and Batch Bundles and Bin balances. No pass/fail figures are recorded yet, and the architecture diagram still marks it as planned. These need aligning.

## 10. Risks and Open Issues

1. **Quality-gate defects (TEST-091, TEST-092):** unresolved and affect stock control and traceability.
2. **Unexplained API failures:** 4 of 73 requests need root-cause analysis.
3. **Endurance 401/500 errors:** a cluster of 22 failures needs a cause.
4. **Role-based access untested at UI level:** the blocked test-user login (TEST-093) limits user-access coverage until the email login problem is fixed.
5. **Thin manufacturing UI coverage:** 2 tests for the most critical workflow.
6. **Environment limits:** a single local instance, so there is no production-like data, scale or network.
7. **Documentation inconsistency:** the database validation status differs between sections.

## 11. Recommendations

- Log TEST-091 and TEST-092 as formal defects with severity, steps to reproduce and evidence, and retest after any fix.
- Resolve the email login problem, or create the test user another way, then complete user-access testing.
- Triage the four failed API requests and record the outcome in the defect report.
- Add UI tests for quality inspection and for the manufacturing flow end to end.
- Re-run endurance testing with token and session monitoring to explain the 401 and 500 errors.
- Record database validation results with query evidence.
- Keep the CI pipeline running on every push so regressions are caught.

## 12. Conclusion

The automated suites show the core ERPNext workflows behaving as expected: all 20 UI tests passed, 94.5% of API requests passed, and the stress runs finished with no errors. Exploratory testing found the most important problem, that quality inspection outcomes do not reliably block or govern stock movement. Until the two defects are fixed and the open items closed, the quality-control controls cannot be considered verified for this pharmaceutical use case.
