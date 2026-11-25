import { test, expect } from '@playwright/test';

const baseURL = 'http://greenlife.localhost:8000';

test.describe('Greenlife ERPNext Stock Management', () => {
  test('Material Receipt: create a stock entry', async ({ page }) => {
    // Authenticate before accessing inventory operations.
    await page.goto(baseURL);

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.ERP_USERNAME!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ERP_PASSWORD!);

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/desk/);

    // Navigate directly to Stock Entry creation.
    await page.goto(`${baseURL}/desk/stock/stock-entry/new-stock-entry`);

    const detailsTab = page.getByRole('tabpanel', { name: 'Details' });
    await expect(detailsTab).toBeVisible();

    // Select Material Receipt as the Stock Entry type.
    await page.getByRole('combobox').nth(2).click();
    await detailsTab.getByTitle('Material Receipt').click();

    // Confirm that the Material Receipt configuration is available.
    await expect(page.getByRole('tab', { name: 'Additional Costs' })).toBeVisible();

    // Open the Target Warehouse field in the item row.
    await page.getByTitle('Target Warehouse', { exact: true }).click();

    const targetWarehouse = page.getByRole('combobox', {
      name: 'Target Warehouse',
    });

    await expect(targetWarehouse).toBeVisible();

    // Receive the materials into Packaging Materials - GP.
    await targetWarehouse.click();
    await page
      .getByRole('option', {
        name: 'Packaging Materials - GP',
        exact: true,
      })
      .click();

    await expect(targetWarehouse).toHaveValue('Packaging Materials - GP');

    // Select PKG-001: Blister Packaging Material.
    const itemCode = page.getByRole('combobox', { name: 'Item Code' });

    await itemCode.click();

    const itemOption = page.getByRole('option', {
      name: /Blister Packaging Material/,
    });

    await expect(itemOption).toBeVisible();
    await itemOption.click();

    await expect(itemCode).toHaveValue(/PKG-001/);

    // Receive three units of the selected item.
    const quantity = page.getByRole('textbox', { name: 'Qty' });

    await quantity.fill('3');
    await quantity.press('Tab');

    // Verify ERPNext's formatted quantity.
    const qtyInputs = page.locator('input[data-fieldname="qty"]');

    await expect(qtyInputs.first()).toHaveValue('3.000');

    // Verify that ERPNext automatically populates the Basic Rate.
    const basicRate = page.getByRole('textbox', {
      name: 'Basic Rate (as per Stock UOM)',
    });

    await expect(basicRate).not.toHaveValue('');

    // Confirm that the selected item remains in the row.
    await expect(itemCode).toHaveValue(/PKG-001/);

    // Handle the serial/batch dialog opened by ERPNext.
    const serialBatchDialog = page.getByRole('dialog');

    await expect(serialBatchDialog).toBeVisible();
    await expect(serialBatchDialog).toContainText('Add Serial Nos / Batch Nos');

    // Close the dialog without entering serial or batch numbers.
    await serialBatchDialog
      .getByRole('button', {
        name: 'Close',
      })
      .click();

    await expect(serialBatchDialog).toBeHidden();

    // Expand the item row to inspect its calculated details.
    await page.locator('.btn-open-row > a').click();

    await expect(page.getByRole('button', { name: 'Collapse', exact: true })).toBeVisible();

    // Re-query Qty because ERPNext changes the row editor after expansion.
    const expandedQuantity = page.locator('input[data-fieldname="qty"]').last();

    await expect(expandedQuantity).toHaveValue('3.000');

    // Verify the calculated Basic Amount.
    const basicAmountField = detailsTab.locator('label.control-label', {
      hasText: /^Basic Amount$/,
    });

    const basicAmountValue = basicAmountField.locator('../..').locator('.control-value');

    await expect(basicAmountValue).toHaveText('₦ 1,500.00');

    // Confirm that ERPNext displays the stock valuation fields.
    await expect(detailsTab.locator('label.control-label', { hasText: /^Amount$/ })).toBeVisible();

    await expect(
      detailsTab.locator('label.control-label', { hasText: /^Valuation Rate$/ }),
    ).toBeVisible();
  });
});
