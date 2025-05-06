
import React from 'react';
import { CircleDashed, ArrowRightCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

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

interface ListViewProps {
  currentProject: Project;
  updateTaskStatus: (id: string, status: 'todo' | 'inprogress' | 'done') => void;
  deleteTask: (id: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ 
  currentProject, 
  updateTaskStatus, 
  deleteTask 
}) => {
  
  const getStatusIcon = (status: 'todo' | 'inprogress' | 'done') => {
    switch (status) {
      case 'todo': return <CircleDashed className="h-4 w-4 text-muted-foreground" />;
      case 'inprogress': return <ArrowRightCircle className="h-4 w-4 text-blue-500" />;
      case 'done': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 py-2 px-4 bg-muted/50 font-medium text-sm">
        <div className="col-span-6">Task</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3">Actions</div>
      </div>
      {currentProject.tasks.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No tasks yet. Add some tasks to get started.
        </div>
      ) : (
        currentProject.tasks.map(task => (
          <div key={task.id} className="grid grid-cols-12 py-3 px-4 border-t items-center">
            <div className="col-span-6 flex items-center gap-2">
              {getStatusIcon(task.status)}
              <span>{task.title}</span>
            </div>
            <div className="col-span-3">
              <StatusBadge status={task.status} />
            </div>
            <div className="col-span-3 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7"
                onClick={() => updateTaskStatus(task.id, 
                  task.status === 'todo' ? 'inprogress' : 
                  task.status === 'inprogress' ? 'done' : 'todo'
                )}
              >
                {task.status === 'todo' ? 'Start' : 
                 task.status === 'inprogress' ? 'Complete' : 'Restart'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 text-destructive hover:text-destructive"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListView;
