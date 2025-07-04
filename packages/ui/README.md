# @repo/ui

A tree-shakable React UI component library built with Radix UI primitives and Tailwind CSS.

## Installation

```bash
pnpm add @repo/ui
```

## Usage

This library supports both **barrel imports** (for convenience) and **individual component imports** (for optimal tree-shaking and bundle size).

### Method 1: Barrel Import (All Components)

Import all components from the main entry point:

```tsx
import { Button, Card, Dialog } from '@repo/ui';
import '@repo/ui/styles'; // Import styles separately for better bundling

function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Method 2: Individual Component Imports (Recommended)

Import components individually for optimal tree-shaking:

```tsx
import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import { Dialog } from '@repo/ui/components/ui/dialog';
import '@repo/ui/styles';

function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Available Components

### UI Components

- `@repo/ui/components/ui/alert`
- `@repo/ui/components/ui/alert-dialog`
- `@repo/ui/components/ui/avatar`
- `@repo/ui/components/ui/badge`
- `@repo/ui/components/ui/breadcrumb`
- `@repo/ui/components/ui/button`
- `@repo/ui/components/ui/card`
- `@repo/ui/components/ui/checkbox`
- `@repo/ui/components/ui/collapsible`
- `@repo/ui/components/ui/dialog`
- `@repo/ui/components/ui/dropdown-menu`
- `@repo/ui/components/ui/input`
- `@repo/ui/components/ui/label`
- `@repo/ui/components/ui/progress`
- `@repo/ui/components/ui/radio-group`
- `@repo/ui/components/ui/scroll-area`
- `@repo/ui/components/ui/select`
- `@repo/ui/components/ui/separator`
- `@repo/ui/components/ui/sheet`
- `@repo/ui/components/ui/sidebar`
- `@repo/ui/components/ui/skeleton`
- `@repo/ui/components/ui/sonner`
- `@repo/ui/components/ui/switch`
- `@repo/ui/components/ui/tabs`
- `@repo/ui/components/ui/textarea`
- `@repo/ui/components/ui/tooltip`

### Other Components

- `@repo/ui/components/theme-provider`
- `@repo/ui/components/mode-toggle`

### Utilities & Hooks

- `@repo/ui/lib/utils`
- `@repo/ui/hooks/use-mobile`

## Bundle Size Optimization

### Tree-Shaking Benefits

When using individual imports, your bundler will only include the components you actually use:

```tsx
// ❌ This imports ALL components (~200kb+)
import { Button } from '@repo/ui';

// ✅ This only imports the Button component (~2kb)
import { Button } from '@repo/ui/components/ui/button';
```

### Bundle Analysis

You can analyze which components are being included in your bundle:

```bash
# With webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/static/js/*.js

# With Vite bundle analyzer
npx vite-bundle-analyzer dist
```

## TypeScript Support

All components include full TypeScript definitions. Individual imports provide better IDE performance since only the types for imported components are loaded.

## Development

To build the library:

```bash
nx build ui
```

To run in development mode:

```bash
nx dev ui
```

## Migration from Barrel Imports

If you're currently using barrel imports, you can gradually migrate to individual imports:

1. **Step 1**: Add the styles import separately

   ```tsx
   import { Button } from '@repo/ui';
   import '@repo/ui/styles'; // Add this
   ```

2. **Step 2**: Replace barrel imports with individual imports

   ```tsx
   // Before
   import { Button, Card } from '@repo/ui';

   // After
   import { Button } from '@repo/ui/components/ui/button';
   import { Card } from '@repo/ui/components/ui/card';
   ```

3. **Step 3**: Remove barrel import altogether

This approach ensures your application continues to work while you optimize bundle size.
