import { test, expect } from '@playwright/test';

test.describe('Greenlife ERPNext Stock Management', () => {
  test('Material Receipt: create a stock entry', async ({ page }) => {
    // Open Stock Entry creation.
    await page.goto('/desk/stock/stock-entry');

    await page.getByRole('button', { name: 'Add Stock Entry' }).click();

    const detailsTab = page.getByRole('tabpanel', { name: 'Details' });
    await expect(detailsTab).toBeVisible();

    // Select Material Receipt.
    const stockEntryType = detailsTab.locator('[data-fieldname="stock_entry_type"] input');

    await stockEntryType.click();
    await detailsTab.getByText('Material Receipt', { exact: true }).click();

    await expect(page.getByRole('tab', { name: 'Additional Costs' })).toBeVisible();

    // Select the destination warehouse.
    await page.locator('.rows > .grid-row > .data-row > div:nth-child(3)').click();

    const targetWarehouse = page.getByRole('combobox', {
      name: 'Target Warehouse',
    });

    await expect(targetWarehouse).toBeVisible();
    await targetWarehouse.fill('Packaging Materials - GP');

    await page
      .getByText('Packaging Materials - GP', {
        exact: true,
      })
      .click();

    await expect(targetWarehouse).toHaveValue('Packaging Materials - GP');

    // Select the batch-tracked packaging material.
    const itemCode = page.getByRole('combobox', { name: 'Item Code' });

    await itemCode.fill('PKG-003');

    await page
      .getByText('Blister Packaging Material -', {
        exact: false,
      })
      .click();

    await expect(itemCode).toHaveValue(/PKG-003/);

    // ERPNext requires batch details for this item.
    await expect(page.getByRole('heading', { name: 'Add Batch Nos' })).toBeVisible();

    const batchDialog = page.getByRole('dialog');
    await batchDialog.getByRole('button', { name: 'Close' }).click();

    // Enter the receipt quantity.

    // Wait for the recalculation to land before saving
    await expect(batchDialog).toBeHidden();

    const quantity = page.getByRole('textbox', { name: 'Qty' });
    await quantity.click();
    await quantity.press('ControlOrMeta+a');
    await quantity.fill('3');
    await quantity.press('Tab'); // blur so Frappe commits the change

    // Save
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeVisible();

    // Submit
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Yes' }).click();
  });
});
