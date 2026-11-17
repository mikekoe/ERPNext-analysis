import { test, expect } from '@playwright/test';

const BASE_URL = 'http://greenlife.localhost:8000';

const tree = `${BASE_URL}/desk/stock/item-group/view/tree`;

test.describe('Greenlife ERPNext Item Groups', () => {
  //Login before accessing the stock module
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    const username = process.env.ERP_USERNAME;
    const password = process.env.ERP_PASSWORD;

    expect(username, 'ERP_USERNAME must be configured.').toBeTruthy();
    expect(password, 'ERP_PASSWORD must be configured.').toBeTruthy();

    await page.getByRole('textbox', { name: 'Email' }).fill(username!);
    await page.getByRole('textbox', { name: 'Password' }).fill(password!);
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm successful login
    await expect(page).toHaveURL(/\/desk/);
  });

  test('should display the existing Item Group in a tree mode', async ({ page }) => {
    await page.goto(tree, { waitUntil: 'domcontentloaded' });

    // Confirm that the Item Group Tree is accessible.
    await expect(page.getByRole('button', { name: 'Tree View' })).toBeVisible();

    // Verify the root group exists.
    await expect(page.getByRole('treeitem', { name: /All Item Groups/ })).toBeVisible();

    // Verify the child groups exist.
    await expect(page.getByRole('treeitem', { name: /Raw Material/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /Packaging Materials/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /Rejected items/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /Products/ })).toBeVisible();
  });

  test('Display Active Pharmaceutical Ingredient (API) and Excipient under Raw material', async ({
    page,
  }) => {
    //Navigate to the item group tree after login
    await page.goto(tree, { waitUntil: 'domcontentloaded' });

    //Find the Raw material tree node
    const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });
    await expect(rawMaterial).toBeVisible();

    //Expand Raw Material to expose its child groups
    await rawMaterial.locator('.node-parent .icon').click();

    //Confirm API is a child under Raw Material
    await expect(page.getByRole('treeitem', { name: /Active Pharmaceutical/ })).toBeVisible();

    //Confirm Excipient is a child under Raw Material
    await expect(page.getByRole('treeitem', { name: /Excipient/ })).toBeVisible();
  });

  test('Display Packaging Materials group with its child groups', async ({ page }) => {
    await page.goto(tree, { waitUntil: 'domcontentloaded' });

    const packageMaterials = page.getByRole('treeitem', { name: /Packaging Materials/ });

    //Locate Packaging materials item group
    await expect(packageMaterials).toBeVisible();

    //Expand Packaging Materials to view its children
    await packageMaterials.locator('.node-parent .icon').click();

    await expect(page.getByRole('treeitem', { name: /Primary Packaging material/ })).toBeVisible();

    await expect(
      page.getByRole('treeitem', { name: /Secondary Packaging material/ }),
    ).toBeVisible();
  });

  test('Display the rejected item groups under the parent group', async ({ page }) => {
    await page.goto(tree, { waitUntil: 'domcontentloaded' });

    const rejectedItems = page.getByRole('treeitem', { name: /Rejected items/ });

    // Confirm the parent exists before expanding it.
    await expect(rejectedItems).toBeVisible();

    // Expand the parent to view its configured child groups.
    await rejectedItems.locator('.node-parent .icon').click();

    await expect(page.getByRole('treeitem', { name: /Rejected Finished Materials/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /Rejected Raw materials/ })).toBeVisible();
  });

  test('should display Products and Sub Assemblies as standalone Item Groups', async ({ page }) => {
    await page.goto(tree, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('treeitem', { name: /All Item Groups/ })).toBeVisible({
      timeout: 15_000,
    });

    // Both item groups should be accessible in the existing Item Group tree.
    await expect(page.getByRole('treeitem', { name: /^Products/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /^Sub Assemblies/ })).toBeVisible();
  });

  test('creating a new parent Item Group under Raw material', async ({ page }) => {
    //Navigating to item group tree
    await page.goto(tree, { waitUntil: 'domcontentloaded' });
    const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });
    await expect(rawMaterial).toBeVisible();

    await rawMaterial.click();

    await page.getByRole('button', { name: 'More actions' }).click();
    await page.getByRole('menuitem', { name: 'Add Child' }).click();

    //open item group creation modal
    const dialog = page.getByRole('dialog');

    await expect(dialog).toBeVisible();

    // Naming the item group.
    const groupName = `QA Test Group ${Date.now()}`;

    //Configure the new child group as a parent
    await dialog.getByRole('checkbox', { name: 'Is Group' }).check();
    await dialog.getByRole('textbox').fill(groupName);
    await dialog.getByRole('button', { name: 'Create New' }).click();
    // Confirm the newly created group is visible in the Item Group tree.
    const createdGroup = page.getByRole('treeitem', { name: new RegExp(groupName) });
    await expect(createdGroup).toBeVisible();
  });
});
