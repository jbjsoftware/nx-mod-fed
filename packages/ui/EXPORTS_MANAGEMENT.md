# Exports Management

This document explains how the UI library's exports are organized and managed to keep the `package.json` clean while supporting tree-shakable imports.

## 📁 File Structure

```
packages/ui/
├── exports.config.js          # External exports configuration
├── scripts/
│   └── update-package-exports.js  # Script to update package.json exports
├── package.json              # Main package configuration
└── src/                      # Source code
    ├── components/
    ├── hooks/
    └── lib/
```

## 🎯 Benefits of External Exports Configuration

### 1. **Cleaner package.json**

- Removes 100+ lines of export definitions from `package.json`
- Keeps the main configuration file focused on essentials

### 2. **Better Organization**

- Exports are logically grouped by type (components, hooks, utilities)
- Comments and documentation can be added to explain export patterns

### 3. **Dynamic Generation**

- Can automatically generate exports based on file structure
- Reduces manual maintenance when adding new components

### 4. **Version Control**

- Easier to review changes to exports in separate files
- Cleaner git diffs when exports are modified

## 🔧 How It Works

### 1. **exports.config.js**

Contains two export strategies:

**Static Exports (Manual):**

```javascript
const staticExports = {
  '.': {
    types: './index.d.ts',
    import: './index.mjs',
    require: './index.js',
  },
  './components/ui/button': {
    import: './components-ui-button.mjs',
    types: './components-ui-button.d.ts',
  },
  // ... more exports
};
```

**Dynamic Exports (Automatic):**

```javascript
function generateExports() {
  // Automatically scan src/ directory
  // Generate exports based on file structure
  return exports;
}
```

### 2. **Build Script**

The `scripts/update-package-exports.js` script:

- Reads the external configuration
- Updates `package.json` exports section
- Runs automatically before builds (via `prebuild` script)

### 3. **Package.json Scripts**

```json
{
  "scripts": {
    "update-exports": "node scripts/update-package-exports.js",
    "prebuild": "npm run update-exports"
  }
}
```

## 📋 Usage Examples

### Manual Export Update

```bash
# Update exports manually
npm run update-exports

# Or run directly
node scripts/update-package-exports.js
```

### Automatic Updates

```bash
# Exports are updated automatically before build
nx build ui
```

### Environment Variables

```bash
# Use static exports (default)
USE_STATIC_EXPORTS=true npm run update-exports

# Use dynamic exports
USE_STATIC_EXPORTS=false npm run update-exports
```

## 🚀 Adding New Components

### Method 1: Static (Manual)

1. Add component to `src/components/ui/`
2. Update `exports.config.js` static exports
3. Run `npm run update-exports`

### Method 2: Dynamic (Automatic)

1. Add component to `src/components/ui/`
2. Run `npm run update-exports` (automatically detected)

## 🔄 Migration Process

If you want to move exports to external files in other packages:

1. **Create exports.config.js**

   ```javascript
   module.exports = {
     staticExports: {
       /* your exports */
     },
     generateExports: () => {
       /* dynamic logic */
     },
   };
   ```

2. **Create update script**

   ```javascript
   const { staticExports } = require('./exports.config.js');
   // Update package.json logic
   ```

3. **Update package.json**

   ```json
   {
     "scripts": {
       "update-exports": "node scripts/update-package-exports.js",
       "prebuild": "npm run update-exports"
     }
   }
   ```

4. **Clean up package.json**
   - Remove manual exports section
   - Let the script manage it automatically

## 📊 Comparison

| Approach             | Pros                           | Cons                                   |
| -------------------- | ------------------------------ | -------------------------------------- |
| **Inline (Current)** | Simple, everything in one file | Large package.json, harder to maintain |
| **External Static**  | Clean separation, easy to read | Manual maintenance required            |
| **External Dynamic** | Automatic, no manual work      | More complex, potential for errors     |

## 🎉 Conclusion

Moving exports to external files provides:

- **Better organization** and maintainability
- **Cleaner version control** with focused diffs
- **Automatic generation** possibilities
- **Easier collaboration** with clear separation of concerns

The current implementation supports both approaches, allowing you to choose the best fit for your workflow.
