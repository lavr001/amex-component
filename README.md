# DLS Component Library

A reusable React component library built as part of the DLS Team take home assessment. The library starts with an accessible **Accordion** component.

## Quick Start

```bash
npm install
npm start       # Dev server at http://localhost:3000
npm test        # Run unit tests
npm run build   # Production build
npm run format  # Format source files with Prettier
```

## Task One — Configuration & Documentation

### Tech Stack & Choices

| Tool                                | Why                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19** (Create React App)     | Zero-config scaffold with built-in JSX, ESLint, and Webpack. Fast to get started — in production a library would use Rollup or Vite for proper tree-shaking and ESM/CJS output. |
| **React Testing Library + Jest**    | Tests user-visible behaviour rather than implementation details, aligning with accessibility-first development. Ships with CRA.                                                 |
| **@testing-library/user-event v14** | Simulates real pointer and keyboard interactions — more realistic than `fireEvent`. Required for the `userEvent.setup()` API used in the tests.                                 |
| **Prettier**                        | Opinionated, automatic code formatting. Configured in `.prettierrc`, runnable via `npm run format`. Removes formatting debates from code review.                                |
| **ESLint** (via `react-scripts`)    | CRA ships with `eslint-config-react-app` — catches common React errors and bad practices out of the box without extra configuration.                                            |

### Project Structure

```
src/
  components/
    Accordion/
      Accordion.js      # Component implementation
      Accordion.css     # Scoped styles
      Accordion.test.js # Unit tests
  App.js                # Demo / visual rendering
```

## Task Two — Accordion Component

### How it works

Each `AccordionPanel` manages its own open/closed state independently using `useState`. The parent `Accordion` component is purely presentational — it maps a `panels` array into `AccordionPanel` instances with no shared state.

`useId` (React 18+) is used inside each `AccordionPanel` to generate stable, unique IDs for ARIA attributes, avoiding hydration mismatches in SSR contexts.

### Usage

```jsx
import Accordion from './components/Accordion/Accordion';

const panels = [
  { title: 'Section 1', content: 'Body text or any JSX' },
  { title: 'Section 2', content: <MyComponent /> },
];

<Accordion panels={panels} />;
```

### Props

| Prop     | Type                                           | Default | Description           |
| -------- | ---------------------------------------------- | ------- | --------------------- |
| `panels` | `Array<{ title: string, content: ReactNode }>` | `[]`    | The panels to render. |

### Accessibility

- Each trigger button has `aria-expanded` and `aria-controls` pointing to its content region.
- Each content region has `role="region"` and `aria-labelledby` referencing its header button.
- IDs are generated with `useId` — stable across renders and SSR-safe.
- Fully keyboard-navigable via standard button focus and activation.

## Future Improvements

Given more time, the following enhancements would be prioritised:

### Developer Experience

- **ESLint custom config** — extend beyond CRA defaults with `eslint-plugin-jsx-a11y` for accessibility linting and `eslint-plugin-import` for import ordering.
- **Husky + lint-staged** — pre-commit hooks to auto-run Prettier and ESLint on staged files, preventing formatting drift from reaching the repository.
- **Commitlint** — enforce conventional commit messages to enable automated changelog generation.
- **EditorConfig** — ensure consistent indentation and line endings across different editors and operating systems.

### Build & Packaging

- **Migrate to Vite or Rollup** — CRA is suitable for demos but a published component library needs a bundler that outputs ESM + CJS with proper tree-shaking.
- **TypeScript** — static typing for better IDE support, self-documenting props, and compile-time safety.
- **CSS Modules or CSS-in-JS** — scope styles to avoid class name collisions when the library is consumed in a larger application.
- **Storybook** — visual component development, interactive documentation, and isolated testing environment.

### Testing

- **Code coverage thresholds** — enforce minimum coverage in CI via `--coverage --coverageThreshold`.
- **Visual regression tests** — tools like Chromatic or Percy to catch unintended visual changes across component states.
- **Axe integration** — automated accessibility audits via `jest-axe` running alongside unit tests.

### CI/CD

- **GitHub Actions** — automated Lint → Test → Build pipeline on every pull request.
- **Automated publishing** — semantic-release for version bumps, changelog generation, and npm publishing on merge to main.
