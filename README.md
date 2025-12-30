# SauceDemo Playwright Automation

This project demonstrates end-to-end test automation using **Playwright (JavaScript)** on the SauceDemo application.

## Features Covered
- Login validation (valid, invalid, locked user)
- Add to cart functionality
- Cart count and product validation
- Checkout flow validation
- Negative scenarios (empty cart, missing checkout fields)
- Page Object Model (POM) design pattern

## Tech Stack
- Playwright
- JavaScript
- Node.js

## Project Structure
- pageObjects/   → Page Object files  
- tests/         → Test specs  
- utils/         → Test data  
- SauceDemo_Test_Cases.xlsx → Manual test cases  

## How to Run Tests
### 1️⃣ Install dependencies
```bash
npm install

2️⃣ Run all tests
npx playwright test

3️⃣ Run tests in headed mode
npx playwright test --headed

4️⃣ View test report
npx playwright show-report



