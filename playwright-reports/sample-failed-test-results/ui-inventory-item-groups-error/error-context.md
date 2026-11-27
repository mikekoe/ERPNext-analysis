# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/inventory/item-groups.spec.ts >> Greenlife ERPNext Item Groups >> creating a new parent Item Group under Raw material
- Location: tests/ui/inventory/item-groups.spec.ts:93:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('treeitem', { name: /Raw Material/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('treeitem', { name: /Raw Material/ }) with timeout 5000ms
  - waiting for getByRole('treeitem', { name: /Raw Material/ })

```

```yaml
- text: A Administrator admin@example.com
- button
- banner
- navigation "Breadcrumb":
    - list:
        - listitem: Item Group Tree
- button "Tree View"
- button
- contentinfo
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | const tree = '/desk/stock/item-group/view/tree';
  4   |
  5   | test.describe('Greenlife ERPNext Item Groups', () => {
  6   |   //Login before accessing the stock module
  7   |   test('should display the existing Item Group in a tree mode', async ({ page }) => {
  8   |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  9   |
  10  |     // Confirm that the Item Group Tree is accessible.
  11  |     await expect(page.getByRole('button', { name: 'Tree View' })).toBeVisible();
  12  |
  13  |     // Verify the root group exists.
  14  |     await expect(page.getByRole('treeitem', { name: /All Item Groups/ })).toBeVisible();
  15  |
  16  |     // Verify the child groups exist.
  17  |     await expect(page.getByRole('treeitem', { name: /Raw Material/ })).toBeVisible();
  18  |
  19  |     await expect(page.getByRole('treeitem', { name: /Packaging Materials/ })).toBeVisible();
  20  |
  21  |     await expect(page.getByRole('treeitem', { name: /Rejected items/ })).toBeVisible();
  22  |
  23  |     await expect(page.getByRole('treeitem', { name: /Products/ })).toBeVisible();
  24  |   });
  25  |
  26  |   test('Display Active Pharmaceutical Ingredient (API) and Excipient under Raw material', async ({
  27  |     page,
  28  |   }) => {
  29  |     //Navigate to the item group tree after login
  30  |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  31  |
  32  |     //Find the Raw material tree node
  33  |     const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });
  34  |     await expect(rawMaterial).toBeVisible();
  35  |
  36  |     //Expand Raw Material to expose its child groups
  37  |     await rawMaterial.locator('.node-parent .icon').click();
  38  |
  39  |     //Confirm API is a child under Raw Material
  40  |     await expect(page.getByRole('treeitem', { name: /Active Pharmaceutical/ })).toBeVisible();
  41  |
  42  |     //Confirm Excipient is a child under Raw Material
  43  |     await expect(page.getByRole('treeitem', { name: /Excipient/ })).toBeVisible();
  44  |   });
  45  |
  46  |   test('Display Packaging Materials group with its child groups', async ({ page }) => {
  47  |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  48  |
  49  |     const packageMaterials = page.getByRole('treeitem', { name: /Packaging Materials/ });
  50  |
  51  |     //Locate Packaging materials item group
  52  |     await expect(packageMaterials).toBeVisible();
  53  |
  54  |     //Expand Packaging Materials to view its children
  55  |     await packageMaterials.locator('.node-parent .icon').click();
  56  |
  57  |     await expect(page.getByRole('treeitem', { name: /Primary Packaging material/ })).toBeVisible();
  58  |
  59  |     await expect(
  60  |       page.getByRole('treeitem', { name: /Secondary Packaging material/ }),
  61  |     ).toBeVisible();
  62  |   });
  63  |
  64  |   test('Display the rejected item groups under the parent group', async ({ page }) => {
  65  |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  66  |
  67  |     const rejectedItems = page.getByRole('treeitem', { name: /Rejected items/ });
  68  |
  69  |     // Confirm the parent exists before expanding it.
  70  |     await expect(rejectedItems).toBeVisible();
  71  |
  72  |     // Expand the parent to view its configured child groups.
  73  |     await rejectedItems.locator('.node-parent .icon').click();
  74  |
  75  |     await expect(page.getByRole('treeitem', { name: /Rejected Finished Materials/ })).toBeVisible();
  76  |
  77  |     await expect(page.getByRole('treeitem', { name: /Rejected Raw materials/ })).toBeVisible();
  78  |   });
  79  |
  80  |   test('should display Products and Sub Assemblies as standalone Item Groups', async ({ page }) => {
  81  |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  82  |
  83  |     await expect(page.getByRole('treeitem', { name: /All Item Groups/ })).toBeVisible({
  84  |       timeout: 15_000,
  85  |     });
  86  |
  87  |     // Both item groups should be accessible in the existing Item Group tree.
  88  |     await expect(page.getByRole('treeitem', { name: /^Products/ })).toBeVisible();
  89  |
  90  |     await expect(page.getByRole('treeitem', { name: /^Sub Assemblies/ })).toBeVisible();
  91  |   });
  92  |
  93  |   test('creating a new parent Item Group under Raw material', async ({ page }) => {
  94  |     //Navigating to item group tree
  95  |     await page.goto(tree, { waitUntil: 'domcontentloaded' });
  96  |     const rawMaterial = page.getByRole('treeitem', { name: /Raw Material/ });
> 97  |     await expect(rawMaterial).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  98  |
  99  |     await rawMaterial.click();
  100 |
  101 |     await page.getByRole('button', { name: 'More actions' }).click();
  102 |     await page.getByRole('menuitem', { name: 'Add Child' }).click();
  103 |
  104 |     //open item group creation modal
  105 |     const dialog = page.getByRole('dialog');
  106 |
  107 |     await expect(dialog).toBeVisible();
  108 |
  109 |     // Naming the item group.
  110 |     const groupName = `Quality Test Group ${Date.now()}`;
  111 |
  112 |     //Configure the new child group as a parent
  113 |     await dialog.getByRole('checkbox', { name: 'Is Group' }).check();
  114 |     await dialog.getByRole('textbox').fill(groupName);
  115 |     await dialog.getByRole('button', { name: 'Create New' }).click();
  116 |     // Confirm the newly created group is visible in the Item Group tree.
  117 |     const createdGroup = page.getByRole('treeitem', { name: new RegExp(groupName) });
  118 |     await expect(createdGroup).toBeVisible();
  119 |   });
  120 | });
  121 |
```
