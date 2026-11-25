import { test, expect } from '@playwright/test';

test.use({
  storageState: '.auth/user.json',
});

test('Create and submit a BOM for a finished product', async ({ page }) => {
  // Open the BOM module.
  await page.goto('/');

  await page
    .getByRole('link', {
      name: 'ERPNext',
      exact: true,
    })
    .click();

  await expect(page.getByRole('navigation', { name: 'Apps' })).toBeVisible();

  // Open the Manufacturing module.
  await page
    .getByRole('button', {
      name: 'Manufacturing',
      exact: true,
    })
    .click();

  await page
    .getByRole('link', {
      name: 'BOM',
      exact: true,
    })
    .click();

  // Start creating a new Bill of Materials.
  await page
    .getByRole('button', {
      name: 'Add BOM',
    })
    .click();

  // Select the finished product and define its output quantity.
  const productionItem = page.getByRole('combobox').nth(1);

  await productionItem.fill('TAB');

  const productSuggestion = page.getByText(/TAB-001.*Sample Tablet/);

  await expect(productSuggestion).toBeVisible();
  await productSuggestion.click();

  await page.getByRole('textbox').fill('3');

  // Add the first raw material component.
  const componentsGrid = page.locator('.form-grid').nth(1);

  const firstComponentRow = componentsGrid.locator('.grid-row[data-idx="1"]');

  // Open the first row to expose its editable fields.
  await firstComponentRow.locator('.btn-open-row').click();

  const firstItemCode = firstComponentRow.locator('input[data-fieldname="item_code"]');

  await firstItemCode.fill('API');

  // Select the intended raw material.
  const apiSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'API-001' });

  await expect(apiSuggestion).toBeVisible();
  await apiSuggestion.click();

  // Set the first component quantity.
  const firstComponentQty = firstComponentRow.locator('input[data-fieldname="qty"]');

  await expect(firstComponentQty).toBeVisible();
  await firstComponentQty.fill('1.5');

  // Collapse the first row before adding another component.
  await firstComponentRow
    .getByRole('button', {
      name: 'Collapse',
    })
    .click();

  // Add the second component row.
  const componentsSection = componentsGrid.locator('..').locator('..');

  await componentsSection
    .getByRole('button', {
      name: 'Add row',
    })
    .click();

  // Locate and open the second component row.
  const secondComponentRow = componentsGrid.locator('.grid-row[data-idx="2"]');

  await expect(secondComponentRow).toBeVisible();
  await secondComponentRow.locator('.btn-open-row').click();

  const secondItemCode = secondComponentRow.locator('input[data-fieldname="item_code"]');

  await secondItemCode.fill('PKG');

  // Select the intended packaging material.
  const packagingSuggestion = page
    .locator('[role="listbox"]:visible')
    .getByRole('option')
    .filter({ hasText: 'PKG-001' });

  await expect(packagingSuggestion).toBeVisible();
  await packagingSuggestion.click();

  // Allow ERPNext to populate the UOM from the selected item.
  const secondComponentUom = secondComponentRow.locator(
    '.form-in-grid input[data-fieldname="uom"]',
  );

  await expect(secondComponentUom).toHaveValue('roll');
  await secondComponentUom.fill('roll');
  // Verify that ERPNext retains the selected UOM.
  await expect(secondComponentUom).toHaveValue('roll');

  const secondComponentQty = secondComponentRow.locator(
    '.form-in-grid input[data-fieldname="qty"]',
  );

  await expect(secondComponentQty).toBeVisible();
  await secondComponentQty.fill('2');

  await secondComponentRow
    .getByRole('button', {
      name: 'Collapse',
    })
    .click();

  // Save the BOM before submitting it.
  await page
    .getByRole('button', {
      name: 'Save',
    })
    .click();

  await expect(page.getByRole('button', { name: 'Actions' })).toBeVisible();

  // Submit the BOM and confirm the irreversible action.
  await page
    .getByRole('button', {
      name: 'Submit',
    })
    .click();

  await page.getByText(/Permanently Submit BOM-TAB-/).click();

  await page
    .getByRole('button', {
      name: 'Yes',
    })
    .click();
});
