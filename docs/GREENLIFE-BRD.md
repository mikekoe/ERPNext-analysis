**BUSINESS REQUIREMENTS DOCUMENT (BRD)**

**Greenlife Pharmaceuticals Nigeria**

**Pharmaceutical Manufacturing and Inventory Management Using an ERP System**

| Document attribute    | Details                                   |
|-----------------------|-------------------------------------------|
| Document ID           | GLP-BRD-001                               |
| Organization          | Greenlife Pharmaceuticals Nigeria         |
| Project               | ERPNext System Implementation             |
| Version               | 1.0                                       |
| Baseline Date         | 11 November 2026                          |
| Prepared By           | Michael Adeyeye                           |
| System Under Test     | ERPNext with manufacturing customizations |
| Primary Product Types | Tablets and Capsules                      |
| Business Scope        | Manufacturing and Inventory Management    |

**1. Business Objectives**

The purpose of this BRD is to establish the business requirements that will guide system configuration assessment, test planning, test design, test execution, and quality reporting.

The project will evaluate ERPNext standard capabilities alongside proposed pharmaceutical-specific customizations. The objective is to determine whether the configured system supports the required business controls and behaves reliably under normal, exceptional, and negative conditions.

The following objectives are to be fulfilled:

| ID         | Business objective                     | Expected outcome                                                                                                            |
|------------|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| GL-OBJ-001 | Improve raw-material traceability      | Materials can be traced by supplier, receipt, batch, and stock movement.                                                    |
| GL-OBJ-002 | Strengthen inventory control           | Material quantities, locations, and stock statuses are accurately maintained.                                               |
| GL-OBJ-003 | Improve manufacturing record integrity | Production activities and material consumption are documented.                                                              |
| GL-OBJ-004 | Support batch-level traceability       | Finished-product batches can be linked to their consumed material batches.                                                  |
| GL-OBJ-005 | Strengthen quality controls            | Materials and finished products are subject to defined inspection and disposition controls.                                 |
| GL-OBJ-006 | Prevent unauthorised stock use         | Rejected, quarantined, or otherwise restricted materials cannot be issued for production without an authorised disposition. |
| GL-OBJ-007 | Improve expiry management              | Expiry information is recorded and used to support stock control.                                                           |
| GL-OBJ-008 | Improve accountability.                | Important transactions and changes are attributable to authorised users.                                                    |
| GL-OBJ-009 | Improve production planning            | Production quantities and material requirements can be calculated from approved BOMs.                                       |
| GL-OBJ-010 | Establish reliable quality evidence    | Business requirements can be verified through repeatable tests and documented results.                                      |

**2. Background**

Pharmaceutical manufacturing involves multiple interdependent activities. A failure in material identification, stock status control, production recording, or batch traceability can affect product quality and the reliability of manufacturing records.

Greenlife's ERP environment is modelled around two primary business functions:

1.  **Manufacturing:** Planning and recording the production of tablets and capsules.

2.  **Inventory management:** Controlling raw materials, packaging materials, work-in-progress, and finished goods.

The ERP system is expected to connect these activities so that material movements and production transactions can be traced to the relevant batches, users, and business records.

The solution will use ERPNext as its foundation, with pharmaceutical-specific customizations proposed where standard functionality does not adequately satisfy the requirements.

**3. Project Scope**

**3.1 In Scope**

The following business activities are included.

**A. Raw-material and packaging-material inventory**

- Creation and maintenance of material records.

- Classification of APIs, excipients, and packaging materials.

- Supplier-related material receipt records.

- Purchase receipt and inventory entry processes required for material intake.

- Batch and lot identification.

- Manufacturing and expiry date recording where applicable.

- Incoming quality inspection.

- Accepted, rejected, and quarantined stock statuses.

- Warehouse and storage-location management.

- Stock transfers and adjustments.

- Material availability and expiry monitoring.

**B. Tablet and capsule manufacturing**

- Product and formulation master data.

