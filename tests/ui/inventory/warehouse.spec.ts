import { test, expect } from '@playwright/test';

test.describe('ERPNext Warehouse Inventory', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the login page before each test
    await page.goto('/login');

    // fill in the login form and submit
    const username = process.env.ERP_USERNAME;
    const password = process.env.ERP_PASSWORD;

    expect(username, 'ERP_USERNAME must be configured.').toBeTruthy();
    expect(password, 'ERP_PASSWORD must be configured.').toBeTruthy();

    await page.getByRole('textbox', { name: 'Email' }).fill(username!);
    await page.getByRole('textbox', { name: 'Password' }).fill(password!);
    await page.getByRole('button', { name: 'Continue' }).click();

    //navigate to the ERPNext Desk after successful login
    await page.getByRole('link', { name: 'ERPNext' }).click();
    await page.getByRole('button', { name: /Search/ }).click();
  });

  test('Navigate to the Warehouse Inventory page and display all the configured  warehouses', async ({
    page,
  }) => {
    await page.goto('/app/warehouse');

    //view the warehouse tree view
    await expect(page.getByRole('button', { name: 'Tree View' })).toBeVisible();

    //Expand the warehouse tree view to display all the configured warehouses
    const warehouseGroup = page.getByRole('treeitem', {
      name: /All Warehouses - GP/,
    });

    await expect(warehouseGroup).toBeVisible();

    await warehouseGroup.getByText('All Warehouses - GP', { exact: true }).click();
    await expect(warehouseGroup).toHaveAttribute('aria-expanded', 'true');

    //declare an array of warehouse children
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

    //display each warehouse and confirm if they are present
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
