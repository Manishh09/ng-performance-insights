# Angular Subscription Management Patterns

[![Angular](https://img.shields.io/badge/Angular-17.3-dd0031.svg)](https://angular.io/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-b7178c.svg)](https://rxjs.dev/)

A comprehensive demonstration of different RxJS subscription management patterns in Angular applications, showcasing best practices to prevent memory leaks.

![Angular Subscription Management Demo](https://angular.io/assets/images/logos/angular/angular.svg)

## Overview

This project demonstrates five different approaches to manage RxJS subscriptions in Angular applications:

1. **Classic Pattern**: Manual subscription and unsubscription
2. **TakeUntil Pattern**: Using the `takeUntil` operator with a destroy$ subject
3. **Auto Unsubscribe Pattern**: Using Angular's `takeUntilDestroyed` operator
4. **SubSink Pattern**: Using the SubSink library to manage multiple subscriptions
5. **Advanced Patterns**: Managing multiple observables with the different approaches

## Features

- 🔄 Real-time demonstration of subscription handling
- 📊 Practical examples with user and product data
- 🧩 Component isolation for each pattern
- 🛠️ Modern Angular best practices
- 📱 Responsive design with Angular.dev-inspired styling

## Getting Started

### Prerequisites

- Node.js (v16.14.0 or higher)
- npm (v8.0.0 or higher)
- Angular CLI (v17.3.0 or higher)

### Installation

1. Navigate to the monorepo root
   ```bash
   cd ng-performance-insights
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run start:01
   ```

4. Open your browser and navigate to `http://localhost:4200/`

## Project Structure

```
01-subscription-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── classic/                 # Manual subscription management
│   │   │   ├── takeuntil/               # TakeUntil pattern
│   │   │   ├── take-untildestroyed/     # Auto Unsubscribe pattern
│   │   │   ├── subsink/                 # SubSink pattern
│   │   │   ├── advanced/                # Advanced implementations
│   │   │   └── navigation/              # App navigation
│   │   ├── models/                      # Data models
│   │   ├── services/                    # Data services
│   │   ├── app.component.ts             # Root component
│   │   └── app.routes.ts                # Application routes
│   └── assets/                          # Static assets
└── ...
```

## Subscription Management Patterns

### 1. Classic Pattern

The traditional approach where subscriptions are stored in class properties and manually unsubscribed in ngOnDestroy:

```typescript
export class UserListClassicComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err),
      complete: () => console.log('Completed')
    });
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

### 2. TakeUntil Pattern

Using the `takeUntil` operator with a destroy$ subject:

```typescript
export class UserListTakeuntilComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => this.users = users,
        error: (err) => console.error(err),
        complete: () => console.log('Completed')
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 3. Auto Unsubscribe Pattern

Using Angular's `takeUntilDestroyed` operator:

```typescript
export class UserListAutoUnsubscribeComponent implements OnInit {
  constructor() {
    this.userService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => this.users = users,
        error: (err) => console.error(err),
        complete: () => console.log('Completed')
      });
  }
}
```

### 4. SubSink Pattern

Using the SubSink library:

```typescript
export class UserProfileSubsinkComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  
  ngOnInit(): void {
    this.subs.sink = this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err),
      complete: () => console.log('Completed')
    });
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
```

## Performance Comparison

| Pattern | Pros | Cons |
|---------|------|------|
| Classic | Simple to understand | Error-prone, requires manual tracking |
| TakeUntil | Clean, idiomatic RxJS | Requires boilerplate setup |
| Auto Unsubscribe | Minimal code, built into Angular | Only works with Angular 16+ |
| SubSink | Great for multiple subscriptions | Requires external library |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Angular Team](https://angular.io/)
- [RxJS Team](https://rxjs.dev/)
- [SubSink](https://github.com/wardbell/subsink)
