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

  await page.getByRole('textbox').fill('2');

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
});
