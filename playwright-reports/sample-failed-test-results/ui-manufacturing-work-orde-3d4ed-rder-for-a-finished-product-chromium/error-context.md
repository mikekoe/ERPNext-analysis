# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/manufacturing/work-order.spec.ts >> Create and start a Work Order for a finished product
- Location: tests/ui/manufacturing/work-order.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="listbox"]:visible').getByRole('option', { name: 'Work In Progress - GP', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[role="listbox"]:visible').getByRole('option', { name: 'Work In Progress - GP', exact: true }) with timeout 5000ms
  - waiting for locator('[role="listbox"]:visible').getByRole('option', { name: 'Work In Progress - GP', exact: true })

```

```yaml
- navigation "Apps":
    - link "All apps":
        - /url: /desk
        - img "ERPNext"
    - button "Search"
    - button "Notifications": '15'
    - button "Setup"
    - button "Accounts"
    - button "Selling"
    - button "Buying"
    - button "Stock"
    - button "Manufacturing"
    - button "Projects"
    - button "Assets"
    - button "Quality"
    - button "User Menu": A
- text: Manufacturing
- button "Sidebar Menu"
- link "Home":
    - /url: /desk/manufacturing
- link "Dashboard":
    - /url: /desk/manufacturing/dashboard-view/Manufacturing
- link "BOM":
    - /url: /desk/manufacturing/bom
- link "Production Plan":
    - /url: /desk/manufacturing/production-plan
- link "Work Order":
    - /url: /desk/manufacturing/work-order
- link "Job Card":
    - /url: /desk/manufacturing/job-card
- link "Stock Entry":
    - /url: /desk/manufacturing/stock-entry
- text: Reports
- button
- text: Subcontracting
- button
- text: Tools
- button
- text: Setup
- button
- button "Collapse sidebar"
- banner
- navigation "Breadcrumb":
    - list:
        - listitem:
            - link "Work Order":
                - /url: /desk/work-order
        - listitem: New Work Order
- text: Not Saved
- button "Save"
- tablist:
    - listitem:
        - tab "Production Item"
    - listitem:
        - tab "Scheduling & Costing"
    - listitem:
        - tab "Job Cards"
    - listitem:
        - tab "Material Requests"
    - listitem:
        - tab "Stock Entries"
    - listitem:
        - tab "More Info"
    - listitem:
        - tab "Connections"
