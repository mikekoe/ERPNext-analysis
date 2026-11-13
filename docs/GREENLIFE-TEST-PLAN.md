# GREENLIFE PHARMACEUTICALS TEST PLAN

| Document Information | Details |
|---|---|
| Document ID | GLP-TP-001 |
| Project | ERPNext Quality Engineering Project |
| Organisation | Greenlife Pharmaceuticals Nigeria  |
| System Under Test | ERPNext with proposed pharmaceutical-specific customisations |
| Version | 1.0 |
| Status | Approved |
| Date | 12 November 2026 |
| Prepared By | Michael Adeyeye |

---

## 1. Scope

This Test Plan defines the quality engineering activities for evaluating ERPNext within a pharmaceutical manufacturing and inventory management case study based on Greenlife Pharmaceuticals Nigeria.

The testing will assess whether the configured ERPNext environment supports the defined business requirements, maintains data integrity, enforces appropriate business controls and provides reliable workflows for pharmaceutical manufacturing and inventory management.

The project focuses on two product categories: tablets and capsules.

The testing will cover the standard ERPNext functionality and any proposed pharmaceutical-specific customisations implemented in the test environment.

### 1.1 In-Scope 

**A. Inventory Management**

- Raw material registration and management.
- Material receipt and stock entry.
- Batch and lot identification.
- Manufacturing and expiry date recording.
- Stock balance validation.
- Material inspection and disposition.
- Rejected, quarantined and expired stock handling.
- Material availability and reservation.
- Finished-goods inventory management.
- Batch traceability and stock movement.

**B. Manufacturing Management**

- Product registration.
- Bill of Materials (BOM) creation and management.
- BOM approval and version control.
- Production planning.
- Work Order creation and management.
- Raw material allocation and consumption.
- Manufacturing execution.
- Production completion.
- Finished-product batch creation.

**C. Quality Management**

- Incoming material inspection.
- Inspection outcome validation.
- Rejected, accepted and quarantined material handling.
- In-process quality checks.
- Finished-product inspection.
- Batch release and rejection controls.
- Quality-related access restrictions.

**D. User Access and Accountability**

- User authentication.
- Role-based permissions.
- Access restrictions across inventory, manufacturing and quality operations.
- Validation of unauthorised actions.
- Transaction history and auditability.

### 1.2 Out-of-Scope Areas

- Financial accounting and general ledger validation.
- Payroll and human resource management.
- Sales, customer relationship management and marketing.
- Procurement supplier evaluation beyond material receipt and inventory-related requirements.
- Distribution, logistics and retail operations.
- Laboratory information management system (LIMS) integration.
- Direct integration with NAFDAC or other regulatory platforms.
- Physical laboratory testing of pharmaceutical products.
- Validation of actual drug formulations, dosage effectiveness or clinical outcomes.
- Formal GMP certification or regulatory compliance certification.

---

## 2. Test Objectives

The primary objective is to determine whether ERPNext, as configured for the case study, supports the defined pharmaceutical manufacturing and inventory management requirements.

The specific objectives are to:

1. Verify that raw materials can be registered, received and identified using appropriate batch information.
2. Determine whether inspection outcomes correctly control material availability.
3. Verify that expired, rejected or quarantined materials are appropriately restricted from production.
4. Validate inventory transactions, stock balances and material movements.
5. Verify that production activities reference the appropriate products and approved Bills of Materials.
6. Assess Work Order creation, material allocation and manufacturing execution.
7. Validate the recording of material consumption against production batches.
8. Verify that finished products undergo the required inspection before authorised release.
9. Assess traceability between finished-product batches and their source raw material batches.
10. Verify that role-based permissions prevent unauthorised business transactions.
11. Identify functional defects, data integrity issues, workflow weaknesses and unexpected system behaviour.
12. Evaluate API reliability, database consistency and application performance within the agreed test scope.
13. Provide evidence-based recommendations on the quality and readiness of the tested system.

---

## 3. Test Approach

The project will adopt a risk-based testing approach combining structured verification, exploratory testing and technical testing.

