import { test, expect } from '@playwright/test';

test('Create and start a Work Order for a finished product', async ({ page }) => {
  // Open Manufacturing → Work Order.
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Search ⌘K' })).toBeVisible();

  await page.getByRole('link', { name: 'ERPNext' }).click();

  await expect(page.getByRole('navigation', { name: 'Apps' })).toBeVisible();

  await page
    .getByRole('button', {
      name: 'Manufacturing',
      exact: true,
    })
    .click();

  await page
    .getByRole('link', {
      name: 'Work Order',
      exact: true,
    })
    .click();

  await expect(page.getByRole('button', { name: 'List View' })).toBeVisible();

  await page.getByRole('button', { name: 'Add Work Order' }).click();

  // Set production quantity and select the finished product.
  await expect(page.getByRole('tabpanel', { name: 'Production Item' })).toBeVisible();

  await page.getByRole('textbox').fill('3');

  const productionItem = page.getByRole('combobox').nth(2);
  await productionItem.fill('TAB');

  const itemSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'TAB-001' });

  await expect(itemSuggestion).toBeVisible();
  await itemSuggestion.click();

  // ERPNext automatically selects the BOM for TAB-001.

  // Select the WIP warehouse.
  const wipWarehouseField = page.locator('.frappe-control[data-fieldname="wip_warehouse"]');

  const wipWarehouseInput = wipWarehouseField.getByRole('combobox');

  await wipWarehouseInput.fill('Work In Progress');

  const wipSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
    name: 'Work In Progress - GP',
    exact: true,
  });

  await expect(wipSuggestion).toBeVisible();
  await wipSuggestion.click();

  await expect(wipWarehouseInput).toHaveValue('Work In Progress - GP');

  // Select the Finished Goods warehouse.
  const fgWarehouseField = page.locator('.frappe-control[data-fieldname="fg_warehouse"]');

  const fgWarehouseInput = fgWarehouseField.getByRole('combobox');

  await fgWarehouseInput.fill('Finished Goods');

  const fgSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
    name: 'Finished Goods - GP',
    exact: true,
  });

  await expect(fgSuggestion).toBeVisible();
  await fgSuggestion.click();

  await expect(fgWarehouseInput).toHaveValue('Finished Goods - GP');

  // Verify the BOM-required items.
  const requiredItemsField = page.locator('.frappe-control[data-fieldname="required_items"]');

  const requiredItemsGrid = requiredItemsField.locator('.form-grid');

  const apiRow = requiredItemsGrid.locator('.grid-row[data-idx="1"]');
  const packagingRow = requiredItemsGrid.locator('.grid-row[data-idx="2"]');

  await expect(apiRow).toContainText('API-001');
  await expect(packagingRow).toContainText('PKG-001');

  // Configure source warehouses one row at a time.
  for (const row of [apiRow, packagingRow]) {
    await row.locator('.btn-open-row').click();

    const sourceWarehouse = row.locator('.form-in-grid input[data-fieldname="source_warehouse"]');

    await expect(sourceWarehouse).toBeVisible();

    await sourceWarehouse.fill('Work In Progress');

    const warehouseSuggestion = page.locator('[role="listbox"]:visible').getByRole('option', {
      name: 'Work In Progress - GP',
      exact: true,
    });

    await expect(warehouseSuggestion).toBeVisible();
    await warehouseSuggestion.click();

    await expect(sourceWarehouse).toHaveValue('Work In Progress - GP');

    // Collapse the current row before opening another one.
    await row
      .getByRole('button', {
        name: 'Collapse',
      })
      .click();

    await expect(page.locator('#freeze')).toBeHidden();
  }

  // Save and submit the Work Order.
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('button', { name: 'Sidebar Menu' })).toBeVisible();

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();

  await page.getByRole('button', { name: 'Yes' }).click();

  // Start the submitted Work Order.
  await expect(page.getByRole('button', { name: 'Status' })).toBeVisible();

  await page.getByRole('button', { name: 'Start' }).click();

  await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeVisible();

  await page
    .getByRole('button', {
      name: 'Create',
      exact: true,
    })
    .click();

  await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeHidden();

  // ====== Configure the generated Material Transfer for Manufacture ========/
  const itemsGrid = page.locator('.frappe-control[data-fieldname="items"]');
  const firstItemRow = itemsGrid.locator('.grid-row[data-idx="1"]');
  const secondItemRow = itemsGrid.locator('.grid-row[data-idx="2"]');

  const barcode = page.locator('input[data-fieldname="barcode"]:visible');
  const targetWarehouse = page.locator('input[data-fieldname="t_warehouse"]:visible');

  // Configure each item row individually.
  for (const row of [firstItemRow, secondItemRow]) {
    // Open the current row's expanded editor.
    await expect(row).toBeVisible();

    // Expand the current item row.
    await row.locator('.data-row > div:nth-child(8)').click();

    await expect(page.getByRole('button', { name: 'Collapse', exact: true })).toBeVisible();

    // Let Frappe finish moving focus to the first field.
    await expect(barcode).toBeFocused();
    await expect(targetWarehouse).toHaveValue('Work In Progress - GP');
    await targetWarehouse.click();
    await expect(targetWarehouse).toBeFocused();
    await targetWarehouse.press('ControlOrMeta+A');
    await targetWarehouse.press('Backspace');
    const option = page
      .locator('[role="listbox"]:visible')
      .getByRole('option', { name: 'Finished Goods - GP', exact: true });
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    await expect(targetWarehouse).toHaveValue('Finished Goods - GP');

    // Close the current row before opening the next.
    await page.getByRole('button', { name: 'Collapse', exact: true }).click();

    // Do not open the next row until the editor has closed.
    await expect(page.locator('#freeze')).toBeHidden();
  }

  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page).toHaveURL(/MAT-STE-\d{4}-\d+/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Return to the Work Order linked to this Material Transfer.
  await page.getByRole('link', { name: /^MFG-WO-/ }).click();

  await expect(page.getByRole('button', { name: 'Finish', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Finish', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Select Quantity' })).toBeVisible();

  await page.getByRole('button', { name: 'Create', exact: true }).click();

  // ==== Redirect to Manufacture stock entry to complete work order ======/
  await expect(page.getByRole('tabpanel', { name: 'Details' })).toBeVisible();

  // Locate the third item row in the Manufacture Stock Entry.
  const manufactureItemsGrid = page.locator('.frappe-control[data-fieldname="items"]');

  const thirdItemRow = manufactureItemsGrid.locator('.grid-row[data-idx="3"]');

  // Expand the third row to configure its Batch No.
  await expect(thirdItemRow).toBeVisible();

  await thirdItemRow.locator('.data-row > div:nth-child(8)').click();

  await expect(page.getByRole('button', { name: 'Collapse', exact: true })).toBeVisible();

  //barcode is auto-focused upon expanding the third row
  await expect(barcode).toBeFocused();

  // Verify the "Use Serial No / Batch Fields" checkbox is enabled.
  const serialBatchFields = page.getByRole('checkbox', {
    name: 'Use Serial No / Batch Fields',
  });

  await expect(serialBatchFields).toBeVisible();
  await expect(serialBatchFields).toBeChecked();

  const batchNo = page.locator('input[data-fieldname="batch_no"]:visible');

  await expect(batchNo).toBeVisible();
  await batchNo.click();

  const batchSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'GLP-TAB-001' })
    .first();

  await expect(batchSuggestion).toBeVisible();
  await batchSuggestion.click();
  await expect(batchNo).toHaveValue('GLP-TAB-001');
  await page.getByRole('button', { name: 'Collapse', exact: true }).click();
  await expect(page.locator('#freeze')).toBeHidden();

  // Save the Manufacture Stock Entry.
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  await expect(page).toHaveURL(/MAT-STE-\d{4}-\d+/);

  // Submit the Manufacture Stock Entry.
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  await expect(page.getByRole('button', { name: 'Yes', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Yes', exact: true }).click();

  // Return to the linked Work Order.
  await page.getByRole('link', { name: /^MFG-WO-/ }).click();

  // Verify that the Work Order is completed.
  await expect(page.locator('.page-head').getByText('Completed', { exact: true })).toBeVisible();
});
