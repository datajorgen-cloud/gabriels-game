const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL);
});

test('page loads with title', async ({ page }) => {
  await expect(page.locator('h1')).toContainText("Gabriel's Math Game");
});

test('multiplication mode generates a problem', async ({ page }) => {
  await page.click('button.mode-btn.mult');
  const equation = page.locator('#equation');
  await expect(equation).toBeVisible();
  await expect(equation).toContainText('×');
});

test('division mode generates a problem', async ({ page }) => {
  await page.click('button.mode-btn.div');
  const equation = page.locator('#equation');
  await expect(equation).toBeVisible();
  await expect(equation).toContainText('÷');
});

test('correct answer triggers celebration', async ({ page }) => {
  await page.click('button.mode-btn.mult');

  // Get the correct answer by evaluating getCorrectAnswer() in page context
  const correct = await page.evaluate(() => getCorrectAnswer());

  await page.fill('#answerInput', String(correct));
  await page.click('.check-btn');

  await expect(page.locator('.celebration-text')).toBeVisible({ timeout: 3000 });
});

test('wrong answer shows encouragement and shakes', async ({ page }) => {
  await page.click('button.mode-btn.mult');

  await page.fill('#answerInput', '999999');
  await page.click('.check-btn');

  await expect(page.locator('#feedbackMsg')).toBeVisible();
  await expect(page.locator('.celebration-text')).not.toBeVisible();
});

test('reveal button shows answer and locks input', async ({ page }) => {
  await page.click('button.mode-btn.mult');
  await page.click('.reveal-btn');

  const answerBox = page.locator('#answerBox');
  await expect(answerBox).toBeVisible();

  const input = page.locator('#answerInput');
  await expect(input).toHaveAttribute('readonly', '');
});

test('new problem resets state', async ({ page }) => {
  await page.click('button.mode-btn.mult');
  await page.click('.reveal-btn');

  // Generate a new problem
  await page.click('button.mode-btn.mult');

  const input = page.locator('#answerInput');
  await expect(input).not.toHaveAttribute('readonly', '');
  await expect(input).toHaveValue('');
});
