# Playwright Test Automation Practice

Learning project for test automation using [Playwright](https://playwright.dev/) with TypeScript. Tests are written against [saucedemo.com](https://www.saucedemo.com/), a public demo e-commerce site made for practicing automation.

## Background

I'm a manual QA engineer learning automated testing. This repo tracks that process — real tests, written and debugged from scratch, covering common flows I'd normally test manually.

## What's covered

- **Login** (`tests/login.spec.ts`)
  - Successful login
  - Login failure with incorrect password
- **Cart** (`tests/cart.spec.ts`)
  - Adding a single item and verifying the cart badge
  - Adding multiple items and verifying the count
  - Removing an item and verifying the count updates
  - Verifying the cart page lists the correct items
- **Sorting**
  - Sorting products by price (low to high) and verifying order

## Tech stack

- [Playwright Test](https://playwright.dev/docs/intro) (TypeScript)
- GitHub Actions for CI — tests run automatically on every push

## Running locally

```bash
# install dependencies
npm install

# install browsers (first time only)
npx playwright install

# run all tests
npx playwright test

# run tests with the visual UI runner
npx playwright test --ui

# view the HTML report after a run
npx playwright show-report
```

## Status

Actively adding tests as I work through Playwright fundamentals: locators, fixtures, assertions, and (next) the Page Object Model.
