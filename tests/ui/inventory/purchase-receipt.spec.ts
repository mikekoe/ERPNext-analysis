import { test, expect } from '@playwright/test';

test('Create and submit a Purchase Receipt', async ({ page }) => {
  // Open the authenticated ERPNext desk.
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Search ⌘K' })).toBeVisible();

  await page.getByRole('link', { name: 'ERPNext' }).click();

  const appsNavigation = page.getByRole('navigation', { name: 'Apps' });
  await expect(appsNavigation).toBeVisible();

  await appsNavigation
    .getByRole('button', {
      name: 'Stock',
      exact: true,
    })
    .click();

  // 1. Open Purchase Receipt.
  await page
    .getByRole('link', {
      name: 'Purchase Receipt',
      exact: true,
    })
    .click();

  await expect(page.getByRole('button', { name: 'List View' })).toBeVisible();

  await page
    .getByRole('button', {
      name: 'Add Purchase Receipt',
    })
    .click();

  await expect(page.getByRole('tabpanel', { name: 'Details' })).toBeVisible();

  // 2. Select supplier.
  const supplierField = page.getByRole('combobox').nth(1);

  await supplierField.fill('Supplier baba');

  const supplierOption = page.getByRole('option', {
    name: 'Supplier baba',
    exact: true,
  });

  await expect(supplierOption).toBeVisible();
  await supplierOption.click();

  // 3. Configure accepted and rejected warehouses.
  const acceptedWarehouse = page.locator('.frappe-control[data-fieldname="set_warehouse"] input');

  await acceptedWarehouse.fill('Packaging Materials - GP');

  const acceptedWarehouseOption = page.getByRole('option', {
    name: 'Packaging Materials - GP',
    exact: true,
  });

  await expect(acceptedWarehouseOption).toBeVisible();
  await acceptedWarehouseOption.click();

  const rejectedWarehouse = page.locator(
    '.frappe-control[data-fieldname="rejected_warehouse"] input',
  );

  await rejectedWarehouse.fill('Rejected Materials - GP');

  const rejectedWarehouseOption = page.getByRole('option', {
    name: 'Rejected Materials - GP',
    exact: true,
  });

  await expect(rejectedWarehouseOption).toBeVisible();
  await rejectedWarehouseOption.click();

  // 4. Add PKG-003 and configure the accepted quantity.
  const itemCodeHeader = page
    .locator('.form-grid [data-fieldname="item_code"][data-fieldtype="Link"]')
    .first();

  await itemCodeHeader.click();

  const itemCodeInput = page.locator('.form-grid .grid-row input[data-fieldname="item_code"]');

  await itemCodeInput.fill('PKG-003');

  const itemOption = page.getByRole('option', {
    name: /PKG-003/,
  });

  await expect(itemOption).toBeVisible();
  await itemOption.click();

  const itemRow = page.locator('.form-grid .grid-row[data-idx="1"]');

  const acceptedQuantity = itemRow.locator('.frappe-control[data-fieldname="qty"] input');

  await acceptedQuantity.fill('3');
  await acceptedQuantity.press('Tab');

  await expect(acceptedQuantity).toHaveValue('3.000');

  // 5. Save and submit the Purchase Receipt.
  // ERPNext is configured to generate the inward batch and bundle.
  const saveButton = page.getByRole('button', {
    name: 'Save',
    exact: true,
  });

  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  const submitButton = page.getByRole('button', {
    name: 'Submit',
    exact: true,
  });

  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(page.getByRole('heading', { name: 'Confirm' })).toBeVisible();

  await expect(page.getByText(/Permanently Submit/)).toBeVisible();

  await page
    .getByRole('button', {
      name: 'Yes',
      exact: true,
    })
    .click();

  // Verify successful submission.
  await expect(page.getByRole('button', { name: 'View', exact: true })).toBeVisible();

  await expect(page.getByText('Submitted', { exact: true })).toBeVisible();
});
