import { test, expect } from '@playwright/test';

test.use({
  storageState: '.auth/user.json',
});

test('Verify Stock Ledger report', async ({ page }) => {
  // Open the Stock Ledger for the reporting period.
  await page.goto(
    '/desk/stock/query-report/Stock%20Ledger?company=GreenLife+Pharma&from_date=2026-10-18&to_date=2026-11-18&valuation_field_type=Currency',
  );

  // Confirm that the Stock Ledger report has loaded.
  await expect(page.getByRole('button', { name: 'View Stock Balance' })).toBeVisible();

  // Filter the report to the packaging item.
  await page.getByText('Items', { exact: true }).click();

  const itemOption = page
    .locator('li')
    .filter({ has: page.locator('strong', { hasText: /^PKG-001$/ }) });

  await expect(itemOption).toBeVisible();
  await itemOption.click();

  // Restrict the report to the warehouse receiving accepted stock.
  await page.getByText('Warehouses', { exact: true }).click();

  await expect(page.getByRole('button', { name: 'Select All' })).toBeVisible();

  const warehouseOption = page.locator('strong').filter({
    hasText: 'Packaging Materials - GP',
  });

  await expect(warehouseOption).toBeVisible();
  await warehouseOption.click();

  // Apply both selected filters before validating the report.
  await page.locator('.text-muted.btn.btn-default').click();

  // Locate the specific Purchase Receipt transaction.
  const receiptRow = page.locator('.dt-row').filter({
    has: page.getByRole('link', {
      name: 'MAT-PRE-2026-00021',
      exact: true,
    }),
  });
  // Verify the transaction belongs to the accepted-stock warehouse.
  await expect(
    receiptRow.getByRole('link', {
      name: 'Packaging Materials - GP',
      exact: true,
    }),
  ).toHaveAttribute('href', '/desk/warehouse/Packaging%20Materials%20-%20GP');
});

test('Verify Stock Balance for received packaging material', async ({ page }) => {
  // Open Stock Balance for the relevant item and reporting date.
  await page.goto(
    '/desk/stock/query-report/Stock%20Balance?company=GreenLife+Pharma&from_date=2026-11-18&to_date=2026-11-18&item_code=%5B%22PKG-001%22%5D&valuation_field_type=Currency&include_zero_stock_items=1',
  );

  // Confirm that the Stock Balance report is available.
  await expect(page.getByRole('button', { name: 'View Stock Ledger' })).toBeVisible();

  // Verify the item and its warehouse.
  await expect(
    page.getByRole('link', {
      name: 'PKG-001: Blister Packaging Material',
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('link', {
      name: 'Packaging Materials - GP',
      exact: true,
    }),
  ).toBeVisible();

  // Verify the reported closing stock quantity.
  await expect(page.getByText('11.000', { exact: true }).first()).toBeVisible();

  // Verify the company.
  await expect(
    page.getByRole('link', {
      name: 'GreenLife Pharma',
      exact: true,
    }),
  ).toBeVisible();
});