- BOM creation and maintenance.

- Production planning.

- Material requirement calculation.

- Work Order creation and management.

- Raw-material reservation and issue.

- Material consumption recording.

- Production operation and job-card records where configured.

- In-process quality inspections.

- Production quantity and yield recording.

- Reconciliation of planned and actual material consumption.

- Finished-product batch creation.

**C. Finished-goods inventory**

- Finished-product batch identification.

- Manufacturing and expiry date recording.

- Finished-product inspection.

- Quality disposition and batch release.

- Transfer into approved finished-goods inventory.

- Stock balance management.

- Batch-level stock traceability.

- Expiry monitoring.

- Stock movement history.

**D. System controls**

- User roles and permissions.

- Approval and authorisation controls.

- Audit trails for important transactions.

- Validation of mandatory data.

- Exception handling.

- Reports supporting inventory and manufacturing oversight.

**4.2 Out of Scope**

The following activities are excluded from this project's initial baseline:

- Customer relationship management.

- Customer quotations and sales orders.

- Finished-goods distribution and delivery management.

- Sales invoicing and customer payment collection.

- Full financial accounting and statutory reporting.

- Human resource and payroll management.

- Detailed laboratory instrument integration.

- Automated equipment and production-line control.

- Regulatory submission management.

- Full electronic batch-record validation or certification.

- Actual pharmaceutical formulation development.

These activities may be considered in a future project phase.

**5. Stakeholders and User Roles**

The following roles are proposed for the quality engineering. They must be given access rights to the actual ERPNext roles and permissions before test execution.

| Stakeholder / role        | Primary responsibility                                                      |
|---------------------------|-----------------------------------------------------------------------------|
| Management                | Business oversight and approval of major operational policies.              |
| Production Manager        | Production planning, Work Orders, and manufacturing oversight.              |
| Inventory Manager         | Warehouse control, stock movements, and inventory accuracy.                 |
| Quality Control Officer   | Inspection, sampling, test results, and quality records.                    |
| System Administrator      | ERP configuration, user administration, and technical support.              |
| Quality Engineer / Tester | Verification of requirements, controls, integrations, and system behaviour. |

**6. Business Process Overview**

**6.1 Raw-Material Receipt and Inspection**

1.  A material requirement is identified.

2.  A purchase order or approved procurement reference is created.

3.  Materials arrive at the receiving warehouse.

4.  The receiving officer records the receipt.

5.  Each applicable material batch is identified.

6.  Manufacturing and expiry dates are recorded where applicable.

7.  Incoming inspection is performed.

8.  Quality personnel record the inspection outcome.

9.  The material is assigned an approved, rejected, or quarantined disposition.

10. Inventory availability is updated according to the approved disposition.

**Expected control:** Materials that have not received the required approval must not be available for unrestricted production use.

**6.2 Inventory Management**

1.  Materials are registered against the appropriate item records.

2.  Stock is assigned to the appropriate warehouse or location.

3.  Batch and expiry information is maintained.

4.  Stock movements are recorded.

5.  Material availability is checked before production.

6.  Expired, rejected, or restricted materials are identified.

7.  Inventory balances are reconciled with recorded transactions.

**Expected control:** Inventory quantities and stock statuses must remain consistent with authorised transactions.

**6.3 Production Planning**

1.  A production requirement is identified.

2.  The relevant tablet or capsule product is selected.

3.  An approved BOM is selected.

4.  Required material quantities are calculated.

5.  Available inventory is checked.

6.  A Work Order is created.

7.  Materials are reserved or transferred for production.

**Expected control:** Production must use the applicable approved product specification and BOM version.

**6.4 Manufacturing Execution**

1.  Production personnel receive an authorised Work Order.

2.  Required raw materials are issued.

3.  The material batches used are recorded.

4.  Production operations are performed and documented.

5.  In-process checks are recorded where required.

6.  Actual material consumption and production quantities are captured.

7.  Production completion is recorded.

