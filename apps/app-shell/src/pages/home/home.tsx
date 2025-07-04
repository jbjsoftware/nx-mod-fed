import React from 'react';
// // 📊 Bundle Size Demonstration:
//
// ❌ BEFORE (Barrel Import):
// import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
// Bundle Size: ~200kb+ (includes ALL components)
//
// ✅ AFTER (Individual Imports):
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
// Bundle Size: ~4kb (only the components you use)

export function Home() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Micro-Frontend Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the home page of your modular application. The platform uses
            module federation to load remote applications dynamically.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access your main dashboard with analytics and insights.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your product catalog and inventory.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure your application preferences.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tree-Shakable UI Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The UI library now supports individual component imports for optimal
            bundle sizes:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm">
              {`// ✅ Tree-shakable imports
import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import '@repo/ui/styles';`}
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            This approach can reduce your bundle size by 95%+ compared to barrel
            imports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
