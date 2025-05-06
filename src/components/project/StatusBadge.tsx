
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'todo' | 'inprogress' | 'done';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

export default StatusBadge;
