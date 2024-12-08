import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { TaskList } from '../components/TaskList';
import { format } from 'date-fns';

export function Tasks() {
  const projects = useProjectStore((state) => state.projects);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  const allTasks = projects.flatMap((project) =>
    project.tasks.map((task) => ({
      ...task,
      projectTitle: project.title,
      projectId: project.id,
    }))
  );

  const filteredTasks = allTasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const tasksByDate = filteredTasks.reduce((acc, task) => {
    const date = format(new Date(task.dueDate), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof filteredTasks>);

  const sortedDates = Object.keys(tasksByDate).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {format(new Date(date), 'MMMM d, yyyy')}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {tasksByDate[date].map((task) => (
                <div key={task.id} className="mb-4 last:mb-0">
                  <div className="text-sm text-gray-500 mb-1">
                    Project: {task.projectTitle}
                  </div>
                  <TaskList
                    tasks={[task]}
                    onTaskUpdate={(taskId, updates) =>
                      useProjectStore.getState().updateTask(task.projectId, taskId, updates)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {sortedDates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}