8.  A finished-product batch is created.

**Expected control:** The system must retain a traceable relationship between the production order, material batches, manufacturing records, and finished-product batch.

**6.5 Finished-Product Inspection and Release**

1.  The finished-product batch is presented for inspection.

2.  Required inspection results are recorded.

3.  Quality personnel review the results.

4.  The batch is approved, rejected, or placed on hold according to the configured procedure.

5.  Only an appropriately authorised user can perform the applicable release action.

6.  Approved stock is transferred or made available in the approved finished-goods inventory.

**Expected control:** A batch that has not passed the required quality disposition must not become unrestricted approved stock.

**7. Business Requirements**

**Requirement Priority Definitions**

| Priority | Meaning                                                                                                                 |
|----------|-------------------------------------------------------------------------------------------------------------------------|
| Critical | A failure could compromise material control, product quality, traceability, or a key authorization control.             |
| High     | A failure could materially affect manufacturing, inventory accuracy, or operational oversight.                          |
| Medium   | A failure could reduce usability, efficiency, or reporting quality without necessarily compromising a critical control. |
| Low      | A desirable improvement that has limited impact on core operations.                                                     |

**7.2. Functional Requirements**

**Pharmaceutical Material and Inventory Requirements**

| Requirement ID | Business requirement                                                                                            | Acceptance criteria                                                                                                                      | Priority |
|----------------|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|----------|
| GL-BR-001      | The system shall maintain unique item records for applicable APIs, excipients, and packaging materials.         | Each material has a unique identifier and required classification. Duplicate identifiers are prevented.                                  | High     |
| GL-BR-002      | The system shall capture batch or lot identification for materials requiring batch control.                     | A receipt cannot be completed without a valid batch identifier for batch-controlled items.                                               | Critical |
| GL-BR-003      | The system shall record manufacturing and expiry dates for materials where applicable.                          | Required date fields are validated, and invalid date relationships are rejected.                                                         | Critical |
| GL-BR-004      | The system shall maintain supplier and receipt references for incoming materials.                               | A material batch can be traced to its recorded supplier and receipt transaction.                                                         | High     |
| GL-BR-005      | The system shall support incoming material inspection before unrestricted use.                                  | Materials requiring inspection remain restricted until an authorised disposition is recorded.                                            | Critical |
| GL-BR-006      | The system shall support accepted, rejected, and quarantined material dispositions.                             | Each applicable material batch has a clear stock disposition, and restricted stock cannot be issued through normal production processes. | Critical |
| GL-BR-007      | The system shall prevent expired materials from being issued for production under the configured expiry policy. | An expired material batch is blocked from normal issue or requires an explicitly authorised exception where policy permits.              | Critical |
| GL-BR-008      | The system shall support warehouse and storage-location identification.                                         | Material balances can be viewed by item, warehouse, and applicable batch.                                                                | High     |
| GL-BR-009      | The system shall record inventory receipts, issues, transfers, and adjustments.                                 | Each completed stock transaction updates the relevant stock balance and creates a transaction record.                                    | High     |
| GL-BR-010      | The system shall provide visibility into material quantities and stock status.                                  | Users can distinguish available, restricted, rejected, and other configured stock categories.                                            | High     |
| GL-BR-011      | The system shall support expiry-based inventory monitoring.                                                     | Users can identify expired and approaching-expiry batches using configured reporting rules.                                              | High     |
| GL-BR-012      | The system shall retain the transaction history of batch-controlled materials.                                  | Users with appropriate permissions can review relevant receipts, issues, transfers, and adjustments.                                     | Critical |

**Product and Formulation Requirements**

