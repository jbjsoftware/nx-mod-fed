import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Badge,
} from '@repo/ui';
import { useTheme, primaryColors } from '@repo/ui';
import {
  Monitor,
  Moon,
  Sun,
  Palette,
  CornerUpLeft,
  RotateCcw,
} from 'lucide-react';

const SettingsPage = () => {
  const {
    theme,
    radius,
    primaryColor,
    setTheme,
    setRadius,
    setPrimaryColor,
    resetToDefaults,
  } = useTheme();

  const radiusOptions = [
    { value: '0rem', label: 'None', description: '0px' },
    { value: '0.25rem', label: 'Small', description: '4px' },
    { value: '0.5rem', label: 'Medium', description: '8px' },
    { value: '0.625rem', label: 'Default', description: '10px' },
    { value: '0.75rem', label: 'Large', description: '12px' },
    { value: '1rem', label: 'Extra Large', description: '16px' },
  ];

  const colorOptions = Object.keys(primaryColors);

  const getThemeIcon = (themeValue: string) => {
    switch (themeValue) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getColorPreview = (color: string) => {
    const colorConfig = primaryColors[color as keyof typeof primaryColors];
    return (
      <div className="flex items-center space-x-2">
        <div
          className="w-4 h-4 rounded-full border-2 border-border"
          style={{
            backgroundColor: `hsl(${colorConfig.light.replace(
              'oklch',
              'hsl'
            )})`,
          }}
        />
        <div
          className="w-4 h-4 rounded-full border-2 border-border"
          style={{
            backgroundColor: `hsl(${colorConfig.dark.replace('oklch', 'hsl')})`,
          }}
        />
        <span className="capitalize">{color}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your application appearance and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Theme Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <span>Theme Mode</span>
            </CardTitle>
            <CardDescription>
              Select your preferred theme mode. System will automatically switch
              based on your device settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={(value: string) =>
                setTheme(value as 'light' | 'dark' | 'system')
              }
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: 'light', label: 'Light', description: 'Light theme' },
                { value: 'dark', label: 'Dark', description: 'Dark theme' },
                {
                  value: 'system',
                  label: 'System',
                  description: 'Follow system setting',
                },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex items-center space-x-2 cursor-pointer font-normal"
                  >
                    {getThemeIcon(option.value)}
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Primary Color */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Primary Color</span>
            </CardTitle>
            <CardDescription>
              Choose the primary color for buttons, links, and other accent
              elements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="color-select">Color scheme</Label>
              <Select value={primaryColor} onValueChange={setPrimaryColor}>
                <SelectTrigger id="color-select" className="w-full">
                  <SelectValue placeholder="Select a color">
                    {primaryColor && getColorPreview(primaryColor)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      {getColorPreview(color)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {colorOptions.map((color) => {
                  const colorConfig =
                    primaryColors[color as keyof typeof primaryColors];
                  const isSelected = primaryColor === color;
                  return (
                    <Button
                      key={color}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPrimaryColor(color)}
                      className="flex items-center space-x-2 h-12"
                    >
                      <div className="flex space-x-1">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{
                            backgroundColor: `hsl(${colorConfig.light.replace(
                              'oklch',
                              'hsl'
                            )})`,
                          }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{
                            backgroundColor: `hsl(${colorConfig.dark.replace(
                              'oklch',
                              'hsl'
                            )})`,
                          }}
                        />
                      </div>
                      <span className="capitalize text-xs">{color}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corner Radius */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CornerUpLeft className="h-5 w-5" />
              <span>Corner Radius</span>
            </CardTitle>
            <CardDescription>
              Adjust the corner radius for cards, buttons, and other elements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="radius-select">Border radius</Label>
              <Select value={radius} onValueChange={setRadius}>
                <SelectTrigger id="radius-select" className="w-full">
                  <SelectValue placeholder="Select radius">
                    {radiusOptions.find((r) => r.value === radius)?.label} (
                    {radiusOptions.find((r) => r.value === radius)?.description}
                    )
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {radiusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        <Badge variant="outline" className="ml-2">
                          {option.description}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {radiusOptions.map((option) => {
                  const isSelected = radius === option.value;
                  return (
                    <Button
                      key={option.value}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRadius(option.value)}
                      className="flex flex-col items-center space-y-1 h-16"
                    >
                      <div
                        className="w-6 h-6 bg-primary"
                        style={{ borderRadius: option.value }}
                      />
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Settings Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Current Settings</CardTitle>
            <CardDescription>
              Review your current theme configuration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Theme Mode</Label>
                <div className="flex items-center space-x-2">
                  {getThemeIcon(theme)}
                  <span className="capitalize">{theme}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Primary Color</Label>
                {getColorPreview(primaryColor)}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Corner Radius</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 bg-primary border"
                    style={{ borderRadius: radius }}
                  />
                  <span>
                    {radiusOptions.find((r) => r.value === radius)?.description}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5" />
              <span>Reset Settings</span>
            </CardTitle>
            <CardDescription>
              Reset all theme settings to their default values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={resetToDefaults}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
