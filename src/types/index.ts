export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
  assignedTo: string[];
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  assignedTo: string;
  dueDate: string;
}