| Requirement ID | Business requirement                                                                                           | Acceptance criteria                                                                                                | Priority |
|----------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|----------|
| GL-BR-013      | The system shall support product master records for tablets and capsules.                                      | Each product has a unique identifier and relevant product attributes.                                              | High     |
| GL-BR-014      | The system shall support approved Bills of Materials for tablet and capsule products.                          | A production order can reference the applicable approved BOM.                                                      | Critical |
| GL-BR-015      | The system shall calculate required material quantities from the selected BOM and planned production quantity. | Calculated quantities match the configured BOM quantities and production quantity rules.                           | Critical |
| GL-BR-016      | The system shall maintain controlled BOM changes.                                                              | Changes to an approved BOM are attributable to a user and retain the required change history or approval evidence. | Critical |
| GL-BR-017      | The system shall prevent production from using an inactive or unauthorised BOM.                                | An inactive or unauthorised BOM cannot be selected for a new production transaction under the configured rules.    | Critical |

**Production Planning and Manufacturing Requirements**

| Requirement ID | Business requirement                                                                                                 | Acceptance criteria                                                                                                 | Priority |
|----------------|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|----------|
| GL-BR-018      | The system shall support production planning for tablet and capsule products.                                        | An authorised user can create a production plan or equivalent planning record.                                      | High     |
| GL-BR-019      | The system shall support Work Order creation.                                                                        | A Work Order contains the selected product, BOM, planned quantity, and relevant production details.                 | Critical |
| GL-BR-020      | The system shall check material availability before production material issue.                                       | Insufficient available stock is identified and normal issue is prevented or handled according to configured policy. | Critical |
| GL-BR-021      | The system shall record the material batches issued to a production order.                                           | Each batch-controlled material issue is linked to the relevant Work Order or production record.                     | Critical |
| GL-BR-022      | The system shall record actual material consumption.                                                                 | Actual consumption is captured and associated with the production transaction.                                      | High     |
| GL-BR-023      | The system shall support production operation records where configured.                                              | Relevant operations or job cards can be created, updated, and linked to the Work Order.                             | Medium   |
| GL-BR-024      | The system shall support in-process quality inspection records.                                                      | Required in-process checks can be recorded with the relevant production reference, result, and responsible user.    | Critical |
| GL-BR-025      | The system shall record production output quantities.                                                                | Planned and actual production quantities are available for review.                                                  | High     |
| GL-BR-026      | The system shall support the recording of production losses, rejected quantities, or yield variances where required. | Variances can be documented and reviewed against configured production rules.                                       | High     |
| GL-BR-027      | The system shall create or associate a unique finished-product batch with completed production.                      | The finished batch has a unique identifier and a link to its originating production record.                         | Critical |

**Finished-Goods Inventory Requirements**

| Requirement ID | Business requirement                                                               | Acceptance criteria                                                                                         | Priority |
|----------------|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|----------|
| GL-BR-034      | The system shall maintain finished-product batch records.                          | Each finished batch has a unique identifier and relevant product reference.                                 | Critical |
| GL-BR-035      | The system shall record finished-product manufacturing and expiry dates.           | Required dates are available against the finished-product batch and validated.                              | Critical |
| GL-BR-036      | The system shall link finished-product batches to their source material batches.   | An authorised user can trace a finished batch back to the relevant material batches consumed in production. | Critical |
| GL-BR-037      | The system shall support finished-goods inventory balances by product and batch.   | Users can view quantities by product, batch, and warehouse.                                                 | High     |
| GL-BR-038      | The system shall support controlled movement of finished goods between warehouses. | Transfers retain the relevant product and batch identity and update stock balances accurately.              | High     |
| GL-BR-039      | The system shall support expiry monitoring for finished goods.                     | Expired and approaching-expiry finished batches can be identified through configured reports.               | High     |

**7.3. Non-Functional Requirements**

