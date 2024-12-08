import React from 'react';
import { Settings as SettingsIcon, Bell, Mail, Globe, Clock } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

export function Settings() {
  const { settings, updateSettings } = useSettingsStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    updateSettings({ [name]: newValue });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
              </div>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Notifications
                </label>
              </div>
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Regional</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <label htmlFor="language" className="text-sm font-medium text-gray-700">
                  Language
                </label>
              </div>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <label htmlFor="timeFormat" className="text-sm font-medium text-gray-700">
                  Time Format
                </label>
              </div>
              <select
                id="timeFormat"
                name="timeFormat"
                value={settings.timeFormat}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="12h">12-hour</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}