
import React, { useState } from 'react';
import { Kanban, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';

// Define the types for our project management data
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

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      { 
        id: '1', 
        name: 'My First Project', 
        tasks: [
          { id: '101', title: 'Plan project', status: 'done' },
          { id: '102', title: 'Design UI', status: 'inprogress' },
          { id: '103', title: 'Implement features', status: 'todo' },
        ] 
      }
    ];
  });
  
  const [activeProject, setActiveProject] = useState<string>(projects[0]?.id || '');
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // Save projects to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName,
        tasks: []
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setActiveProject(newProject.id);
    }
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    if (activeProject === projectId && updatedProjects.length > 0) {
      setActiveProject(updatedProjects[0].id);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: 'todo'
      };
      
      setProjects(projects.map(project => 
        project.id === activeProject
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      ));
      setNewTaskTitle('');
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    setProjects(projects.map(project => 
      project.id === activeProject
        ? {
            ...project,
            tasks: project.tasks.map(task => 
              task.id === taskId
                ? { ...task, status: newStatus }
                : task
            )
          }
        : project
    ));
  };

  const deleteTask = (taskId: string) => {
    setProjects(projects.map(project => 
      project.id === activeProject
        ? {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId)
          }
        : project
    ));
  };

  const currentProject = projects.find(p => p.id === activeProject);
  const { colorTheme } = useTheme();

  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project List Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  value={newProjectName} 
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="New project name" 
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && addProject()}
                />
                <Button onClick={addProject} size="sm"><Plus className="h-4 w-4" /></Button>
              </div>
              
              <div className="space-y-1 max-h-[300px] overflow-y-auto">
                {projects.map(project => (
                  <div 
                    key={project.id}
                    className={`
                      flex justify-between items-center p-2 rounded-md cursor-pointer
                      ${activeProject === project.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
                    `}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <span className="truncate">{project.name}</span>
                    {projects.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-6 w-6 p-0 ${activeProject === project.id ? 'hover:bg-primary/80' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="flex-1">
          {currentProject && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Kanban className="h-5 w-5" />
                  <span>{currentProject.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input 
                    value={newTaskTitle} 
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a task" 
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask}>Add Task</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* To Do Column */}
                  <div className="space-y-2">
                    <div className="font-medium text-sm text-muted-foreground pb-1 border-b">To Do</div>
                    <div className="space-y-2 min-h-[100px]">
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
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="space-y-2">
                    <div className="font-medium text-sm text-muted-foreground pb-1 border-b">In Progress</div>
                    <div className="space-y-2 min-h-[100px]">
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
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="space-y-2">
                    <div className="font-medium text-sm text-muted-foreground pb-1 border-b">Done</div>
                    <div className="space-y-2 min-h-[100px]">
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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ 
  task, 
  onStatusChange, 
  onDelete,
  colorTheme 
}: { 
  task: Task; 
  onStatusChange: (id: string, status: 'todo' | 'inprogress' | 'done') => void;
  onDelete: (id: string) => void;
  colorTheme: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="p-2 bg-card border rounded-md shadow-sm relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
    >
      <div className="text-sm mb-2">{task.title}</div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div className="flex gap-1">
          <button 
            className={`px-1 rounded ${task.status === 'todo' ? 'bg-muted text-muted-foreground' : ''}`} 
            onClick={() => onStatusChange(task.id, 'todo')}
          >
            Todo
          </button>
          <button 
            className={`px-1 rounded ${task.status === 'inprogress' ? 'bg-muted text-muted-foreground' : ''}`} 
            onClick={() => onStatusChange(task.id, 'inprogress')}
          >
            In Progress
          </button>
          <button 
            className={`px-1 rounded ${task.status === 'done' ? 'bg-muted text-muted-foreground' : ''}`} 
            onClick={() => onStatusChange(task.id, 'done')}
          >
            Done
          </button>
        </div>
        
        {isHovered && (
          <button 
            className="text-destructive hover:text-destructive/80"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
