# API Automation Lab

A collection of automated API tests built with Playwright and TypeScript to demonstrate modern approaches to REST API testing.

This repository is part of my QA Automation portfolio, where I explore different public APIs and implement automated tests following structured and maintainable patterns.

The goal of this project is to demonstrate how API testing can be organised using a modular and scalable test architecture.

## 🚀 Features

- **REST API Testing**: Automated tests for RESTful APIs using Playwright's request context
- **Authentication Handling**: Token-based authentication support
- **Modular Architecture**: Organized helpers, config, and test data
- **TypeScript Support**: Full TypeScript implementation for better code quality
- **Comprehensive Reporting**: Built-in Playwright HTML reports
- **CI/CD Ready**: Configurable for continuous integration pipelines

## 🛠️ Technologies Used

- [Playwright](https://playwright.dev/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Node.js](https://nodejs.org/) - Runtime environment

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ApiAutomationLab
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers (if not already installed):

```bash
npx playwright install
```

## 📁 Project Structure

```
ApiAutomationLab/
├── config/
│   └── api-config.ts          # Contains API base URLs and configuration values.
├── helpers/                   # Reusable functions used across multiple tests such as authentication and booking operations.
│   ├── auth-helper.ts
│   └── booking-helper.ts
├── test-data/
│   └── booking-data.ts        # Test data for booking requests
├── tests/
│   └── restful-booker-api.spec.ts  # API test specifications
├── playwright-report/         # Generated test reports
├── test-results/              # Test execution results
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration
└── tsconfig.json              # TypeScript configuration
```

## 🧪 Running Tests

### Run all tests:

```bash
npx playwright test
```

### Run specific test file:

```bash
npx playwright test tests/restful-booker-api.spec.ts
```

### Run tests in headed mode (with browser UI):

```bash
npx playwright test --headed
```

### Generate and view HTML report:

```bash
npx playwright show-report
```

### Run tests with debugging:

```bash
npx playwright test --debug
```

## 📊 API Endpoints Tested

This project tests the [Restful Booker API](https://restful-booker.herokuapp.com/), including:

- **Health Check**: `GET /ping`
- **Authentication**: `POST /auth`
- **Booking Management**:
  - Create booking: `POST /booking`
  - Get booking: `GET /booking/{id}`
  - Update booking: `PUT /booking/{id}`
  - Delete booking: `DELETE /booking/{id}`

## 🏗️ Configuration

### API Configuration

Update `config/api-config.ts` to modify API endpoints:

```typescript
export const API_URLS = {
  herokuappBooking: "https://restful-booker.herokuapp.com",
  tradeMe: "https://api.trademe.co.nz",
};
```

### Playwright Configuration

Modify `playwright.config.ts` for test settings, timeouts, and browser configurations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Test Data

Test data is stored in `test-data/` directory. Currently includes:

- Booking request payloads
- Authentication credentials

## 🔍 Best Practices

- Use descriptive test names
- Keep tests independent and isolated
- Use helper functions for reusable logic
- Maintain test data separately from test logic
- Include proper assertions and error handling

## 🚀 Future Improvements

This repository will continue evolving with additional examples including:

- Testing different public APIs
- Data-driven API tests
- CI integration with GitHub Actions
- More advanced response validations

## 🦋 Author

Ivonne Valenzuela
Software Tester

---

**Note**: This project uses the Restful Booker API for demonstration purposes. The API is hosted on Heroku and may have uptime limitations.
