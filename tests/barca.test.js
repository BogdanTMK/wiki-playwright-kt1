const { test, expect } = require('@playwright/test');

test('Barcelona page on Wikipedia', async ({ page }) => {
  // Открывем страницу фк Барселона
  await page.goto('https://en.wikipedia.org/wiki/FC_Barcelona');

  // 1. Имя команды в заголовке
  const heading = page.getByRole('heading', { level: 1, name: 'FC Barcelona' });
  await expect(heading).toBeVisible();
  await expect(page).toHaveTitle(/FC Barcelona/);

  // 2. Тест формы поиска
  const searchInput = page.locator('input[name="search"]').first();
  await searchInput.fill('Pedri');
  await searchInput.press('Enter');

  // 3. Переход на страницу
  await expect(page).toHaveURL(/\/wiki\/Pedri/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Pedri' })
  ).toBeVisible();
});
