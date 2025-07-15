/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';

// Import external configuration for DRY principle
function generateEntries() {
  const entries: Record<string, string> = {};

  // Get all component files for individual entries
  const componentFiles = glob.sync('./src/components/**/*.tsx', {
    cwd: __dirname,
  });
  componentFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const entryName = relativePath.replace(/\.tsx?$/, '').replace(/\//g, '-');
    entries[entryName] = file;
  });

  // Add provider files
  const providerFiles = glob.sync('./src/providers/**/*.tsx', {
    cwd: __dirname,
  });
  providerFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const entryName = relativePath.replace(/\.tsx?$/, '').replace(/\//g, '-');
    entries[entryName] = file;
  });

  // Also add utility and hook files
  const utilFiles = glob.sync('./src/{lib,hooks}/**/*.ts', { cwd: __dirname });
  utilFiles.forEach((file) => {
    const relativePath = path.relative('./src', file);
    const entryName = relativePath.replace(/\.tsx?$/, '').replace(/\//g, '-');
    entries[entryName] = file;
  });

  return entries;
}

const entries = generateEntries();

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  plugins: [
    react(),
    tailwindcss(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/packages/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Multiple entry points for tree-shaking
      entry: entries,
      name: 'ui',
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'es' ? 'mjs' : 'js'}`;
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Preserve tree shaking
        preserveModules: false,
        exports: 'named',
      },
    },
  },
}));
