import React from 'react';
import { PluginConfig } from '../../../types/plugin.types';
import * as Lucide from 'lucide-react';
import { Button } from '@repo/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { Separator } from '@repo/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui';
import { Badge } from '@repo/ui';

interface PluginCardProps {
  plugin: PluginConfig;
  onEdit: (plugin: PluginConfig) => void;
  onToggle: (pluginId: string, enabled: boolean) => void;
  onDelete: (pluginId: string) => void;
}

const PluginCard: React.FC<PluginCardProps> = ({
  plugin,
  onEdit,
  onToggle,
  onDelete,
}) => {
  const renderPluginIcon = (plugin: PluginConfig) => {
    return plugin.icon
      ? React.createElement((Lucide as any)[plugin.icon] || Lucide.MinusIcon)
      : React.createElement(Lucide.MinusIcon);
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        plugin.enabled
          ? 'border-l-4 border-l-green-500'
          : 'border-l-4 border-l-red-500 opacity-75'
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {renderPluginIcon(plugin)}
              <Lucide.Package className="h-6 w-6 text-muted-foreground hidden" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <Badge variant="secondary">v{plugin.version}</Badge>
            </div>
          </div>
          <Badge variant={plugin.enabled ? 'default' : 'secondary'}>
            {plugin.enabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
        {plugin.description && (
          <CardDescription>{plugin.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Module:</span> {plugin.moduleName}
          </div>
          <div>
            <span className="font-medium">URL:</span>{' '}
            <span className="text-muted-foreground break-all">
              {plugin.url}
            </span>
          </div>
        </div>

        {plugin.routes && plugin.routes.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="font-medium text-sm mb-2">Routes:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {plugin.routes.map((route, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{route.path}</span>
                    <span>{route.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant={plugin.enabled ? 'outline' : 'default'}
          size="sm"
          onClick={() => onToggle(plugin.id, !plugin.enabled)}
          className="flex-1"
        >
          {plugin.enabled ? (
            <Lucide.PowerOff className="mr-2 h-4 w-4" />
          ) : (
            <Lucide.Power className="mr-2 h-4 w-4" />
          )}
          {plugin.enabled ? 'Disable' : 'Enable'}
        </Button>

        <Button variant="outline" size="sm" onClick={() => onEdit(plugin)}>
          <Lucide.EditIcon className="h-4 w-4" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Lucide.Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unregister Plugin</DialogTitle>
              <DialogDescription>
                Are you sure you want to unregister "{plugin.name}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive" onClick={() => onDelete(plugin.id)}>
                Unregister
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PluginCard;
