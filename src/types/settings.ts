export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailNotifications: boolean;
  language: string;
  timeFormat: '12h' | '24h';
}

export interface TeamMemberProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  department: string;
  skills: string[];
}