The approach will prioritise business-critical workflows and potential risks that could result in:

- Incorrect inventory balances.
- Expired or rejected materials entering production.
- Incorrect material consumption.
- Unauthorised production or batch release.
- Inaccurate batch genealogy.
- Inconsistent records across application interfaces and the database.

### 3.1 Test Levels

Testing will be performed at the following levels.

#### 3.1.1 Component Testing

Focuses on individual application components and isolated functionality.The objective is to identify defects within individual components before evaluating complete workflows.

#### 3.1.2 Integration Testing

Evaluates how different ERPNext modules and application components interact. The objective is to identify incorrect data exchange, workflow dependencies and transaction inconsistencies.

#### 3.1.3 System Testing

Evaluates ERPNext as a complete system against the defined business requirements.The objective is to determine whether the integrated system satisfies the defined requirements.

#### 3.1.4 Acceptance Testing

Evaluates whether the system supports the intended business processes and meets the documented user acceptance criteria. Final business acceptance should be performed or approved by designated business stakeholders.

### 3.2 Testing Types

#### 3.2.1 Functional Testing

Verifies that application features behave according to the documented business requirements. Coverage includes inventory transactions, batch management, manufacturing workflows, quality inspections and production activities. Exploratory testing will be documented in:

**GREENLIFE-EXPLORATORY-TESTING-CHARTER-AND-SESSION-LOG**


#### 3.2.2 Regression Testing
Regression coverage will prioritise business-critical inventory, manufacturing, quality and traceability workflows. Playwright automation will support repeatable regression checks where appropriate.

#### 3.2.3 Smoke Testing
Performs preliminary checks to establish whether the deployed test environment and its critical application functionality are sufficiently stable for further testing.Coverage includes application accessibility, authentication and basic navigation.

#### 3.2.4 Sanity Testing
Performs focused verification of specific functionality following a change or defect fix.

#### 3.2.5 Negative Testing
Evaluates how the system responds to invalid inputs, prohibited transactions and unexpected user actions.
Examples:

- Duplicate batch identifiers.
- Missing mandatory fields.
- Invalid manufacturing or expiry dates.
- Attempted use of rejected materials.
- Attempted production with unavailable stock.
- Unauthorised batch release.

#### 3.2.6 Boundary Value Testing

Investigates behaviour around important input boundaries.
Examples:

- Material expiring on the current date.
- Material expiring shortly after the current date.
- Zero or insufficient stock quantities.
- Minimum and maximum accepted quantities.
- Date combinations that may violate business rules.

Actual validation boundaries must be confirmed with business stakeholders.

#### 3.2.7 API Testing

Validates ERPNext application interfaces and relevant endpoints.

Coverage includes:

- HTTP status codes.
- Request and response validation.
- Authentication and authorisation.
- Required fields and data types.
- Positive and negative API scenarios.
- Data consistency between API responses and application records.
- Error handling.

Tools: Postman and Playwright API testing with TypeScript.

#### 3.2.8 Database Testing

Evaluates data integrity and consistency within the test database using approved read-only SQL queries and authorised database access.

Coverage includes:

- Inventory record consistency.
- Batch information validation.
- Material consumption records.
- Work Order references.
- Finished-product batch relationships.
- Duplicate or missing records.
- Data consistency following transactions.

Database testing must respect ERPNext's data model. Direct database modifications will not be used to bypass application business rules during normal test execution.

Tool: SQL.

#### 3.2.9 Performance Testing

Evaluates application responsiveness and behaviour under defined workload conditions.

Coverage may include:

- Inventory record retrieval.
- Batch searches.
- Work Order operations.
- API response times.
- Concurrent user activity.
- Application behaviour under increasing load.

Tool: Apache JMeter.

Performance targets, expected concurrent users, transaction volumes and acceptable response times must be agreed before formal performance execution.

#### 3.2.10 Security and Access Control Testing

Evaluates authentication, authorisation and role-based restrictions within the defined project scope.

Coverage includes:

