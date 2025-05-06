
import React, { useState } from 'react';
import { CircleDashed, ArrowRightCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inprogress' | 'done';
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: 'todo' | 'inprogress' | 'done') => void;
  onDelete: (id: string) => void;
  colorTheme: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete, colorTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  let statusIcon;
  if (task.status === 'todo') {
    statusIcon = <CircleDashed className="h-4 w-4 text-muted-foreground" />;
  } else if (task.status === 'inprogress') {
    statusIcon = <ArrowRightCircle className="h-4 w-4 text-blue-500" />;
  } else {
    statusIcon = <CheckCircle2 className="h-4 w-4 text-green-500" />;
  }
  
  return (
    <div 
      className="p-3 bg-card border rounded-md shadow-sm relative transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
    >
      <div className="flex items-start gap-2">
        {statusIcon}
        <div className="text-sm font-medium">{task.title}</div>
      </div>
      
      <div className={`mt-3 grid grid-cols-3 gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => onStatusChange(task.id, 'todo')}
          disabled={task.status === 'todo'}
        >
          To Do
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => onStatusChange(task.id, 'inprogress')}
          disabled={task.status === 'inprogress'}
        >
          In Progress
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => onStatusChange(task.id, 'done')}
          disabled={task.status === 'done'}
        >
          Done
        </Button>
      </div>
      
      {isHovered && (
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive hover:text-destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default TaskCard;
