/**
 * Package exports configuration for @repo/ui
 * This file defines all the individual component exports for tree-shaking
 */

const { glob } = require('glob');
const path = require('path');

// Get all component files dynamically
const componentFiles = glob.sync('./src/components/**/*.tsx', { cwd: __dirname });
const hookFiles = glob.sync('./src/hooks/**/*.ts', { cwd: __dirname });
const libFiles = glob.sync('./src/lib/**/*.ts', { cwd: __dirname });

/**
 * Generate exports object for package.json
 */
function generateExports() {
  const exports = {
    // Main barrel export
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    },
    // Styles
    "./styles": "./ui.css"
  };

  // Add component exports
  componentFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[\/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  // Add hook exports
  hookFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[\/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  // Add lib exports
  libFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[\/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  return exports;
}

/**
 * Static exports for manual control (alternative to dynamic generation)
 */
const staticExports = {
  ".": {
    "types": "./index.d.ts",
    "import": "./index.mjs",
    "require": "./index.js"
  },
  "./styles": "./ui.css",
  
  // UI Components
  "./components/ui/alert": {
    "import": "./components-ui-alert.mjs",
    "types": "./components-ui-alert.d.ts"
  },
  "./components/ui/alert-dialog": {
    "import": "./components-ui-alert-dialog.mjs",
    "types": "./components-ui-alert-dialog.d.ts"
  },
  "./components/ui/avatar": {
    "import": "./components-ui-avatar.mjs",
    "types": "./components-ui-avatar.d.ts"
  },
  "./components/ui/badge": {
    "import": "./components-ui-badge.mjs",
    "types": "./components-ui-badge.d.ts"
  },
  "./components/ui/breadcrumb": {
    "import": "./components-ui-breadcrumb.mjs",
    "types": "./components-ui-breadcrumb.d.ts"
  },
  "./components/ui/button": {
    "import": "./components-ui-button.mjs",
    "types": "./components-ui-button.d.ts"
  },
  "./components/ui/card": {
    "import": "./components-ui-card.mjs",
    "types": "./components-ui-card.d.ts"
  },
  "./components/ui/checkbox": {
    "import": "./components-ui-checkbox.mjs",
    "types": "./components-ui-checkbox.d.ts"
  },
  "./components/ui/collapsible": {
    "import": "./components-ui-collapsible.mjs",
    "types": "./components-ui-collapsible.d.ts"
  },
  "./components/ui/dialog": {
    "import": "./components-ui-dialog.mjs",
    "types": "./components-ui-dialog.d.ts"
  },
  "./components/ui/dropdown-menu": {
    "import": "./components-ui-dropdown-menu.mjs",
    "types": "./components-ui-dropdown-menu.d.ts"
  },
  "./components/ui/input": {
    "import": "./components-ui-input.mjs",
    "types": "./components-ui-input.d.ts"
  },
  "./components/ui/label": {
    "import": "./components-ui-label.mjs",
    "types": "./components-ui-label.d.ts"
  },
  "./components/ui/progress": {
    "import": "./components-ui-progress.mjs",
    "types": "./components-ui-progress.d.ts"
  },
  "./components/ui/radio-group": {
    "import": "./components-ui-radio-group.mjs",
    "types": "./components-ui-radio-group.d.ts"
  },
  "./components/ui/scroll-area": {
    "import": "./components-ui-scroll-area.mjs",
    "types": "./components-ui-scroll-area.d.ts"
  },
  "./components/ui/select": {
    "import": "./components-ui-select.mjs",
    "types": "./components-ui-select.d.ts"
  },
  "./components/ui/separator": {
    "import": "./components-ui-separator.mjs",
    "types": "./components-ui-separator.d.ts"
  },
  "./components/ui/sheet": {
    "import": "./components-ui-sheet.mjs",
    "types": "./components-ui-sheet.d.ts"
  },
  "./components/ui/sidebar": {
    "import": "./components-ui-sidebar.mjs",
    "types": "./components-ui-sidebar.d.ts"
  },
  "./components/ui/skeleton": {
    "import": "./components-ui-skeleton.mjs",
    "types": "./components-ui-skeleton.d.ts"
  },
  "./components/ui/sonner": {
    "import": "./components-ui-sonner.mjs",
    "types": "./components-ui-sonner.d.ts"
  },
  "./components/ui/switch": {
    "import": "./components-ui-switch.mjs",
    "types": "./components-ui-switch.d.ts"
  },
  "./components/ui/tabs": {
    "import": "./components-ui-tabs.mjs",
    "types": "./components-ui-tabs.d.ts"
  },
  "./components/ui/textarea": {
    "import": "./components-ui-textarea.mjs",
    "types": "./components-ui-textarea.d.ts"
  },
  "./components/ui/tooltip": {
    "import": "./components-ui-tooltip.mjs",
    "types": "./components-ui-tooltip.d.ts"
  },

  // Other Components
  "./components/theme-provider": {
    "import": "./components-theme-provider.mjs",
    "types": "./components-theme-provider.d.ts"
  },
  "./components/mode-toggle": {
    "import": "./components-mode-toggle.mjs",
    "types": "./components-mode-toggle.d.ts"
  },

  // Hooks
  "./hooks/use-mobile": {
    "import": "./hooks-use-mobile.mjs",
    "types": "./hooks-use-mobile.d.ts"
  },

  // Utilities
  "./lib/utils": {
    "import": "./lib-utils.mjs",
    "types": "./lib-utils.d.ts"
  }
};

module.exports = {
  generateExports,
  staticExports
}; 