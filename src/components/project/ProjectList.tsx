
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface Project {
  id: string;
  name: string;
  tasks: Array<{id: string; title: string; status: string}>;
}

interface ProjectListProps {
  projects: Project[];
  activeProject: string;
  setActiveProject: (id: string) => void;
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  activeProject,
  setActiveProject,
  newProjectName,
  setNewProjectName,
  addProject,
  deleteProject,
  isLoading
}) => {
  return (
    <Card className="md:col-span-3 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Projects</CardTitle>
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
  );
};

export default ProjectList;
