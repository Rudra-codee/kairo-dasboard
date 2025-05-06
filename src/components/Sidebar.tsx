
import React, { useState } from 'react';
import { Timer, ListTodo, Note, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, collapsed, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-3 rounded-md transition-all duration-200 gap-3",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {!collapsed && (
        <span className="whitespace-nowrap overflow-hidden transition-all duration-200">
          {label}
        </span>
      )}
    </button>
  );
};

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'pomodoro', label: 'Pomodoro', icon: <Timer size={20} /> },
    { id: 'notes', label: 'Notes', icon: <Note size={20} /> },
    { id: 'todos', label: 'To-Do List', icon: <ListTodo size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar flex flex-col h-full border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="font-semibold text-sidebar-foreground">Dashboard</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1 ml-auto hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            collapsed={collapsed}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            TaskFlow v1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
