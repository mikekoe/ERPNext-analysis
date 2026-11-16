# GREENLIFE PHARMACEUTICALS NIGERIA

# TEST EXECUTION REPORT

**Application:** ERPNext – Greenlife Pharmaceuticals Case Study  
**System Under Test:** ERPNext  
**Testing Type:** Exploratory and Functional Testing (Manual)  
**Business Areas Covered:** Raw Material Management, Inventory Management, Product and BOM Management, Production Planning, Manufacturing Execution, Finished Product Inspection and Release, User Roles and Access
**Report Date:** 15 November 2026  
**Prepared By:** Michael Adeyeye
**Document ID:** GLP-TEST-REPORT-001  
**Version:** 0.1 – Initial Draft

---

# 1. Introduction and Basis of Testing

The Greenlife Pharmaceuticals ERPNext project was designed to evaluate the suitability and behaviour of ERPNext in supporting pharmaceutical manufacturing and inventory management processes.

Testing was conducted primarily through exploratory and functional manual testing. The objective was to investigate how the system behaves under common operational scenarios, including raw material receipt, incoming quality inspection, inventory management, production planning, manufacturing execution, finished-product inspection and user access.

The assessment was guided by the Greenlife Business Requirements Document (GLP-BRD-001), the associated Test Plan and the proposed pharmaceutical business controls documented for this case study.

The testing approach considered established quality engineering principles, including:

- Functional correctness and business-rule enforcement.
- Data integrity and inventory accuracy.
- Batch identification and traceability.
- Material availability and consumption.
- Manufacturing transaction integrity.
- Quality inspection and product disposition.
- Role-based access and operational accountability.

Particular attention was given to identifying potential control gaps where system behaviour could conflict with the proposed pharmaceutical business requirements.

Where an observation is based on a proposed business control rather than a verified native ERPNext requirement, it is identified as a potential control gap requiring further validation.

This project represents a controlled portfolio case study using a locally configured ERPNext environment. It does not represent a verified implementation or production deployment at Greenlife Pharmaceuticals Nigeria.

## 1.1 How This Report Is Organised

- **Section 2:** Summary of findings and their classifications.
- **Section 3:** Detailed findings, including observed behaviour, impact, probable causes, recommendations and retest criteria.
- **Section 4:** Cross-cutting observations and recommendations.
- **Section 5:** Prioritised action plan.
- **Section 6:** Testing limitations, conclusion and verdict.

---

# 2. Summary of Findings

The following findings were identified during exploratory testing.

Severity guide:

- **High:** Potentially affects a critical business control, product disposition or inventory integrity.
- **Medium:** Weakens functional consistency, data quality or operational control.
- **Low:** Minor usability or presentation issue.
- **Blocker:** Prevents completion of an intended test activity.

| S/N | Module / Area                           | Problem Identified                                                                                  | Classification                            | Status              |
| --- | --------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------- |
| 1   | Finished Product Inspection and Release | Material Issue was successfully submitted despite a submitted Rejected outgoing Quality Inspection. | Potential High                            | Needs Investigation |
| 2   | User Access and Authentication          | Unable to authenticate using a separate test account because the email login link did not work.     | Test Environment / Authentication Blocker | Blocked             |

**Summary:** Three significant findings are documented in this initial report. Two require investigation against the intended business controls. One prevented completion of an access-control test.

These classifications are provisional and should not be interpreted as confirmed defects in ERPNext core functionality.

---

# 3. Detailed Findings

## F-01 | Conflicting Outgoing Quality Inspection Results Accepted

**Module / Area:** Quality Inspection / Finished Product Release

**Related Charter:** CH-009 – Finished Product Inspection and Release

**Test Scenario:** TEST-091

**Severity:** Potential Medium

**Status:** Needs Investigation

### Problem Identified

An outgoing Quality Inspection with status Accepted had already been submitted against Work Order MFG-WO-2026-00004.

A second outgoing Quality Inspection with status Rejected was subsequently submitted against the same Work Order.

ERPNext permitted both inspection records to be submitted.

### Impact / Risk