- tabpanel "Production Item":
    - text: Company *
    - combobox: GreenLife Pharma
    - status: Begin typing for results.
    - text: company Series *
    - combobox:
        - option "MFG-WO-.YYYY.-" [selected]
    - text: naming_series Item To Manufacture *
    - combobox: TAB-001
    - text: production_item BOM No *
    - combobox: BOM-TAB-001-009
    - status: Begin typing for results.
    - text: bom_no Qty To Manufacture *
    - textbox: '3.000'
    - text: qty Sales Order
    - combobox
    - status: Begin typing for results.
    - text: sales_order
    - checkbox "Allow Alternative Item"
    - text: Allow Alternative Item
    - paragraph
    - text: allow_alternative_item Warehouse Work-in-Progress Warehouse *
    - combobox: Work In Progress - GP
    - text: This is a location where operations are executed. wip_warehouse Target Warehouse *
    - combobox: Finished Goods - GP
    - text: This is a location where final product stored. fg_warehouse Scrap Warehouse
    - combobox
    - status: Begin typing for results.
    - text: This is a location where scraped materials are stored. scrap_warehouse
    - checkbox "Skip Material Transfer to WIP Warehouse"
    - text: Skip Material Transfer to WIP Warehouse
    - paragraph: Check if material transfer entry is not required
    - text: skip_transfer Required Items
    - checkbox "Use Multi-Level BOM" [checked]
    - text: Use Multi-Level BOM
    - paragraph: Plan material for sub-assemblies
    - text: use_multi_level_bom Default source Warehouse
    - combobox
    - status: Begin typing for results.
    - text: This is a location where raw materials are available. source_warehouse required_items
    - checkbox
    - text: No. Item Code Source Warehouse Required Qty Transferred Qty Consumed Qty Returned Qty
    - checkbox
    - text: '1'
    - 'link "API-001: Synthetic API A"':
        - /url: /desk/item/API-001
    - link "Work In Progress - GP":
        - /url: /desk/warehouse/Work%20In%20Progress%20-%20GP
    - text: '1.000 0 0 0 Editing Row #2'
    - button "Collapse"
    - button "Move"
    - text: Operation
    - combobox [expanded]:
        - listbox:
            - 'option "Filtered by: Parent equals \"BOM-TAB-001-009\" and Parenttype equals \"BOM\"." [selected]':
                - paragraph: 'Filtered by: Parent equals "BOM-TAB-001-009" and Parenttype equals "BOM".'
            - option "Create a new Operation":
                - paragraph: Create a new Operation
            - option "Advanced Search":
                - paragraph: Advanced Search
    - status: 3 results found
    - text: operation Item Code
    - 'link "PKG-003: Blister Packaging Material - Batch Tracked"':
        - /url: /desk/item/PKG-003
    - text: item_code Source Warehouse
    - combobox
    - status: No results found
    - text: source_warehouse Operation Row Id 0 operation_row_id Item Name Blister Packaging Material - Batch Tracked item_name
    - checkbox "Allow Alternative Item"
    - text: Allow Alternative Item
    - paragraph
    - text: allow_alternative_item
    - checkbox "Include Item In Manufacturing" [checked]
    - text: Include Item In Manufacturing
    - paragraph
    - text: include_item_in_manufacturing Qty Required Qty 2.000 required_qty Stock UOM
    - link "roll":
        - /url: /desk/uom/roll
    - text: stock_uom Rate ₦ 500.00 rate Amount ₦ 1,000.00 amount Transferred Qty 0 transferred_qty Requested Qty 0 requested_qty Picked Qty 0 picked_qty Consumed Qty 0 consumed_qty Returned Qty 0 returned_qty Subcontracted Qty 0 subcontracted_qty Available Qty at Source Warehouse 31.667 available_qty_at_source_warehouse Available Qty at WIP Warehouse 0 available_qty_at_wip_warehouse Stock Reserved Qty 0 stock_reserved_qty
    - checkbox "Is Additional Item" [disabled]
    - text: Is Additional Item
    - paragraph
    - text: is_additional_item
    - checkbox "Is Customer Provided Item" [disabled]
    - text: Is Customer Provided Item
    - paragraph
    - text: 'is_customer_provided_item Shortcuts: Ctrl + Up . Ctrl + Down . ESC'
- paragraph
- contentinfo
- navigation:
    - img
    - text: November, 2026
    - img
- text: 'Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 1 2 3 4 5 05 : 26 : 40'
- slider: '5'
- slider: '26'
- slider: '40'
- text: Today
- navigation:
    - img
    - text: November, 2026
    - img
- text: 'Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 1 2 3 4 5 05 : 26 : 40'
- slider: '5'
- slider: '26'
- slider: '40'
- text: Today
- navigation:
    - img
    - text: November, 2026
    - img
- text: Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 1 2 3 4 5 Today
- navigation:
    - img
    - text: November, 2026
    - img
- text: 'Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 1 2 3 4 5 05 : 26 : 40'
- slider: '5'
- slider: '26'
- slider: '40'
- text: Today
- navigation:
    - img
    - text: November, 2026
    - img
- text: 'Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 1 2 3 4 5 05 : 26 : 40'
- slider: '5'
- slider: '26'
- slider: '40'
- text: Today
- alert:
    - text: 'Source Warehouse: Work In Progress did not match any results.'
    - button "Close"
