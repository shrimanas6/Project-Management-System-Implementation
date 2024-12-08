import React from 'react';
import { User, Briefcase, Mail } from 'lucide-react';
import type { TeamMemberProfile } from '../types/settings';

interface TeamMemberCardProps {
  member: TeamMemberProfile;
  stats: {
    projectCount: number;
    taskCount: number;
    completedTaskCount: number;
    completionRate: number;
  };
}

export function TeamMemberCard({ member, stats }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-blue-600" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Briefcase className="w-4 h-4 mr-1" />
            {member.role}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="w-4 h-4 mr-1" />
            {member.email}
          </div>
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

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}