import { create } from 'zustand';
import { Project, Task } from '../types';
import { generateId } from '../lib/utils';

interface ProjectStore {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'tasks'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id'>) => void;
  updateTask: (projectId: string, taskId: string, task: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: generateId(), tasks: [] }],
    })),
  updateProject: (id, project) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...project } : p
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
  addTask: (projectId, task) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: [...p.tasks, { ...task, id: generateId() }] }
          : p
      ),
    })),
  updateTask: (projectId, taskId, task) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, ...task } : t
              ),
            }
          : p
      ),
    })),
  deleteTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p
      ),
    })),
}));