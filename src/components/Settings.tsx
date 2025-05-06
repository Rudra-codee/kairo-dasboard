
import React, { useEffect } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Settings: React.FC = () => {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  const colorThemes = [
    { id: 'purple', label: 'Purple', color: '#9b87f5' },
    { id: 'blue', label: 'Blue', color: '#33C3F0' },
    { id: 'pink', label: 'Pink', color: '#F06292' },
    { id: 'green', label: 'Green', color: '#66BB6A' },
    { id: 'orange', label: 'Orange', color: '#F97316' },
    { id: 'red', label: 'Red', color: '#ea384c' },
  ];

  // Update CSS variables when color theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply the color theme to the CSS variables
    switch (colorTheme) {
      case 'purple':
        root.style.setProperty('--primary', '255 70% 75%');
        root.style.setProperty('--sidebar-primary', '255 70% 75%');
        root.style.setProperty('--ring', '255 70% 75%');
        break;
      case 'blue':
        root.style.setProperty('--primary', '199 89% 52%');
        root.style.setProperty('--sidebar-primary', '199 89% 52%');
        root.style.setProperty('--ring', '199 89% 52%');
        break;
      case 'pink':
        root.style.setProperty('--primary', '336 80% 58%');
        root.style.setProperty('--sidebar-primary', '336 80% 58%');
        root.style.setProperty('--ring', '336 80% 58%');
        break;
      case 'green':
        root.style.setProperty('--primary', '122 40% 56%');
        root.style.setProperty('--sidebar-primary', '122 40% 56%');
        root.style.setProperty('--ring', '122 40% 56%');
        break;
      case 'orange':
        root.style.setProperty('--primary', '24 95% 53%');
        root.style.setProperty('--sidebar-primary', '24 95% 53%');
        root.style.setProperty('--ring', '24 95% 53%');
        break;
      case 'red':
        root.style.setProperty('--primary', '354 83% 57%');
        root.style.setProperty('--sidebar-primary', '354 83% 57%');
        root.style.setProperty('--ring', '354 83% 57%');
        break;
    }
  }, [colorTheme]);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Mode Toggle */}
          <div className="space-y-3">
            <Label>Appearance</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                className="w-24"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                className="w-24"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>

          {/* Color Theme Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <Label>Accent Color</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colorThemes.map((t) => (
                <div 
                  key={t.id}
                  className={`
                    h-12 rounded-md cursor-pointer flex items-center justify-center transition-all
                    ${colorTheme === t.id ? 'ring-2 ring-offset-2 ring-ring' : ''}
                  `}
                  style={{ backgroundColor: t.color }}
                  onClick={() => setColorTheme(t.id as any)}
                >
                  {colorTheme === t.id && <Check className="h-4 w-4 text-white" />}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Theme preferences and timer settings are automatically saved to your browser.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// This is needed for the Check icon in the color themes
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Settings;