- Unauthorised access attempts.
- Role-based permission enforcement.
- Restricted inventory transactions.
- Restricted quality approval and batch release.
- Access to sensitive business records.
**NB** It is not a comprehensive penetration test or security certification.

#### 3.2.11 Usability Testing

Evaluates whether users can understand and complete important business workflows effectively.

Coverage includes:

- Navigation.
- Form usability.
- Error messages.
- Data presentation.
- Workflow clarity.
- Feedback following important transactions.

### 3.3 Test Automation Strategy

Automation will support repeatable validation of selected business workflows and technical interfaces.

| Testing Area | Tool / Technology | Purpose |
|---|---|---|
| UI Automation | Playwright + TypeScript | Validate ERPNext user workflows |
| API Automation | Playwright API + TypeScript | Validate application endpoints |
| API Exploration | Postman | Investigate endpoints and request/response behaviour |
| Database Testing | SQL | Validate data integrity and consistency |
| Performance Testing | Apache JMeter | Evaluate application and API performance |
| Test Management | GitHub and project documentation | Manage testing artefacts and evidence |
| CI/CD Execution | GitHub Actions | Run automated QA checks |

Automation will prioritise stable, repeatable and business-critical checks.

Exploratory testing will remain a separate investigative activity and will not be replaced by automated scripts.

### 3.4 Test Environment

Testing will be conducted in a dedicated production ERPNext environment.


#### 3.4.1 Environment Requirements

| Component | Requirement |
|---|---|
| System Under Test | ERPNext |
| Application Environment | Dedicated development or QA environment |
| Database | ERPNext-supported database configured for the test environment |
| Browser | Current supported versions of Chrome and Firefox, with additional browsers where required |
| UI Automation | Playwright with TypeScript |
| API Testing | Postman and Playwright API |
| Database Validation | SQL client with authorised read-only access |
| Performance Testing | Apache JMeter |
| Version Control | Git and GitHub |
| Automation Execution | GitHub Actions where environment access permits |

Exact ERPNext, Frappe, database, browser and operating system versions will be recorded after the test environment has been provisioned.

#### 3.4.2 Environment Configuration

The environment should provide:

- ERPNext installation and required application modules.
- Configured inventory and manufacturing workflows.
- Required pharmaceutical-specific customisations.
- Test user accounts with different roles.
- Appropriate sample products and Bills of Materials.
- Sample raw material and finished-product batches.
- Configured inspection and approval workflows.
- Access to relevant application APIs.
- Controlled access to the test database.

---

## 4. Test Entry and Exit Criteria

### 4.1 Entry Criteria

Testing may commence when the following conditions have been satisfied:

1. The Business Requirements Document has been reviewed and baselined.
2. The project scope and relevant business processes have been identified.
3. User acceptance criteria have been documented in the Test Plan.
4. The ERPNext test environment has been deployed and is accessible.
5. Required ERPNext modules and proposed customisations are available for testing.
6. Relevant user roles and permissions have been configured.
7. Initial test data has been prepared.
8. Required test accounts and access credentials are available.
9. Testing tools and automation frameworks have been configured where applicable.
10. Critical environment-blocking defects have been resolved.
11. Test execution responsibilities and defect reporting procedures have been established.
12. Relevant stakeholders have reviewed the testing approach.


### 4.2 Exit Criteria
1. All in-scope business areas have undergone testing.
2. All documented user acceptance criteria have been investigated and their outcomes recorded.
3. Critical business workflows have been tested.
4. Planned test levels and testing types have been executed or formally identified as not applicable.
5. Exploratory testing sessions have been documented, including observations, findings and outstanding risks.
6. All identified defects have been recorded, prioritised and assigned an appropriate status.
7. Critical and high-severity defects have been resolved and successfully retested, or formally accepted as outstanding risks by authorised stakeholders.
8. Relevant regression testing has been completed following fixes and significant changes.
9. API and database validation results have been documented.
10. Performance testing results have been documented against agreed performance criteria, where performance testing is in scope.
11. Outstanding defects, limitations and untested areas have been communicated.
12. A final Test Execution and Quality Report has been prepared.
13. A quality assessment and release recommendation have been communicated to the relevant stakeholders.

