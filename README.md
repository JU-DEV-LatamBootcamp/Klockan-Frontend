# Klockan-Frontend

___

# Getting Started

Follow these steps to clone the repository and set up the project on your local environment.

## Prerequisites

Make sure you have the following software installed:
- Angular CLI (16.2.x)
- Node.js (^16.14.0 || ^18.10.0)
- TypeScript (>=4.9.3 <5.2.0)

Angular Official Documentation - [Version Support Status](https://angular.io/guide/versions)


## Cloning the Repository

1. Open a terminal.
2. Clone the repository using the following Git command: `git clone https://github.com/JU-DEV-LatamBootcamp/Klockan-Frontend.git`

3. Change into the project directory: `cd Klockan-Frontend`

## Installing Dependencies

1. Inside the project directory, install the dependencies: `npm install`

## Running the Application

1. Start the development server with the Angular CLI: `ng serve`

2. Open a browser and go to `http://localhost:4200` to see the running application.

## Testing the Application

1. To execute the unit tests for components and services: `ng test`

2. Open a browser and go to `http://localhost:9876`

### Refer to the `package.json` file for other useful scripts.

---

# Project Folder Structure

## `src/`

The root directory for the application's source code.

### `src/app`

The main application directory, containing the core module, feature modules, and shared resources.

#### `src/app/core`

Central services, guards, interceptors, and single-use components reside here.

- `guards/`: Contains route guards that are activated before loading certain routes to protect them.
- `interceptors/`: Contains HTTP interceptors to modify requests and responses.
- `services/`: Essential services that the application needs to function and that should be instantiated only once.
- `core.module.ts`: The main module that imports and provides the central services and components.

#### `src/app/modules`

Contains feature-specific modules of the application.

- `home/`: The home feature module, which could include subfolders for specific components and services related to the home feature.
  - `components/`: Specific components for the 'home' module like navigation bars, sliders, etc.
  - `services/`: Services used exclusively within the 'home' module.
  - `home-routing.module.ts`: Routing configuration for the 'home' module, facilitating lazy loading.
  - `home.module.ts`: The Angular module that declares and encapsulates all components and services of the 'home' module.

#### `src/app/shared`

Resources that are reused across various parts of the application.

- `components/`: Components reused in different parts of the application.
- `directives/`: Directives that encapsulate reusable DOM behaviors.
- `models/`: Interfaces or classes that define data structures.
- `pipes/`: Pipes for transforming data to be displayed in components.

### Root-Level Application Files

Files at the root of the `app/` directory define the core application component and routing.

- `app-routing.module.ts`: Defines the top-level routes of the application.
- `app.component.html`: HTML template for the application's root component.
- `app.component.sass`: Styles specific to the application's root component.
- `app.component.spec.ts`: Unit tests for the application's root component.
- `app.component.ts`: Class code for the application's root component.
- `app.module.ts`: The root application module that declares and groups initial components and services.

### `src/assets`

Static assets like images, fonts, and global styles.

### `src/environments`

Configuration files for different environments (development, production, etc.).

## Folder Structure Visualization

```text
src/
└── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   └── core.module.ts
│   │
│   ├── modules/
│   │   └── home/
│   │     ├── components/
│   │     ├── services/
│   │     ├── home-routing.module.ts
│   │     └── home.module.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── models/
│   │   └── pipes/
│   │
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.sass
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
│
└── environments/
```
