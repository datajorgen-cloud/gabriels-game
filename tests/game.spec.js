const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL);
});

test('page loads with start screen', async ({ page }) => {
  await expect(page.locator('.start-screen')).toBeVisible();
  await expect(page.locator('.start-card h2')).toContainText("Gabriel's Math Game");
});

test('start screen shows 8 level buttons', async ({ page }) => {
  const buttons = page.locator('.level-pick-btn');
  await expect(buttons).toHaveCount(8);
});

test('clicking Start Game hides start screen and shows game', async ({ page }) => {
  await page.click('.start-game-btn');
  await expect(page.locator('.start-screen')).toHaveClass(/hidden/);
  await expect(page.locator('#equation')).toBeVisible();
});

test('game starts at selected level', async ({ page }) => {
  await page.click('.level-pick-btn:nth-child(3)');
  await page.click('.start-game-btn');
  await expect(page.locator('#levelDisplay')).toHaveText('3');
  await expect(page.locator('#difficultyBadge')).toContainText('Level 3');
});

test('correct answer gives points and celebration', async ({ page }) => {
  await page.click('.start-game-btn');

  const correct = await page.evaluate(() => getCorrectAnswer());
  await page.fill('#answerInput', String(correct));
  await page.click('.check-btn');

  await expect(page.locator('.celebration-text')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('#scoreDisplay')).not.toHaveText('0');
});

test('wrong answer shows encouragement and shakes input', async ({ page }) => {
  await page.click('.start-game-btn');

  await page.fill('#answerInput', '999999');
  await page.click('.check-btn');

  await expect(page.locator('#feedbackMsg')).toBeVisible();
  await expect(page.locator('.celebration-text')).not.toBeVisible();
});

test('streak resets on wrong answer', async ({ page }) => {
  await page.click('.start-game-btn');

  // Answer correctly first
  const correct = await page.evaluate(() => getCorrectAnswer());
  await page.fill('#answerInput', String(correct));
  await page.click('.check-btn');
  await expect(page.locator('#streakDisplay')).toHaveText('1');

  // Next question
  await page.click('.next-btn');

  // Answer incorrectly
  await page.fill('#answerInput', '999999');
  await page.click('.check-btn');
  await expect(page.locator('#streakDisplay')).toHaveText('0');
});

test('reveal button appears after 3 wrong attempts', async ({ page }) => {
  await page.click('.start-game-btn');

  for (let i = 0; i < 3; i++) {
    await page.fill('#answerInput', '999999');
    await page.click('.check-btn');
  }

  await expect(page.locator('#revealBtn')).toBeVisible();
});

test('reveal button shows answer and next button', async ({ page }) => {
  await page.click('.start-game-btn');

  for (let i = 0; i < 3; i++) {
    await page.fill('#answerInput', '999999');
    await page.click('.check-btn');
  }

  await page.click('#revealBtn');
  await expect(page.locator('#answerBox')).toBeVisible();
  await expect(page.locator('#nextBtn')).toBeVisible();
});

test('next button generates a new question', async ({ page }) => {
  await page.click('.start-game-btn');

  const firstEquation = await page.locator('#equation').textContent();

  const correct = await page.evaluate(() => getCorrectAnswer());
  await page.fill('#answerInput', String(correct));
  await page.click('.check-btn');
  await page.click('.next-btn');

  // Input should be reset
  await expect(page.locator('#answerInput')).toHaveValue('');
  await expect(page.locator('#answerInput')).not.toHaveAttribute('readonly', '');
});

test('mode buttons switch operation type', async ({ page }) => {
  await page.click('.start-game-btn');

  await page.click('button.mode-btn.mult');
  await expect(page.locator('#equation')).toContainText('×');

  await page.click('button.mode-btn.div');
  await expect(page.locator('#equation')).toContainText('÷');
});
