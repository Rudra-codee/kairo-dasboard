
import React, { useState } from 'react';
import { Kanban, Plus, Trash2, CheckCircle2, ArrowRightCircle, CircleDashed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [isLoading, setIsLoading] = useState(false);
  
  // Save projects to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newProjectName.trim()) {
      setIsLoading(true);
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName,
        tasks: []
      };
      
      // Simulate network delay for better UX feedback
      setTimeout(() => {
        setProjects([...projects, newProject]);
        setNewProjectName('');
        setActiveProject(newProject.id);
        setIsLoading(false);
      }, 300);
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
      setIsLoading(true);
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: 'todo'
      };
      
      // Simulate network delay
      setTimeout(() => {
        setProjects(projects.map(project => 
          project.id === activeProject
            ? { ...project, tasks: [...project.tasks, newTask] }
            : project
        ));
        setNewTaskTitle('');
        setIsLoading(false);
      }, 200);
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

  // Get counts for task status badges
  const getTaskCounts = () => {
    if (!currentProject) return { todo: 0, inprogress: 0, done: 0 };
    
    return {
      todo: currentProject.tasks.filter(t => t.status === 'todo').length,
      inprogress: currentProject.tasks.filter(t => t.status === 'inprogress').length,
      done: currentProject.tasks.filter(t => t.status === 'done').length
    };
  };
  
  const taskCounts = getTaskCounts();

  const getStatusIcon = (status: 'todo' | 'inprogress' | 'done') => {
    switch (status) {
      case 'todo': return <CircleDashed className="h-4 w-4 text-muted-foreground" />;
      case 'inprogress': return <ArrowRightCircle className="h-4 w-4 text-blue-500" />;
      case 'done': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Project List Sidebar */}
        <Card className="md:col-span-3 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Kanban className="h-5 w-5" />
              <span>Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                value={newProjectName} 
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="New project name" 
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && addProject()}
                disabled={isLoading}
              />
              <Button onClick={addProject} size="sm" disabled={isLoading}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1 max-h-[350px] overflow-y-auto pr-2">
              {projects.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No projects yet. Create one to get started.
                </div>
              ) : (
                projects.map(project => (
                  <div 
                    key={project.id}
                    className={`
                      flex justify-between items-center p-3 rounded-md cursor-pointer transition-all
                      ${activeProject === project.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}
                    `}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Badge variant="outline" className={`${activeProject === project.id ? 'border-primary-foreground/20' : ''}`}>
                        {project.tasks.length}
                      </Badge>
                      <span className="truncate">{project.name}</span>
                    </div>
                    {projects.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-7 w-7 p-0 opacity-60 hover:opacity-100 ${activeProject === project.id ? 'hover:bg-primary/80' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="p-3 rounded-md border border-border animate-pulse">
                  <Skeleton className="h-5 w-full" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <div className="md:col-span-9">
          {currentProject ? (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Kanban className="h-5 w-5" />
                    <span>{currentProject.name}</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{taskCounts.todo} To Do</Badge>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      {taskCounts.inprogress} In Progress
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {taskCounts.done} Done
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-6">
                  <Input 
                    value={newTaskTitle} 
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a task" 
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    disabled={isLoading}
                  />
                  <Button onClick={addTask} disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Task"}
                  </Button>
                </div>

                <Tabs defaultValue="kanban" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="kanban" className="mt-0">
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
                  </TabsContent>
                  
                  <TabsContent value="list" className="mt-0">
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="min-h-[200px] flex items-center justify-center">
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">No projects available</p>
                <p className="text-sm text-muted-foreground">Create a new project to get started</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: 'todo' | 'inprogress' | 'done' }) => {
  switch (status) {
    case 'todo':
      return <Badge variant="outline" className="bg-muted text-muted-foreground font-normal">To Do</Badge>;
    case 'inprogress':
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-normal">In Progress</Badge>;
    case 'done':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-normal">Done</Badge>;
    default:
      return null;
  }
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

export default ProjectManagement;
