import React from 'react';
import { Check, Clock, User } from 'lucide-react';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                onTaskUpdate(task.id, {
                  status: task.status === 'completed' ? 'pending' : 'completed',
                })
              }
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.status === 'completed'
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}
            >
              {task.status === 'completed' && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>
            
            <div>
              <h4
                className={`text-lg font-medium ${
                  task.status === 'completed'
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900'
                }`}
              >
                {task.title}
              </h4>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{task.assignedTo}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}