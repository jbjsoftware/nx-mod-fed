import React, { useState } from 'react';
import { usePluginRegistry } from '../../../hooks/use-plugin-registry';
import { PluginConfig } from '../../../types/plugin.types';
import * as Lucide from 'lucide-react';
import { Button, Alert, AlertDescription } from '@repo/ui';
import UpsertPluginSheet from '../components/upsert-plugin-sheet';
import PluginCard from '../components/plugin-card';
import { Card, CardContent } from '@repo/ui';

export const PluginManager: React.FC = () => {
  const { plugins, loading, error, unregisterPlugin, togglePlugin } =
    usePluginRegistry();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingPlugin, setEditingPlugin] = useState<PluginConfig | null>(null);

  const handleEdit = (plugin: PluginConfig) => {
    setEditingPlugin(plugin);
    setSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlugin(null);
    setSheetOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Plugin Manager</h2>
          <p className="text-muted-foreground">
            Manage and configure your micro-frontend plugins
          </p>
        </div>
        <Button onClick={handleAddNew} size="lg">
          <Lucide.Plus className="mr-2 h-4 w-4" />
          Add Plugin
        </Button>
      </div>
      <div className="container mx-auto p-6 max-w-6xl">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>Error: {error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <Alert className="mb-6">
            <AlertDescription>Loading plugins...</AlertDescription>
          </Alert>
        )}

        <UpsertPluginSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          editingPlugin={editingPlugin}
        />

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2">
              Installed Plugins
            </h3>
            <p className="text-muted-foreground">
              Manage your registered micro-frontend plugins
            </p>
          </div>

          {Object.keys(plugins).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Lucide.Settings className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No plugins installed</p>
                <p className="text-muted-foreground">
                  Add your first plugin to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(plugins).map((plugin: PluginConfig) => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  onEdit={handleEdit}
                  onToggle={togglePlugin}
                  onDelete={unregisterPlugin}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PluginManager;