**Important:** Test completion does not automatically mean the system is approved for production release. The final release decision remains with the authorised business and project stakeholders.

---

## 5. Risks and Mitigation

The following risks may affect the quality, completeness or reliability of testing.

| ID | Risk | Potential Impact | Mitigation |
|---|---|---|---|
| RISK-001 | Incomplete or ambiguous business requirements | Incorrect interpretation of expected system behaviour | Review requirements with stakeholders and clarify unresolved business rules before acceptance decisions |
| RISK-002 | Inaccurate or incomplete pharmaceutical-specific customisations | Important business controls may not work as expected | Validate customisations against approved requirements and investigate relevant workflows |
| RISK-003 | Inadequate test data | Important scenarios may not be investigated | Prepare controlled positive, negative, boundary, duplicate and restricted test data |
| RISK-004 | Expired or rejected materials are incorrectly made available for production | Potential use of unsuitable materials in manufacturing | Prioritise batch disposition, expiry and material issue controls during exploratory and functional testing |
| RISK-005 | Incorrect inventory balances | Stock discrepancies and unreliable production planning | Perform transaction-level checks and database consistency validation |
| RISK-006 | Incomplete batch traceability | Difficulty identifying source materials used in finished products | Validate batch genealogy from raw material receipt through manufacturing and finished goods |
| RISK-007 | Incorrect BOM or Work Order configuration | Incorrect production planning or material consumption | Verify product, BOM and Work Order relationships |
| RISK-008 | Unauthorised users can perform restricted activities | Unapproved transactions or batch release | Perform role-based access control and negative testing |
| RISK-009 | Test environment instability | Interrupted testing and unreliable results | Validate environment availability, monitor failures and document environment-related blockers |
| RISK-010 | Uncontrolled changes to test data | Inconsistent results and difficult defect reproduction | Maintain identifiable test records and document data changes |
| RISK-011 | Automation instability or flaky tests | False failures and unreliable regression results | Use stable locators, appropriate waits, controlled test data and investigate intermittent failures |
| RISK-012 | Performance expectations are undefined | Inability to determine whether performance is acceptable | Agree workload models, response-time targets and capacity expectations before formal performance testing |
| RISK-013 | Limited stakeholder availability | Delays in requirement clarification and business acceptance | Identify stakeholders and schedule reviews and acceptance activities early |
| RISK-014 | ERPNext updates or customisation changes during testing | Previously validated functionality may regress | Record environment versions, control changes and execute relevant regression tests |
| RISK-015 | Incomplete auditability of important transactions | Difficulty investigating business transactions and quality decisions | Validate available transaction histories, user references and audit records |

### 5.1 Risk Prioritisation

Testing effort will be prioritised according to business impact and likelihood of failure.

**High Priority**

- Expired, rejected or quarantined materials entering production.
- Incorrect inventory quantities.
- Unauthorised batch release.
- Incorrect material consumption.
- Incomplete finished-product traceability.
- Incorrect manufacturing records.

**Medium Priority**

- Incorrect workflow transitions.
- Inaccurate reporting.
- Non-critical data validation issues.
- Usability issues affecting business efficiency.

**Low Priority**

- Minor visual inconsistencies.
- Non-critical layout issues.
- Cosmetic issues without significant business impact.

### 5.2 Risk Management and Reporting

All identified risks will be documented and reviewed throughout the testing lifecycle.

---

## Document Control and Approval

| Role | Responsibility | Approval Status |
|---|---|---|
| Quality Engineer | Prepare and maintain the Test Plan | Approved |
| Business Representative | Review business scope and acceptance criteria | Approved |
| ERPNext / Technical Representative | Confirm environment and system configuration | Approved |
| Project Stakeholder | Review testing outcomes and release recommendation | Approved |

### Document Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 12 November 2026 | Initial Test Plan |

---