```

# Test source

```ts
  9   |   await page.getByRole('link', { name: 'ERPNext' }).click();
  10  |
  11  |   await expect(page.getByRole('navigation', { name: 'Apps' })).toBeVisible();
  12  |
  13  |   await page
  14  |     .getByRole('button', {
  15  |       name: 'Manufacturing',
  16  |       exact: true,
  17  |     })
  18  |     .click();
  19  |
  20  |   await page
  21  |     .getByRole('link', {
  22  |       name: 'Work Order',
  23  |       exact: true,
  24  |     })
  25  |     .click();
  26  |
  27  |   await expect(page.getByRole('button', { name: 'List View' })).toBeVisible();
  28  |
  29  |   await page.getByRole('button', { name: 'Add Work Order' }).click();
  30  |
  31  |   // Set production quantity and select the finished product.
  32  |   await expect(page.getByRole('tabpanel', { name: 'Production Item' })).toBeVisible();
  33  |
  34  |   await page.getByRole('textbox').fill('3');
  35  |
  36  |   const productionItem = page.getByRole('combobox').nth(2);
  37  |   await productionItem.fill('TAB');
  38  |
  39  |   const itemSuggestion = page
  40  |     .locator('[role="listbox"]:visible')
  41  |     .getByRole('option')
  42  |     .filter({ hasText: 'TAB-001' });
  43  |
  44  |   await expect(itemSuggestion).toBeVisible();
  45  |   await itemSuggestion.click();
  46  |
  47  |   // ERPNext automatically selects the BOM for TAB-001.
  48  |
  49  |   // Select the WIP warehouse.
  50  |   const wipWarehouseField = page.locator('.frappe-control[data-fieldname="wip_warehouse"]');
  51  |
  52  |   const wipWarehouseInput = wipWarehouseField.getByRole('combobox');
  53  |
  54  |   await wipWarehouseInput.fill('Work In Progress');
  55  |
  56  |   const wipSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
  57  |     name: 'Work In Progress - GP',
  58  |     exact: true,
  59  |   });
  60  |
  61  |   await expect(wipSuggestion).toBeVisible();
  62  |   await wipSuggestion.click();
  63  |
  64  |   await expect(wipWarehouseInput).toHaveValue('Work In Progress - GP');
  65  |
  66  |   // Select the Finished Goods warehouse.
  67  |   const fgWarehouseField = page.locator('.frappe-control[data-fieldname="fg_warehouse"]');
  68  |
  69  |   const fgWarehouseInput = fgWarehouseField.getByRole('combobox');
  70  |
  71  |   await fgWarehouseInput.fill('Finished Goods');
  72  |
  73  |   const fgSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
  74  |     name: 'Finished Goods - GP',
  75  |     exact: true,
  76  |   });
  77  |
  78  |   await expect(fgSuggestion).toBeVisible();
  79  |   await fgSuggestion.click();
  80  |
  81  |   await expect(fgWarehouseInput).toHaveValue('Finished Goods - GP');
  82  |
  83  |   // Verify the BOM-required items.
  84  |   const requiredItemsField = page.locator('.frappe-control[data-fieldname="required_items"]');
  85  |
  86  |   const requiredItemsGrid = requiredItemsField.locator('.form-grid');
  87  |
  88  |   const apiRow = requiredItemsGrid.locator('.grid-row[data-idx="1"]');
  89  |   const packagingRow = requiredItemsGrid.locator('.grid-row[data-idx="2"]');
  90  |
  91  |   await expect(apiRow).toContainText('API-001');
  92  |   await expect(packagingRow).toContainText('PKG-003');
  93  |
  94  |   // Configure source warehouses one row at a time.
  95  |   for (const row of [apiRow, packagingRow]) {
  96  |     await row.locator('.btn-open-row').click();
  97  |
  98  |     const sourceWarehouse = row.locator('.form-in-grid input[data-fieldname="source_warehouse"]');
  99  |
  100 |     await expect(sourceWarehouse).toBeVisible();
  101 |
  102 |     await sourceWarehouse.fill('Work In Progress');
  103 |
  104 |     const warehouseSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
  105 |       name: 'Work In Progress - GP',
  106 |       exact: true,
  107 |     });
  108 |
