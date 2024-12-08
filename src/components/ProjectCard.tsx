import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Project } from '../types';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(
            project.priority
          )}`}
        >
          {project.priority}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {format(new Date(project.startDate), 'MMM d, yyyy')} -{' '}
            {format(new Date(project.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{project.assignedTo.length} members</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {project.tasks.filter((task) => task.status === 'completed').length} /{' '}
            {project.tasks.length} tasks completed
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(project.tasks.filter((task) => task.status === 'completed')
                .length /
                project.tasks.length) *
                100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}