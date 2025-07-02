import React, { useState, useEffect } from 'react';
import { usePluginRegistry } from '../../../hooks/use-plugin-registry';
import { PluginConfig } from '../../../types/plugin.types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@repo/ui';
import { Label, Input, Textarea, Switch, Button } from '@repo/ui';

interface UpsertPluginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPlugin?: PluginConfig | null;
  onSuccess?: () => void;
}

const UpsertPluginSheet: React.FC<UpsertPluginSheetProps> = ({
  open,
  onOpenChange,
  editingPlugin,
  onSuccess,
}) => {
  const { registerPlugin, updatePlugin } = usePluginRegistry();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    url: '',
    moduleName: '',
    exposedModule: '',
    icon: '',
    enabled: true,
  });

  // Reset form when sheet opens/closes or editing plugin changes
  useEffect(() => {
    if (editingPlugin) {
      setFormData({
        name: editingPlugin.name,
        description: editingPlugin.description || '',
        version: editingPlugin.version,
        url: editingPlugin.url,
        moduleName: editingPlugin.moduleName,
        exposedModule: editingPlugin.exposedModule,
        icon: editingPlugin.icon || '',
        enabled: editingPlugin.enabled,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        version: '',
        url: '',
        moduleName: '',
        exposedModule: '',
        icon: '',
        enabled: true,
      });
    }
  }, [editingPlugin, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pluginData = {
        ...formData,
        routes: [
          {
            path: `/${formData.moduleName.toLowerCase()}`,
            label: formData.name,
          },
        ],
      };

      if (editingPlugin) {
        await updatePlugin(editingPlugin.id, pluginData);
      } else {
        await registerPlugin(pluginData);
      }

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error(
        `Failed to ${editingPlugin ? 'update' : 'register'} plugin:`,
        err
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        className="w-[700px] sm:w-[700px] xs:w-[90%] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            {editingPlugin ? 'Edit Plugin' : 'Add New Plugin'}
          </SheetTitle>
          <SheetDescription>
            {editingPlugin
              ? 'Update the configuration of your micro-frontend plugin'
              : 'Register a new micro-frontend plugin to extend your application'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Plugin Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter plugin name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version *</Label>
                <Input
                  id="version"
                  name="version"
                  required
                  value={formData.version}
                  onChange={handleInputChange}
                  placeholder="e.g., 1.0.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter plugin description"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="Icon name (e.g., 'database', 'code') or URL (e.g., https://example.com/icon.png)"
              />
              <p className="text-sm text-muted-foreground">
                Optional: Use a Lucide React icon name (like 'database', 'code',
                'user', 'home') or provide a URL to an icon image
              </p>
              <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer hover:text-foreground">
                  View available icon names
                </summary>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="font-medium mb-2">Popular icon names:</p>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <span>home</span>
                    <span>user</span>
                    <span>users</span>
                    <span>calendar</span>
                    <span>file</span>
                    <span>database</span>
                    <span>server</span>
                    <span>cloud</span>
                    <span>code</span>
                    <span>terminal</span>
                    <span>settings</span>
                    <span>globe</span>
                    <span>mail</span>
                    <span>phone</span>
                    <span>heart</span>
                    <span>star</span>
                    <span>search</span>
                    <span>shield</span>
                    <span>lock</span>
                    <span>briefcase</span>
                    <span>activity</span>
                    <span>zap</span>
                    <span>camera</span>
                    <span>music</span>
                  </div>
                  <p className="mt-2 text-xs">
                    See more at{' '}
                    <a
                      href="https://lucide.dev/icons/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      lucide.dev/icons
                    </a>
                  </p>
                </div>
              </details>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Plugin URL *</Label>
              <Input
                id="url"
                name="url"
                type="url"
                required
                value={formData.url}
                onChange={handleInputChange}
                placeholder="http://localhost:4203/remoteEntry.js"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="moduleName">Module Name *</Label>
                <Input
                  id="moduleName"
                  name="moduleName"
                  required
                  value={formData.moduleName}
                  onChange={handleInputChange}
                  placeholder="e.g., myPlugin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exposedModule">Exposed Module *</Label>
                <Input
                  id="exposedModule"
                  name="exposedModule"
                  required
                  value={formData.exposedModule}
                  onChange={handleInputChange}
                  placeholder="e.g., Module or ./Component"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked: boolean) =>
                  setFormData((prev) => ({ ...prev, enabled: checked }))
                }
              />
              <Label htmlFor="enabled">Enable plugin after registration</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                {editingPlugin ? 'Update Plugin' : 'Register Plugin'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpsertPluginSheet;
