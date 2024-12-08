import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Plus, ArrowLeft } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { Modal } from '../components/Modal';
import { format } from 'date-fns';
import type { Task } from '../types';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === id)
  );
  const { updateTask, addTask } = useProjectStore();

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Project not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'status'>) => {
    if (id) {
      addTask(id, { ...taskData, status: 'pending' });
      setIsTaskModalOpen(false);
    }
  };

  const completedTasks = project.tasks.filter((task) => task.status === 'completed').length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-gray-600 mt-2">{project.description}</p>
          </div>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center text-gray-500 mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">Timeline</span>
            </div>
            <p className="text-sm text-gray-600">
              {format(new Date(project.startDate), 'MMM d, yyyy')} -{' '}
              {format(new Date(project.endDate), 'MMM d, yyyy')}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center text-gray-500 mb-2">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">Team Members</span>
            </div>
            <p className="text-sm text-gray-600">
              {project.assignedTo.join(', ')}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center text-gray-500 mb-2">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Progress</span>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {completedTasks}/{totalTasks} tasks
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tasks</h2>
        {project.tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks created yet.</p>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Create your first task
            </button>
          </div>
        ) : (
          <TaskList
            tasks={project.tasks}
            onTaskUpdate={(taskId, updates) => updateTask(project.id, taskId, updates)}
          />
        )}
      </div>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      </Modal>
    </div>
  );
}