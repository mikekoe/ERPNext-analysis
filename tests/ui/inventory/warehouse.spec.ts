import { test, expect } from '@playwright/test';

test.describe('ERPNext Warehouse Inventory', () => {
  test('Navigate to the Warehouse Inventory page and display all the configured warehouses', async ({
    page,
  }) => {
    // Authentication is handled by the setup project.
    await page.goto('/app/warehouse');

    // Confirm the warehouse tree view is available.
    await expect(page.getByRole('button', { name: 'Tree View' })).toBeVisible();

    const warehouseGroup = page.getByRole('treeitem', {
      name: /All Warehouses - GP/,
    });

    await expect(warehouseGroup).toBeVisible();

    // Expand the parent warehouse to display its children.
    await warehouseGroup.getByText('All Warehouses - GP', { exact: true }).click();
    await expect(warehouseGroup).toHaveAttribute('aria-expanded', 'true');

    const warehousesOptions = [
      'Finished Goods - GP',
      'Goods In Transit - GP',
      'Raw materials - GP',
      'Rejected Finished Goods - GP',
      'Rejected Materials - GP',
      'Scrap - GP',
      'Stores - GP',
      'Work In Progress - GP',
    ];

    // Verify that each configured warehouse is displayed.
    for (const warehouse of warehousesOptions) {
      await expect(
        page.getByRole('treeitem', {
          name: warehouse,
          exact: true,
        }),
        `${warehouse} should exist in the warehouse tree`,
      ).toBeVisible();
    }
  });
});
