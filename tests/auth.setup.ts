import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const authFile = path.resolve('.auth/user.json');

const username = process.env.ERP_USERNAME;
const password = process.env.ERP_PASSWORD;

assert(username && password, 'ERP_USERNAME and ERP_PASSWORD must be defined in the environment.');

setup('Authenticate with ERPNext', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Continue' }).click();

  // Save the authenticated session only after successful login.
  await expect(page.getByRole('button', { name: 'Search ⌘K' })).toBeVisible();

  await mkdir(path.dirname(authFile), { recursive: true });

  await page.context().storageState({
    path: authFile,
  });
});
