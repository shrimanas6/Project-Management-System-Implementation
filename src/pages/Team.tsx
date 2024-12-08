import React from 'react';
import { useProjectStore } from '../store/projectStore';
import { User, Calendar } from 'lucide-react';

export function Team() {
  const projects = useProjectStore((state) => state.projects);
  
  const teamMembers = Array.from(
    new Set(
      projects.flatMap((project) => [
        ...project.assignedTo,
        ...project.tasks.map((task) => task.assignedTo),
      ])
    )
  ).sort();

  const getMemberStats = (member: string) => {
    const memberProjects = projects.filter((project) =>
      project.assignedTo.includes(member)
    );
    
    const memberTasks = projects.flatMap((project) =>
      project.tasks.filter((task) => task.assignedTo === member)
    );
    
    const completedTasks = memberTasks.filter(
      (task) => task.status === 'completed'
    ).length;

    return {
      projectCount: memberProjects.length,
      taskCount: memberTasks.length,
      completedTaskCount: completedTasks,
      completionRate:
        memberTasks.length > 0
          ? Math.round((completedTasks / memberTasks.length) * 100)
          : 0,
    };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Team Members</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const stats = getMemberStats(member);
          return (
            <div
              key={member}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {stats.projectCount} Projects
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Tasks Progress</span>
                    <span>
                      {stats.completedTaskCount}/{stats.taskCount} Tasks
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Completion Rate</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {stats.completionRate}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Active Projects</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {stats.projectCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No team members found</p>
          <p className="text-sm text-gray-400 mt-1">
            Create a project and assign team members to get started
          </p>
        </div>
      )}
    </div>
  );
}