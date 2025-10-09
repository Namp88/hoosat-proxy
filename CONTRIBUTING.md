# Contributing to Hoosat Proxy API

First off, thank you for considering contributing to Hoosat Proxy API! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include logs and error messages**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected**
* **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and linting:
   ```bash
   npm run lint
   npm run test
   ```
5. Commit your changes using conventional commits:
   ```bash
   git commit -m "feat: add new endpoint for X"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Access to a Hoosat node (local or remote)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/Namp88/hoosat-proxy.git
cd hoosat-proxy

# Add upstream remote
git remote add upstream https://github.com/Namp88/hoosat-proxy.git

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your local Hoosat node
nano .env

# Start development server
npm run start:dev
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Style Guide

### TypeScript Style

- Use TypeScript strict mode
- Follow existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Use English for all comments and documentation

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add endpoint for getting mempool size
fix: correct balance calculation for coinbase transactions
docs: update API documentation for address endpoints
```

### Code Structure

When adding new endpoints:

1. Create DTO files in `src/modules/[module]/dto/`
2. Add validation decorators to DTOs
3. Update controller with proper Swagger decorators
4. Add comprehensive examples in Swagger
5. Update README.md if adding new features

Example controller method:
```typescript
@Get('example')
@ApiOperation({ 
  summary: 'Short description',
  description: 'Detailed description of what this endpoint does'
})
@ApiResponse({ 
  status: 200, 
  description: 'Success response description',
  schema: {
    example: {
      success: true,
      data: { /* example data */ }
    }
  }
})
async exampleMethod() {
  return this.service.exampleMethod();
}
```

## Adding a New Endpoint

1. Determine which module the endpoint belongs to
2. Create DTO if needed in `dto/` folder
3. Add method to controller with:
    - Proper HTTP decorator (`@Get`, `@Post`, etc)
    - Swagger decorators (`@ApiOperation`, `@ApiResponse`)
    - Validation decorators on parameters
4. Use `ClientService` to call SDK methods
5. Test the endpoint
6. Update documentation

## Questions?

Feel free to open an issue with the `question` label or reach out on our Discord server.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.