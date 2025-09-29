import React from 'react';
import { Users, Activity, TrendingUp, Award, ChartBar as BarChart3, FileText, Shield, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const engagementData = [
  { month: 'Jan', students: 120, achievements: 450, verifications: 380 },
  { month: 'Feb', students: 135, achievements: 520, verifications: 445 },
  { month: 'Mar', students: 148, achievements: 580, verifications: 510 },
  { month: 'Apr', students: 162, achievements: 640, verifications: 575 },
  { month: 'May', students: 178, achievements: 720, verifications: 650 },
  { month: 'Jun', students: 195, achievements: 810, verifications: 735 },
];

const departmentData = [
  { name: 'Computer Science', value: 35, color: '#3B82F6' },
  { name: 'Mechanical', value: 25, color: '#059669' },
  { name: 'Electrical', value: 20, color: '#7C3AED' },
  { name: 'Civil', value: 20, color: '#F59E0B' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="opacity-90">System overview and analytics for the Academic Achievement Management System</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">195 Active Students</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">24 Faculty Members</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">195</p>
              <p className="text-gray-600">Total Students</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+12% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">2,450</p>
              <p className="text-gray-600">Total Achievements</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+18% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-gray-600">Verification Rate</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+5% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-gray-600">Avg Rating</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">Excellent</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Engagement Trends</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Area type="monotone" dataKey="students" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="achievements" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                <Area type="monotone" dataKey="verifications" stackId="3" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {departmentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Health</h2>
          <div className="space-y-4">
            {[
              { metric: 'Database Performance', status: 'Excellent', value: '98%', color: 'green' },
              { metric: 'API Response Time', status: 'Good', value: '245ms', color: 'green' },
              { metric: 'Storage Usage', status: 'Normal', value: '67%', color: 'yellow' },
              { metric: 'Active Sessions', status: 'High', value: '156', color: 'blue' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-gray-900">{item.metric}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">{item.value}</span>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileText, label: 'Generate Report', color: 'blue' },
              { icon: Users, label: 'User Management', color: 'green' },
              { icon: Shield, label: 'Security Audit', color: 'purple' },
              { icon: Database, label: 'Backup Data', color: 'orange' }
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <action.icon className={`h-8 w-8 mb-2 ${
                  action.color === 'blue' ? 'text-blue-600' :
                  action.color === 'green' ? 'text-green-600' :
                  action.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`} />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}