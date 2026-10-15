import { test, expect } from '@playwright/test'

test('loading website displays worlds production chart, title and mode selector', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /World's coffee production/i })).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'mode' })).toBeVisible()
  await expect(page.locator('.recharts-wrapper')).toBeVisible()

})

test('changing to country mode changes title and adds new selectors/toggle', async ({ page }) => {
  await page.goto('/')

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/api/production/global') && res.ok()),
    page.getByRole('combobox', { name: 'mode' }).selectOption('country')
  ])

  await expect(page.getByRole('heading', { name: /Choose a country from the list/i })).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'mode' })).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'country' })).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'continent' })).toBeVisible()

  await expect(page.locator('.switch')).toBeVisible()
  await expect(page.locator('.recharts-wrapper')).toBeVisible()

})

test('production data returned by FAOSTAT API has the expected shape', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/api/production/peru') && res.ok()),
    page.getByRole('combobox', { name: 'country' }).selectOption('peru'),
  ])

  const production = await response.json()

  expect(Array.isArray(production)).toBe(true)
  expect(production.length).toBeGreaterThan(0)

  for (const point of production) {
    expect(point).toHaveProperty('year')
    expect(point).toHaveProperty('value')
  }
})

test('the chart widget displays the years returned by the FAOSTAT API', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/api/production/peru') && res.ok()),
    page.getByRole('combobox', { name: 'country' }).selectOption('peru'),
  ])

  const production: { year: number; value: number }[] = await response.json()
  const chart = page.locator('.recharts-wrapper')
  await expect(chart).toBeVisible()

  //Recharts skips overlapping ticks when there are many data points, but always keeps the first and last
  const years = production.map(p => p.year).sort((a, b) => a - b)
  const firstYear = years[0]
  const lastYear = years[years.length - 1]

  await expect(chart.getByText(String(firstYear))).toBeVisible()
  await expect(chart.getByText(String(lastYear))).toBeVisible()
  await expect(chart.locator('.recharts-area-area').first()).toBeVisible()
})

test('the chart widget displays both global and country data', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')
  await page.getByRole('combobox', { name: 'country' }).selectOption('peru')

  const chart = page.locator('.recharts-wrapper')
  await expect(chart).toBeVisible()

  //Recharts skips overlapping ticks when there are many data points, but always keeps the first and last

  await expect(chart.getByText(/World \(1k x 60kg\)/)).toBeVisible()
  await expect(chart.getByText(/Peru \(1k x 60kg\)/)).toBeVisible()
  await expect(chart.locator('.recharts-area-area').first()).toBeVisible()
})

test('the chart widget displays only country data when toggle is turned off', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')
  await page.getByRole('combobox', { name: 'country' }).selectOption('peru')
  await page.locator('.switch').click()

  const chart = page.locator('.recharts-wrapper')
  await expect(chart).toBeVisible()

  //Recharts skips overlapping ticks when there are many data points, but always keeps the first and last

  await expect(chart.getByText(/World \(1k x 60kg\)/)).not.toBeVisible()
  await expect(chart.getByText(/Peru \(1k x 60kg\)/)).toBeVisible()
})

test('map highlights a country in a different color', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')
  await page.getByRole('combobox', { name: 'country' }).selectOption('peru')

  // Find paths with the highlight color
  const highlightedPaths = page.locator('path[fill*="225, 241, 152"]')
  await expect(highlightedPaths.first()).toBeVisible()
  expect(await highlightedPaths.count()).toBe(1)

  // Verify there are also default-colored paths
  const defaultPaths = page.locator('path[fill*="113, 147, 104"]')
  expect(await defaultPaths.count()).toBeGreaterThan(0)
})

test('map shows default color when no country is selected', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')

  // Find paths with the highlight color
  const highlightedPaths = page.locator('path[fill*="225, 241, 152"]')
  expect(await highlightedPaths.count()).toBe(0)

  // Verify there are also default-colored paths
  const defaultPaths = page.locator('path[fill*="113, 147, 104, 80%"]')
  expect(await defaultPaths.count()).toBeGreaterThan(0)
})

test('changing country moves the highlighted section on the map', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'mode' }).selectOption('country')
  
  // Select Peru and get the highlighted path's coordinates
  await page.getByRole('combobox', { name: 'country' }).selectOption('peru')
  let highlightedPath = page.locator('path[fill="rgb(225, 241, 152, 90%)"]').first()
  const peruPathCoords = await highlightedPath.getAttribute('d')
  
  // Select Brazil
  await page.getByRole('combobox', { name: 'country' }).selectOption('brazil')
  
  // Get the new highlighted path's coordinates
  highlightedPath = page.locator('path[fill="rgb(225, 241, 152, 90%)"]').first()
  const brazilPathCoords = await highlightedPath.getAttribute('d')
  
  // Verify they're different paths (different coordinates)
  expect(peruPathCoords).not.toBe(brazilPathCoords)
  expect(brazilPathCoords).toBeTruthy()
})