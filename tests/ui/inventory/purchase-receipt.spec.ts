import { test, expect } from '@playwright/test';

test('Create and submit a Purchase Receipt', async ({ page }) => {
  // Authenticate before accessing inventory operations.
  await page.goto('/');

  // Confirm the authenticated ERPNext desk is available.
  await expect(page.getByRole('button', { name: 'Search ⌘K' })).toBeVisible();

  await page.getByRole('link', { name: 'ERPNext' }).click();

  const appsNavigation = page.getByRole('navigation', { name: 'Apps' });
  await expect(appsNavigation).toBeVisible();

  await appsNavigation.getByRole('button', { name: 'Stock', exact: true }).click();

  // --------------------------------------------------
  // 1. Open Purchase Receipt
  // --------------------------------------------------

  await page.getByRole('link', { name: 'Purchase Receipt', exact: true }).click();

  await expect(page.getByRole('button', { name: 'List View' })).toBeVisible();

  await page.getByRole('button', { name: 'Add Purchase Receipt' }).click();

  await expect(page.getByRole('tabpanel', { name: 'Details' })).toBeVisible();

  // --------------------------------------------------
  // 2. Select supplier
  // --------------------------------------------------

  const supplierField = page.getByRole('combobox').nth(1);

  await supplierField.fill('Supplier baba');

  const supplierOption = page.getByRole('option', {
    name: 'Supplier baba',
    exact: true,
  });

  await expect(supplierOption).toBeVisible();
  await supplierOption.click();

  // --------------------------------------------------
  // 3. Configure accepted and rejected warehouses
  // --------------------------------------------------

  // Route accepted and rejected stock to their respective warehouses.
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

  // --------------------------------------------------
  // 4. Add item and configure accepted quantity
  // --------------------------------------------------

  const itemCodeHeader = page
    .locator('.form-grid [data-fieldname="item_code"][data-fieldtype="Link"]')
    .first();

  await itemCodeHeader.click();

  const itemCodeInput = page.locator('.form-grid .grid-row input[data-fieldname="item_code"]');

  await itemCodeInput.fill('PKG-001');

  const itemOption = page.getByRole('option', { name: /PKG-001/ });

  await expect(itemOption).toBeVisible();
  await itemOption.click();

  const itemRow = page.locator('.form-grid .grid-row[data-idx="1"]');

  const acceptedQuantity = itemRow.locator('.frappe-control[data-fieldname="qty"] input');

  await acceptedQuantity.fill('3');
  await acceptedQuantity.press('Tab');

  await expect(acceptedQuantity).toHaveValue('3.000');

  // --------------------------------------------------
  // 5. Configure batch and serial numbers
  // --------------------------------------------------

  // Expand the item row to access its batch and serial-number fields.
  await itemRow.locator('.btn-open-row').click();

  const batchNumber = page.locator('.frappe-control[data-fieldname="batch_no"] input');

  await expect(batchNumber).toBeVisible();
  await batchNumber.fill('B-20');

  const batchOption = page.getByRole('option', {
    name: 'B-20',
    exact: true,
  });

  await expect(batchOption).toBeVisible();
  await batchOption.click();

  await expect(batchNumber).toHaveValue('B-20');

  // Assign one unique serial number to each accepted unit.
  const serialNumbers = ['PKG-SN-09', 'PKG-SN-10', 'PKG-SN-11'];

  expect(serialNumbers).toHaveLength(3);

  const serialNumberField = page.locator('.frappe-control[data-fieldname="serial_no"] textarea');

  await expect(serialNumberField).toBeVisible();
  await serialNumberField.fill(serialNumbers.join('\n'));

  await expect(serialNumberField).toHaveValue(serialNumbers.join('\n'));

  // Close the expanded editor after configuring item tracking details.
  const collapseButton = page.getByRole('button', {
    name: 'Collapse',
    exact: true,
  });

  await expect(collapseButton).toBeVisible();
  await collapseButton.click();

  await expect(page.getByText('Editing Row #1')).toBeHidden();

  // --------------------------------------------------
  // 6. Save and submit Purchase Receipt
  // --------------------------------------------------

  const saveButton = page.getByRole('button', { name: 'Save' });

  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  // Wait for the saved document to expose its Submit action.
  const submitButton = page.getByRole('button', {
    name: 'Submit',
    exact: true,
  });

  await expect(submitButton).toBeVisible();
  await submitButton.click();

  // Confirm the submission request.
  await expect(page.getByRole('heading', { name: 'Confirm' })).toBeVisible();
  await expect(page.getByText(/Permanently Submit/)).toBeVisible();

  await page.getByRole('button', { name: 'Yes', exact: true }).click();

  // Verify successful submission rather than merely confirming the click.
  await expect(page.getByRole('button', { name: 'View', exact: true })).toBeVisible();

  await expect(page.getByText('Submitted', { exact: true })).toBeVisible();
});
