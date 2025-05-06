
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

const PomodoroTimer: React.FC = () => {
  // Load saved settings from localStorage or use defaults
  const getSavedSettings = () => {
    const savedWorkTime = localStorage.getItem('workTime');
    const savedBreakTime = localStorage.getItem('breakTime');
    return {
      workTime: savedWorkTime ? parseInt(savedWorkTime) : 25,
      breakTime: savedBreakTime ? parseInt(savedBreakTime) : 5
    };
  };

  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useState(getSavedSettings());
  const [timeLeft, setTimeLeft] = useState(settings.workTime * 60);
  
  const workTimeInSeconds = settings.workTime * 60;
  const breakTimeInSeconds = settings.breakTime * 60;
  
  const percentage = mode === 'work' 
    ? ((workTimeInSeconds - timeLeft) / workTimeInSeconds) * 100
    : ((breakTimeInSeconds - timeLeft) / breakTimeInSeconds) * 100;

  useEffect(() => {
    // Reset timer when settings change
    if (mode === 'work') {
      setTimeLeft(settings.workTime * 60);
    } else {
      setTimeLeft(settings.breakTime * 60);
    }
    // Save settings to localStorage
    localStorage.setItem('workTime', settings.workTime.toString());
    localStorage.setItem('breakTime', settings.breakTime.toString());
  }, [settings, mode]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(settings.breakTime * 60);
        toast('Work session complete! Time for a break.');
      } else {
        setMode('work');
        setTimeLeft(settings.workTime * 60);
        toast('Break finished! Back to work.');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, settings]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(settings.workTime * 60);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSettings = (key: 'workTime' | 'breakTime', value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {mode === 'work' ? 'Work Session' : 'Break Time'}
            </CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Timer Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="work-time">Work Time: {settings.workTime} min</Label>
                    </div>
                    <Slider 
                      id="work-time"
                      min={1} 
                      max={60} 
                      step={1} 
                      value={[settings.workTime]}
                      onValueChange={(value) => updateSettings('workTime', value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="break-time">Break Time: {settings.breakTime} min</Label>
                    </div>
                    <Slider 
                      id="break-time"
                      min={1} 
                      max={30} 
                      step={1} 
                      value={[settings.breakTime]}
                      onValueChange={(value) => updateSettings('breakTime', value[0])}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-8">
            <div className="text-6xl font-mono font-semibold">
              {formatTime(timeLeft)}
            </div>

            <Progress value={percentage} className="w-full h-2" />
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTimer}
                className="h-12 w-12 rounded-full"
              >
                {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={resetTimer}
                className="h-12 w-12 rounded-full"
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="text-sm text-muted-foreground text-center w-full">
            {mode === 'work' 
              ? `Focus on your task for ${settings.workTime} minutes`
              : `Take a short ${settings.breakTime} minute break`}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
