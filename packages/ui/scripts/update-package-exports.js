#!/usr/bin/env node

/**
 * Script to update package.json exports from external configuration
 * This keeps package.json clean while maintaining all export definitions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import exports configuration from the central config file
const { generateExports } = await import('../exports.config.js');

console.log('🔄 Updating package.json exports...');

try {
  const packageJsonPath = path.join(__dirname, '../package.json');
  console.log('📄 Reading package.json from:', packageJsonPath);
  
  // Read current package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Generate exports dynamically
  const dynamicExports = generateExports();
  
  // Update exports
  packageJson.exports = dynamicExports;
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log('✅ Package.json exports updated successfully!');
  console.log(`📦 Updated ${Object.keys(dynamicExports).length} export entries`);
  
} catch (error) {
  console.error('❌ Error updating package.json exports:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
} 