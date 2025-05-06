
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings: React.FC = () => {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  const colorThemes = [
    { id: 'purple', label: 'Purple', color: '#9b87f5' },
    { id: 'blue', label: 'Blue', color: '#33C3F0' },
    { id: 'pink', label: 'Pink', color: '#F06292' },
    { id: 'green', label: 'Green', color: '#66BB6A' },
  ];

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
            <Label>Accent Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {colorThemes.map((t) => (
                <div 
                  key={t.id}
                  className={`
                    h-10 rounded-md cursor-pointer flex items-center justify-center transition-all
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
              Theme preferences are automatically saved to your browser.
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
