
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import PomodoroTimer from '@/components/PomodoroTimer';
import Notes from '@/components/Notes';
import TodoList from '@/components/TodoList';
import Settings from '@/components/Settings';
import ProjectManagement from '@/components/ProjectManagement';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Get current time of day for greeting
  const hours = new Date().getHours();
  let greeting = "Good morning";
  if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else if (hours >= 18) {
    greeting = "Good evening";
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 md:p-10">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight">{greeting}</h1>
              <p className="text-muted-foreground">{currentDate}</p>
            </div>

            {activeTab === 'pomodoro' && <PomodoroTimer />}
            {activeTab === 'projects' && <ProjectManagement />}
            {activeTab === 'notes' && <Notes />}
            {activeTab === 'todos' && <TodoList />}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