> 109 |     await expect(warehouseSuggestion).toBeVisible();
      |                                       ^ Error: expect(locator).toBeVisible() failed
  110 |     await warehouseSuggestion.click();
  111 |
  112 |     await expect(sourceWarehouse).toHaveValue('Work In Progress - GP');
  113 |
  114 |     // Collapse the current row before opening another one.
  115 |     await row
  116 |       .getByRole('button', {
  117 |         name: 'Collapse',
  118 |       })
  119 |       .click();
  120 |
  121 |     await expect(page.locator('#freeze')).toBeHidden();
  122 |   }
  123 |
  124 |   // Save and submit the Work Order.
  125 |   await page.getByRole('button', { name: 'Save' }).click();
  126 |
  127 |   await expect(page.getByRole('button', { name: 'Sidebar Menu' })).toBeVisible();
  128 |
  129 |   await page.getByRole('button', { name: 'Submit' }).click();
  130 |
  131 |   await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  132 |
  133 |   await page.getByRole('button', { name: 'Yes' }).click();
  134 |
  135 |   // Start the submitted Work Order.
  136 |   await expect(page.getByRole('button', { name: 'Status' })).toBeVisible();
  137 |
  138 |   await page.getByRole('button', { name: 'Start' }).click();
  139 |
  140 |   await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeVisible();
  141 |
  142 |   await page
  143 |     .getByRole('button', {
  144 |       name: 'Create',
  145 |       exact: true,
  146 |     })
  147 |     .click();
  148 |
  149 |   await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeHidden();
  150 |
  151 |   // ====== Configure the generated Material Transfer for Manufacture ========/
  152 |   const itemsGrid = page.locator('.frappe-control[data-fieldname="items"]');
  153 |   const firstItemRow = itemsGrid.locator('.grid-row[data-idx="1"]');
  154 |   const secondItemRow = itemsGrid.locator('.grid-row[data-idx="2"]');
  155 |
  156 |   const barcode = page.locator('input[data-fieldname="barcode"]:visible');
  157 |   const targetWarehouse = page.locator('input[data-fieldname="t_warehouse"]:visible');
  158 |
  159 |   // Configure each item row individually.
  160 |   for (const row of [firstItemRow, secondItemRow]) {
  161 |     // Open the current row's expanded editor.
  162 |     await expect(row).toBeVisible();
  163 |
  164 |     // Expand the current item row.
  165 |     await row.locator('.data-row > div:nth-child(8)').click();
  166 |
  167 |     await expect(page.getByRole('button', { name: 'Collapse', exact: true })).toBeVisible();
  168 |
  169 |     // Let Frappe finish moving focus to the first field.
  170 |     await expect(barcode).toBeFocused();
  171 |     await expect(targetWarehouse).toHaveValue('Work In Progress - GP');
  172 |     await targetWarehouse.click();
  173 |     await expect(targetWarehouse).toBeFocused();
  174 |     await targetWarehouse.press('ControlOrMeta+A');
  175 |     await targetWarehouse.press('Backspace');
  176 |     const option = page
  177 |       .locator('[role="listbox"]:visible')
  178 |       .getByRole('option', { name: 'Finished Goods - GP', exact: true });
  179 |     await expect(option).toBeVisible({ timeout: 10000 });
  180 |     await option.click();
  181 |     await expect(targetWarehouse).toHaveValue('Finished Goods - GP');
  182 |
  183 |     // Close the current row before opening the next.
  184 |     await page.getByRole('button', { name: 'Collapse', exact: true }).click();
  185 |
  186 |     // Do not open the next row until the editor has closed.
  187 |     await expect(page.locator('#freeze')).toBeHidden();
  188 |   }
  189 |
  190 |   await page.getByRole('button', { name: 'Save' }).click();
  191 |   await expect(page).toHaveURL(/MAT-STE-\d{4}-\d+/);
  192 |   await page.getByRole('button', { name: 'Submit' }).click();
  193 |   await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  194 |   await page.getByRole('button', { name: 'Yes' }).click();
  195 |
  196 |   // Return to the Work Order linked to this Material Transfer.
  197 |   await page.getByRole('link', { name: /^MFG-WO-/ }).click();
  198 |
  199 |   await expect(page.getByRole('button', { name: 'Finish', exact: true })).toBeVisible();
  200 |
  201 |   await page.getByRole('button', { name: 'Finish', exact: true }).click();
  202 |
  203 |   await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeVisible();
  204 |
  205 |   await page.getByRole('button', { name: 'Create', exact: true }).click();
  206 |
  207 |   // ==== Redirect to Manufacture stock entry to complete work order ======/
  208 |   await expect(page.getByRole('tabpanel', { name: 'Details' })).toBeVisible();
  209 |
```
