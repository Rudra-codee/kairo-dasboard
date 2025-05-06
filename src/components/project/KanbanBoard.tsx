
import React from 'react';
import { CircleDashed, ArrowRightCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inprogress' | 'done';
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  currentProject: Project;
  taskCounts: {
    todo: number;
    inprogress: number;
    done: number;
  };
  updateTaskStatus: (id: string, status: 'todo' | 'inprogress' | 'done') => void;
  deleteTask: (id: string) => void;
  colorTheme: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  currentProject,
  taskCounts,
  updateTaskStatus,
  deleteTask,
  colorTheme,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* To Do Column */}
      <div className="space-y-3">
        <div className="font-medium text-sm flex items-center gap-2 pb-1 border-b">
          <CircleDashed className="h-4 w-4" />
          <span>To Do</span>
          <Badge variant="secondary" className="ml-auto">{taskCounts.todo}</Badge>
        </div>
        <div className="space-y-3 min-h-[150px]">
          {currentProject.tasks
            .filter(task => task.status === 'todo')
            .map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={updateTaskStatus}
                onDelete={deleteTask}
                colorTheme={colorTheme}
              />
            ))}
          {currentProject.tasks.filter(t => t.status === 'todo').length === 0 && (
            <div className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-md">
              No tasks yet
            </div>
          )}
        </div>
      </div>

      {/* In Progress Column */}
      <div className="space-y-3">
        <div className="font-medium text-sm flex items-center gap-2 pb-1 border-b">
          <ArrowRightCircle className="h-4 w-4 text-blue-500" />
          <span>In Progress</span>
          <Badge variant="outline" className="ml-auto bg-blue-500/10 text-blue-500 border-blue-500/20">
            {taskCounts.inprogress}
          </Badge>
        </div>
        <div className="space-y-3 min-h-[150px]">
          {currentProject.tasks
            .filter(task => task.status === 'inprogress')
            .map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={updateTaskStatus}
                onDelete={deleteTask}
                colorTheme={colorTheme}
              />
            ))}
          {currentProject.tasks.filter(t => t.status === 'inprogress').length === 0 && (
            <div className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-md">
              No tasks in progress
            </div>
          )}
        </div>
      </div>

      {/* Done Column */}
      <div className="space-y-3">
        <div className="font-medium text-sm flex items-center gap-2 pb-1 border-b">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Done</span>
          <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-500 border-green-500/20">
            {taskCounts.done}
          </Badge>
        </div>
        <div className="space-y-3 min-h-[150px]">
          {currentProject.tasks
            .filter(task => task.status === 'done')
            .map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={updateTaskStatus}
                onDelete={deleteTask}
                colorTheme={colorTheme}
              />
            ))}
          {currentProject.tasks.filter(t => t.status === 'done').length === 0 && (
            <div className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-md">
              No completed tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
