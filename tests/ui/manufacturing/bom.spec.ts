import { test, expect } from '@playwright/test';

test.use({
  storageState: '.auth/user.json',
});

test('Create and submit a BOM for a finished product', async ({ page }) => {
  // Open the BOM module.
  await page.goto('/');

  await page.getByRole('link', { name: 'ERPNext', exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Apps' })).toBeVisible();

  await page.getByRole('button', { name: 'Manufacturing', exact: true }).click();
  await page.getByRole('link', { name: 'BOM', exact: true }).click();

  // Start creating a new Bill of Materials.
  await page.getByRole('button', { name: 'Add BOM' }).click();

  // Select the finished product and define its output quantity.
  const productionItem = page.getByRole('combobox').nth(1);
  await productionItem.fill('TAB');

  const productSuggestion = page.getByText(/TAB-001.*Sample Tablet/);
  await expect(productSuggestion).toBeVisible();
  await productSuggestion.click();

  await page.getByRole('textbox').fill('3');

  // First raw material component.
  const componentsGrid = page.locator('.form-grid').nth(1);
  const firstComponentRow = componentsGrid.locator('.grid-row[data-idx="1"]');

  await firstComponentRow.locator('.btn-open-row').click();
  await firstComponentRow.locator('input[data-fieldname="item_code"]').fill('API');

  const apiSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'API-001' });

  await expect(apiSuggestion).toBeVisible();
  await apiSuggestion.click();

  const firstComponentQty = firstComponentRow.locator('input[data-fieldname="qty"]');
  await expect(firstComponentQty).toBeVisible();
  await firstComponentQty.fill('1.5');

  await firstComponentRow.getByRole('button', { name: 'Collapse' }).click();

  // Second component row.
  const componentsSection = componentsGrid.locator('..').locator('..');
  await componentsSection.getByRole('button', { name: 'Add row' }).click();

  const secondComponentRow = componentsGrid.locator('.grid-row[data-idx="2"]');
  await expect(secondComponentRow).toBeVisible();
  await secondComponentRow.locator('.btn-open-row').click();

  // Wait for the row form to actually expand, then scope everything to it.
  const secondRowForm = secondComponentRow.locator('.form-in-grid');
  await expect(secondRowForm).toBeVisible();

  await secondRowForm.locator('input[data-fieldname="item_code"]').fill('PKG-003');

  const packagingSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'PKG-003' });

  await expect(packagingSuggestion).toBeVisible();
  await packagingSuggestion.click();

  // Allow ERPNext to populate the selected item's details.
  await expect(secondRowForm.locator('input[data-fieldname="item_name"]')).toHaveValue(
    /Blister Packaging Material - Batch Tracked/,
  );

  // ERPNext should default the UOM from the item.
  await expect(secondRowForm.locator('input[data-fieldname="uom"]')).toHaveValue('roll');

  const secondComponentQty = secondRowForm.locator('input[data-fieldname="qty"]');
  await expect(secondComponentQty).toBeVisible();
  await secondComponentQty.fill('2');

  await secondComponentRow.getByRole('button', { name: 'Collapse' }).click();

  // Save the BOM before submitting it.
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Actions' })).toBeVisible();

  // Submit the BOM and confirm the irreversible action.
  await page.getByRole('button', { name: 'Submit' }).click();

  const confirmDialog = page.getByRole('dialog');
  await expect(confirmDialog.getByText(/Permanently Submit BOM-TAB-/)).toBeVisible();
  await confirmDialog.getByRole('button', { name: 'Yes' }).click();
});