- Conflicting inspection results may create uncertainty about the quality status of a manufactured batch.
- Users may not know which inspection result should determine product disposition.
- The absence of a clearly enforced inspection revision or disposition process could weaken release controls.
- Subsequent inventory transactions may rely on an incorrect or ambiguous quality status.

### Probable Cause (For Developer Verification)

Possible explanations include:

- The system allows multiple inspection records against the same reference without enforcing a disposition workflow.
- Inspection records may be treated as independent documents.
- No configured rule may determine which inspection result takes precedence.
- Batch-level inspection status may not be automatically updated when another inspection is submitted.

### Recommended Solution

- Define whether multiple inspections are permitted for a manufacturing reference or finished-product batch.
- Establish a controlled process for repeat inspections and inspection corrections.
- Define how superseded inspection records are identified.
- Ensure the effective batch disposition is unambiguous.
- Restrict release and dispatch decisions to the effective authorised disposition.
- Preserve the history of previous inspection results.

### Retest / Acceptance Criteria

- The system follows the approved rules for repeat inspections.
- Conflicting inspection results cannot create an ambiguous release state.
- Superseded inspection records remain traceable.
- The effective batch disposition is clearly identifiable.
- Material Issue is restricted according to the effective disposition.

**Evidence Required:** Both Quality Inspection document IDs, Work Order reference and screenshots showing the respective inspection results.

---

## F-02 | Unable to Authenticate Using a Separate Test Account

**Module / Area:** Authentication / User Access Management

**Related Charter:** CH-011 – User Access and Operational Accountability

**Severity:** High

**Status:** Blocked – Investigation Required

### Problem Identified

An attempt was made to authenticate using a separate test account to evaluate user access restrictions.

The email login link did not work, preventing successful authentication.

Consequently, the intended test of unauthorised access to restricted manufacturing operations could not be completed.

### Impact / Risk

- Production-user and inventory-user access restrictions remain insufficiently verified.
- Unauthorised access controls could not be fully evaluated.
- The role-based access test remains incomplete.
- The intended assessment of restricted manufacturing and inventory operations could not be performed.

### Probable Cause (For Investigation)

The root cause has not been established.

Possible investigation areas include:

- Email delivery configuration in the local ERPNext environment.
- Expired or invalid authentication links.
- Incorrect hostname or site URL in the generated login link.
- Authentication token validation.
- Browser or session-related restrictions.

These are investigation possibilities and not confirmed causes.

### Recommended Solution

- Investigate the local ERPNext email and authentication configuration.
- Verify that the generated authentication link uses the correct site URL.
- Confirm that the link is valid and has not expired.
- Repeat the authentication test using a dedicated test account.
- Verify access permissions after successful login.
- If the issue is environment-related, document it as an environment blocker rather than a confirmed ERPNext product defect.

### Retest / Acceptance Criteria

- The separate test account can authenticate successfully.
- The account can access the functions permitted by its assigned roles.
- Restricted operations are inaccessible to unauthorised users.
- Access restrictions are enforced by the application and not merely hidden in the interface.
- Authentication failures provide useful diagnostic information.

**Evidence Required:** Test account identifier, authentication email with sensitive information redacted, screenshot of the failed login attempt and browser response.

---

# 4. Cross-Cutting Observations and Recommendations

The exploratory assessment identified areas where additional configuration, validation and business-rule enforcement may be required.

### 4.1 Quality Disposition and Inventory Control

The relationship between Quality Inspection results and inventory transactions requires further investigation.

A rejected inspection should have a clearly defined effect on the availability and movement of the affected batch.

Recommended actions:

- Define the lifecycle of raw material and finished-product quality disposition.
- Establish clear statuses for Accepted, Rejected and Quarantined materials.
- Define which warehouse movements are permitted for each disposition.
- Ensure rejected finished products cannot be issued or dispatched.
- Validate these restrictions at the server level.

### 4.2 Inspection Record Management

Multiple inspections against the same manufacturing reference require a controlled approach.

Recommended actions:

