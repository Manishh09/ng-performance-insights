# Angular Performance Insights

A monorepo containing multiple Angular projects showcasing performance optimization techniques and best practices.

[![Angular](https://img.shields.io/badge/Angular-17.3-dd0031.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6.svg)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-b7178c.svg)](https://rxjs.dev/)

## Overview

This monorepo contains several Angular projects focused on different aspects of performance optimization:

- **01-subscription-management**: Demonstrates various RxJS subscription management patterns to prevent memory leaks
- **perf-insights-ui**: UI components for Angular performance monitoring and visualization
- **shared**: Shared libraries and utilities used across projects

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.14.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)
- [Angular CLI](https://angular.io/cli) (v17.3.0 or higher)

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ng-performance-insights.git
   cd ng-performance-insights
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run a specific project

   For the subscription management demo:
   ```bash
   npm run start:01
   ```
   Then navigate to `http://localhost:4200/`

## Project Structure

```
ng-performance-insights/
├── projects/
│   ├── 01-subscription-management/  # RxJS subscription patterns
│   ├── perf-insights-ui/            # Performance monitoring UI
│   └── shared/                      # Shared libraries
├── package.json                     # Workspace npm configuration
└── angular.json                     # Angular workspace configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run ng` | Run Angular CLI commands |
| `npm start` | Start the default application |
| `npm run start:01` | Start the subscription management demo |
| `npm run build:01` | Build the subscription management demo |
| `npm run build` | Build all projects |
| `npm run watch` | Build and watch for changes in development mode |
| `npm test` | Run unit tests for all projects |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Angular](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [Angular CLI](https://cli.angular.io/)
