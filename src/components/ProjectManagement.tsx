
import React, { useState, useEffect } from 'react';
import { Kanban, Plus, Trash2, CheckCircle2, ArrowRightCircle, CircleDashed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from '@/contexts/ThemeContext';
import ProjectList from '@/components/project/ProjectList';
import KanbanBoard from '@/components/project/KanbanBoard';
import ListView from '@/components/project/ListView';

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
  useEffect(() => {
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

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Project List Sidebar */}
        <ProjectList 
          projects={projects} 
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          addProject={addProject}
          deleteProject={deleteProject}
          isLoading={isLoading}
        />

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
                    <KanbanBoard 
                      currentProject={currentProject}
                      taskCounts={taskCounts}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                      colorTheme={colorTheme}
                    />
                  </TabsContent>
                  
                  <TabsContent value="list" className="mt-0">
                    <ListView 
                      currentProject={currentProject}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                    />
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

export default ProjectManagement;
