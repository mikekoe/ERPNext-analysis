import { test, expect } from '@playwright/test';

const tree = '/desk/stock/item-group/view/tree';

test.describe('Greenlife ERPNext Item Groups', () => {
  // Navigate to the Item Group Tree before each test.
  test.beforeEach(async ({ page }) => {
    await page.goto(tree);

    // Wait for the tree data to load.
    await expect(page.getByRole('treeitem', { name: /All Item Groups/ })).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display the existing Item Group in tree mode', async ({ page }) => {
    // Confirm that the Item Group Tree is accessible.
    await expect(page.getByRole('button', { name: 'Tree View' })).toBeVisible();

    // Verify the configured child groups.
    await expect(page.getByRole('treeitem', { name: /Raw Material/ })).toBeVisible();
    await expect(page.getByRole('treeitem', { name: /Packaging Materials/ })).toBeVisible();
    await expect(page.getByRole('treeitem', { name: /Rejected items/ })).toBeVisible();
    await expect(page.getByRole('treeitem', { name: /Products/ })).toBeVisible();
  });

  test('Display Active Pharmaceutical Ingredient (API) and Excipient under Raw material', async ({
    page,
  }) => {
    const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });

    // Confirm Raw Material exists before expanding it.
    await expect(rawMaterial).toBeVisible();

    // Expand Raw Material to expose its child groups.
    await rawMaterial.locator('.node-parent .icon').click();

    // Confirm API is visible.
    await expect(page.getByRole('treeitem', { name: /Active Pharmaceutical/ })).toBeVisible();

    // Confirm Excipient is visible.
    await expect(page.getByRole('treeitem', { name: /Excipient/ })).toBeVisible();
  });

  test('Display Packaging Materials group with its child groups', async ({ page }) => {
    const packageMaterials = page.getByRole('treeitem', {
      name: /Packaging Materials/,
    });

    // Locate Packaging Materials before expanding it.
    await expect(packageMaterials).toBeVisible();

    // Expand Packaging Materials to view its children.
    await packageMaterials.locator('.node-parent .icon').click();

    await expect(page.getByRole('treeitem', { name: /Primary Packaging material/ })).toBeVisible();

    await expect(
      page.getByRole('treeitem', { name: /Secondary Packaging material/ }),
    ).toBeVisible();
  });

  test('Display the rejected item groups under the parent group', async ({ page }) => {
    const rejectedItems = page.getByRole('treeitem', {
      name: /Rejected items/,
    });

    // Confirm the parent exists before expanding it.
    await expect(rejectedItems).toBeVisible();

    // Expand the parent to view its configured child groups.
    await rejectedItems.locator('.node-parent .icon').click();

    await expect(page.getByRole('treeitem', { name: /Rejected Finished Materials/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /Rejected Raw materials/ })).toBeVisible();
  });

  test('should display Products and Sub Assemblies as standalone Item Groups', async ({ page }) => {
    // Verify both groups are accessible in the existing Item Group tree.
    await expect(page.getByRole('treeitem', { name: /^Products/ })).toBeVisible();

    await expect(page.getByRole('treeitem', { name: /^Sub Assemblies/ })).toBeVisible();
  });

  test('creating a new parent Item Group under Raw material', async ({ page }) => {
    const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });

    // Confirm Raw Material exists before selecting it.
    await expect(rawMaterial).toBeVisible();

    await rawMaterial.click();

    await page.getByRole('button', { name: 'More actions' }).click();
    await page.getByRole('menuitem', { name: 'Add Child' }).click();

    // Confirm the Item Group creation dialog is open.
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Generate a unique name to avoid duplicate-name conflicts.
    const groupName = `Quality Test Group ${Date.now()}`;

    // Configure the new child group as a parent.
    await dialog.getByRole('checkbox', { name: 'Is Group' }).check();
    await dialog.getByRole('textbox').fill(groupName);

    await dialog.getByRole('button', { name: 'Create New' }).click();

    // Confirm the newly created group is visible in the tree.
    const createdGroup = page.getByRole('treeitem', {
      name: new RegExp(groupName),
    });

    await expect(createdGroup).toBeVisible();
  });
});