| Requirement ID | Category            | Requirement                                                                                           | Acceptance criteria                                                                            |
|----------------|---------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| GL-NFR-001     | Performance         | Common manufacturing and inventory transactions should respond within agreed performance targets.     | Response-time targets are documented and verified under representative workloads.              |
| GL-NFR-002     | Security            | Access to sensitive manufacturing and quality records must be restricted.                             | Unauthorised access attempts are denied.                                                       |
| GL-NFR-003     | Data integrity      | The system must preserve the accuracy and consistency of business records.                            | Tested transactions do not produce unexplained or inconsistent data.                           |
| GL-NFR-004     | Usability           | Validation errors should communicate what needs to be corrected.                                      | Users receive understandable messages for invalid or incomplete transactions.                  |
| GL-NFR-005     | Reliability         | The system should handle expected operational workloads without unexpected failures.                  | Agreed reliability and recovery expectations are verified.                                     |
| GL-NFR-006     | Backup and recovery | Business records should be covered by an approved backup and recovery approach.                       | Backup and restoration procedures are documented and tested by the responsible technical team. |
| GL-NFR-007     | Scalability         | The system should support expected growth in inventory records, batches, and production transactions. | Performance is evaluated against an agreed representative data volume.                         |

Performance thresholds, availability targets, recovery objectives, and expected transaction volumes must be agreed with the business before formal performance acceptance.

**8. Assumptions and Dependencies**

**8.1 Assumptions**

- ERPNext is the selected ERP platform for the case study.

- The system will be assessed with pharmaceutical-specific customisations.

- The product scope is limited to tablets and capsules.

- The business scope covers manufacturing and inventory management.

- Product formulations, BOM quantities, acceptance criteria, and manufacturing instructions will be provided by authorised business stakeholders or represented using clearly labelled synthetic test data.

- Actual user roles and approval responsibilities will be confirmed before testing.

- Quality inspection requirements will be defined for the relevant material and product categories.

- The project will use a controlled test environment or dry run in preparation for migration of live production data.

**8.2 Dependencies**

- Access to the configured ERPNext environment.

- Approved test accounts and user roles.

- Access to relevant application APIs.

- Approved database access for verification.

- Representative material, product, batch, and production test data.

- Documented quality inspection rules.

- Confirmed batch-release and material-disposition workflows.

- Documentation of any pharmaceutical-specific customisations.

- Agreement on performance targets and representative workloads.

**9. Quality Engineering / Testing Approach**

This BRD will serve as the foundation for a risk-based quality engineering process.

The following testing layers will be used:

| Testing layer                   | Tool / approach                   | Purpose                                                             |
|---------------------------------|-----------------------------------|---------------------------------------------------------------------|
| Functional testing              | Manual testing                    | Verify business rules and end-to-end workflows.                     |
| UI automation                   | Playwright with TypeScript        | Automate critical ERPNext user workflows.                           |
| API testing                     | Postman / Newman                  | Validate API responses, business rules, and transaction behaviour.  |
| Database testing                | SQL                               | Verify persisted records, relationships, and inventory consistency. |
| Performance testing             | Apache JMeter                     | Evaluate system behaviour under agreed representative workloads.    |
| Regression testing              | Playwright, API, and manual tests | Confirm that changes do not break existing functionality.           |
| Security and permission testing | Role-based and negative testing   | Verify access restrictions and controlled actions.                  |
| Exploratory testing             | Structured exploratory sessions   | Discover risks and defects not covered by scripted scenarios.       |

**10. Approval and Sign-Off**

The following approvals are proposed before the requirements baseline is treated as business-approved.

| Role                           | Approval responsibility                                      | Status   |
|--------------------------------|--------------------------------------------------------------|----------|
| Manager                        | Confirms business scope and process requirements.            | Approved |
| ERP / Technical Representative | Confirms ERPNext capabilities and customisation feasibility. | Pending  |
| Quality Assurance Tester       | Confirms requirements are testable and traceable.            | Pending  |

**22. Change History**

| **Version** | **Date**         | **Author**          | **Description**                                                                                                 |
|-------------|------------------|---------------------|-----------------------------------------------------------------------------------------------------------------|
| 1.0         | 11 November 2026 | Quality Engineering | Initial pharmaceutical manufacturing and inventory requirements baseline for Greenlife Pharmaceuticals Nigeria. |
