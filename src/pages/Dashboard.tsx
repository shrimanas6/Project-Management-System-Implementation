import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectForm } from '../components/ProjectForm';
import { Modal } from '../components/Modal';
import type { Project } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, addProject } = useProjectStore();

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'tasks'>) => {
    addProject(projectData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/project/${project.id}`)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}