- Define rules for repeat inspections.
- Establish inspection revision and supersession behaviour.
- Maintain an auditable history of inspection results.
- Ensure the effective inspection disposition is identifiable.

### 4.3 User Access and Accountability

Authentication and role-based access remain important areas for further verification.

Recommended actions:

- Establish dedicated production and inventory test accounts.
- Define role-based permission matrices.
- Test both authorised and unauthorised operations.
- Verify access restrictions on the server side.
- Ensure manufacturing and inventory transactions capture user accountability.

### 4.4 Batch Traceability

Batch identification and traceability are central to the pharmaceutical case study.

Recommended actions:

- Verify links between Purchase Receipts, incoming inspections, batches, Work Orders, Manufacture Stock Entries and finished-product records.
- Confirm that batch information remains consistent across stock movements.
- Validate manufacturing and expiry date records.
- Verify that inventory balances reconcile across relevant warehouses.

---

# 5. Prioritised Action Plan

| Priority    | Action                                                                                               | Responsible Area            |
| ----------- | ---------------------------------------------------------------------------------------------------- | --------------------------- |
| P1 – High   | Investigate and enforce finished-product disposition restrictions before Material Issue or dispatch. | Development / Quality       |
| P1 – High   | Define the effective inspection disposition when multiple conflicting inspections exist.             | Quality / Development       |
| P2 – Medium | Investigate test-account authentication and local email-link configuration.                          | ERPNext Administration      |
| P2 – Medium | Complete production-user and inventory-user role-based access testing.                               | QA / ERPNext Administration |
| P2 – Medium | Validate batch traceability across procurement, inspection, manufacturing and finished goods.        | QA / Inventory / Quality    |
| Ongoing     | Retest identified issues and perform regression testing after corrective changes.                    | QA / Development            |

Priorities are provisional and should be confirmed through business risk assessment and agreement with the relevant stakeholders.

---

# 6. Testing Limitations, Conclusion and Recommendations

## 6.1 Testing Limitations

The assessment was primarily exploratory and manual. It was not a complete verification of every requirement in the Business Requirements Document.

The following activities were not completed as part of this manual-testing phase:

- Performance and load testing using Apache JMeter.
- Automated UI testing using Playwright and TypeScript.
- API testing and automated API regression.
- Read-only SQL database validation.
- Formal security and penetration testing.
- Cross-browser and accessibility testing.
- Complete regression testing following corrective changes.

Some planned scenarios were not executed or were not fully verified. Their status must remain Not Executed, Blocked or Inconclusive as appropriate.

The findings in this report are based on behaviour observed in the local ERPNext case-study environment. They should not be interpreted as evidence of defects in Greenlife Pharmaceuticals' actual production systems.

## 6.2 Conclusion

The exploratory assessment demonstrated that ERPNext can support several core activities within the proposed pharmaceutical manufacturing and inventory workflow.

During the case study, capsule manufacturing Work Orders were successfully processed, Manufacture Stock Entries were submitted, finished-product batches were created, and outgoing Quality Inspections were recorded.

However, testing also identified important areas requiring further investigation, particularly the relationship between quality inspection results and finished-goods inventory movement.

Additionally, the acceptance of conflicting inspection results and the inability to authenticate using a separate test account leave important quality and access-control questions unresolved.

These findings should be investigated, addressed where necessary and retested before the affected workflows can be considered adequately verified.

## 6.3 Recommendation

**CONDITIONAL – FURTHER VALIDATION REQUIRED**

The tested workflows should not be considered fully verified for production readiness based on this assessment alone.

Before any production-readiness recommendation can be made:

1. Finished-product release and dispatch controls must be validated.
2. Conflicting inspection-result handling must be defined and verified.
3. User authentication and role-based access testing must be completed.
4. Outstanding requirements must be reconciled against the RTM.
5. Identified issues must be retested.
6. API, database, performance and automated regression testing must be completed as planned.
7. Relevant business stakeholders must review and approve the applicable requirements and release controls.

**Final QA Position:** The current findings demonstrate areas of risk and incomplete verification. A production-readiness decision remains outside the scope of this initial exploratory assessment.

---
