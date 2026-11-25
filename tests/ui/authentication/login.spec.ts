import { test, expect } from '@playwright/test';

/**
 * Authentication interface and access to ERPNext.
 */
test.describe('ERPNext Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('An ERPNext user should login successfully', async ({ page }) => {
    const username = process.env.ERP_USERNAME;
    const password = process.env.ERP_PASSWORD;
    expect(username, 'ERP_USERNAME must be configured.').toBeTruthy();
    expect(password, 'ERP_PASSWORD must be configured.').toBeTruthy();

    await page.getByRole('textbox', { name: 'Email' }).fill(username!);
    await page.getByRole('textbox', { name: 'Password' }).fill(password!);
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('link', { name: 'ERPNext' }).click();
    await page.getByRole('button', { name: /Search/ }).click();

    //verify access to the ERPNext Desk after successful login
    await expect(page.getByRole('button', { name: /Search/ })).toBeVisible();
  });

  test('should display the standard login interface', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  test('should navigate between available authentication options', async ({ page }) => {
    // Password recovery.
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
    await page.getByRole('link', { name: 'Forgot password?' }).click();

    //Forgot password page should be displayed with the following elements: heading, email textbox and send link button
    await expect(page.getByRole('heading', { name: 'Forgot Password?' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Link' })).toBeVisible();

    await page.getByRole('link', { name: 'Back to sign in' }).click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    // Email-link option: presence only.
    await page.getByRole('link', { name: 'Login with Email Link' }).click();
    await expect(page.getByRole('button', { name: 'Send login link' })).toBeVisible();

    await page.getByRole('link', { name: 'Login with password' }).click();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('Reject login attempts with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('tester@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('menemenetekeparsil');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify that an error message is displayed for invalid credentials
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials, try again.');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  //Test attempts to submit an empty login form
  test('Reject login attempts with empty credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();
    //user is on the login page
    await expect(page).toHaveURL(/\/login/);

    //username and password fields are empty
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();

    //Email field is required and should display an error message
    await expect(page.getByText('Email is required')).toBeVisible();

    //Password field is required and should display an error message
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  //An authenticated user should be able to log out successfully
  test('A registered user should be able to log out successfully', async ({ page }) => {
    const username = process.env.ERP_USERNAME;
    const password = process.env.ERP_PASSWORD;

    //This ensures the login credentials are configured in the environment variables
    expect(username, 'ERP_USERNAME must be configured.').toBeTruthy();
    expect(password, 'ERP_PASSWORD must be configured.').toBeTruthy();

    // Log in with valid credentials
    await page.getByRole('textbox', { name: 'Email' }).fill(username!);
    await page.getByRole('textbox', { name: 'Password' }).fill(password!);
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm that the user has reached the ERPNext Desk
    await expect(page.getByRole('button', { name: /Search/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ERPNext' })).toBeVisible();

    //click the ERPNext link to navigate to the ERPNext home page
    await page.getByRole('link', { name: 'ERPNext' }).click();

    //Open the user profile and click the logout button
    await page.getByRole('button', { name: 'User Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Settings' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    //confirm logout by clicking the "Yes" button on the confirmation dialog
    await expect(page.getByRole('heading', { name: 'Confirm' })).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
  });

  //Ensure an authenticated session is still valid after a page refresh
  test('maintain authenticated session after page refresh', async ({ page }) => {
    const username = process.env.ERP_USERNAME;
    const password = process.env.ERP_PASSWORD;

    //This ensures the login credentials are configured in the environment variables
    expect(username, 'ERP_USERNAME must be configured.').toBeTruthy();
    expect(password, 'ERP_PASSWORD must be configured.').toBeTruthy();

    // Log in with valid credentials
    await page.getByRole('textbox', { name: 'Email' }).fill(username!);
    await page.getByRole('textbox', { name: 'Password' }).fill(password!);
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm that the user has reached the ERPNext Desk
    await expect(page.getByRole('button', { name: /Search/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ERPNext' })).toBeVisible();

    //Refresh the page while signed in and confirm that the user is still authenticated
    await page.reload();
    await expect(page.getByRole('button', { name: /Search/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ERPNext' })).toBeVisible();
  });
});
