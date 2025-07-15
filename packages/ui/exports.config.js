/**
 * Package exports configuration for @repo/ui
 * This file dynamically generates all individual component, hook, provider, and utility exports for tree-shaking
 * based on the actual files in the src directory.
 */

import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all component files dynamically
const componentFiles = glob.sync('./src/components/**/*.tsx', { cwd: __dirname });
const hookFiles = glob.sync('./src/hooks/**/*.ts', { cwd: __dirname });
const libFiles = glob.sync('./src/lib/**/*.ts', { cwd: __dirname });
const providerFiles = glob.sync('./src/providers/**/*.tsx', { cwd: __dirname });

/**
 * Generate exports object for package.json
 */
function generateExports() {
  const exports = {
    // Styles
    "./styles": "./ui.css"
  };

  // Add component exports
  componentFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  // Add hook exports
  hookFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  // Add lib exports
  libFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  // Add provider exports
  providerFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const exportPath = './' + relativePath.replace(/\.tsx?$/, '');
    const entryName = relativePath.replace(/[/\\]/g, '-').replace(/\.tsx?$/, '');
    
    exports[exportPath] = {
      "import": `./${entryName}.mjs`,
      "types": `./${entryName}.d.ts`
    };
  });

  return exports;
}

export {
  generateExports
}; 