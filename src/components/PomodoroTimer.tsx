
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const workTime = 25 * 60;
  const breakTime = 5 * 60;
  
  const percentage = mode === 'work' 
    ? ((workTime - timeLeft) / workTime) * 100
    : ((breakTime - timeLeft) / breakTime) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(breakTime);
        toast('Work session complete! Time for a break.');
      } else {
        setMode('work');
        setTimeLeft(workTime);
        toast('Break finished! Back to work.');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(workTime);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold text-center">
            {mode === 'work' ? 'Work Session' : 'Break Time'}
          </CardTitle>
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
            
            <div className="text-sm text-muted-foreground text-center">
              {mode === 'work' 
                ? 'Focus on your task for 25 minutes'
                : 'Take a short 5 minute break'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
