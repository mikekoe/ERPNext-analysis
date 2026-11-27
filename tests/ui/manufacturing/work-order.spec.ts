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
  await expect(packagingRow).toContainText('PKG-003');

  // Set the source warehouse for API-001 (first required item).
  await apiRow.locator('.data-row > div:nth-child(8)').click();

  const apiSourceWarehouse = apiRow.locator('input[data-fieldname="source_warehouse"]');

  await expect(apiSourceWarehouse).toBeVisible();

  await apiSourceWarehouse.fill('Raw materials');

  const apiWarehouseOption = page.locator('[role="listbox"]:visible').getByRole('option', {
    name: 'Raw materials - GP',
    exact: true,
  });

  await expect(apiWarehouseOption).toBeVisible();
  await apiWarehouseOption.click();

  await expect(apiSourceWarehouse).toHaveValue('Raw materials - GP');

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

  // Configure the generated Material Transfer for Manufacture.
  const itemsGrid = page.locator('.frappe-control[data-fieldname="items"]');
  const firstItemRow = itemsGrid.locator('.grid-row[data-idx="1"]');
  const secondItemRow = itemsGrid.locator('.grid-row[data-idx="2"]');

  // Confirm the generated transfer contains the expected BOM components.
  await expect(firstItemRow).toContainText('API-001');
  await expect(secondItemRow).toContainText('PKG-003');

  // Verify source warehouse mapping inherited from the Work Order.
  await expect(firstItemRow).toContainText('Raw materials - GP');
  await expect(secondItemRow).toContainText('Packaging Materials - GP');

  // Both components must be transferred into Work In Progress.
  await expect(firstItemRow).toContainText('Work In Progress - GP');
  await expect(secondItemRow).toContainText('Work In Progress - GP');

  // Save and submit the Material Transfer for Manufacture.
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

  // Configure the generated Manufacture Stock Entry.
  await expect(page.getByRole('tabpanel', { name: 'Details' })).toBeVisible();

  const manufactureItemsGrid = page.locator('.frappe-control[data-fieldname="items"]');
  const thirdItemRow = manufactureItemsGrid.locator('.grid-row[data-idx="3"]');

  // Confirm this is the finished-product row before assigning its batch.
  await expect(thirdItemRow).toBeVisible();
  await expect(thirdItemRow).toContainText('TAB-001');

  // Expand the finished-product row to configure its Batch No.
  await thirdItemRow.locator('.data-row > div:nth-child(8)').click();

  await expect(page.getByRole('button', { name: 'Collapse', exact: true })).toBeVisible();

  // Barcode is auto-focused upon expanding the row.
  const barcode = page.locator('input[data-fieldname="barcode"]:visible');
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

  // Save and submit the Manufacture Stock Entry.
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  await expect(page).toHaveURL(/MAT-STE-\d{4}-\d+/);

  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  await expect(page.getByRole('button', { name: 'Yes', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Yes', exact: true }).click();

  // Return to the linked Work Order.
  await page.getByRole('link', { name: /^MFG-WO-/ }).click();

  // Verify that the Work Order is completed.
  await expect(page.locator('.page-head').getByText('Completed', { exact: true })).toBeVisible();
});
