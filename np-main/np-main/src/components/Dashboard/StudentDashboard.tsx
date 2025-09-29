import React from 'react';
import { Trophy, FileCheck, Clock, Star, TrendingUp, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const progressData = [
  { month: 'Jan', points: 20 },
  { month: 'Feb', points: 35 },
  { month: 'Mar', points: 45 },
  { month: 'Apr', points: 60 },
  { month: 'May', points: 85 },
  { month: 'Jun', points: 120 },
];

const achievementData = [
  { name: 'Academic', value: 45, color: '#3B82F6' },
  { name: 'Co-curricular', value: 30, color: '#059669' },
  { name: 'Extra-curricular', value: 25, color: '#7C3AED' },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="opacity-90">You're doing great! Keep tracking your achievements and building your portfolio.</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">Level 5</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">1,250 Points</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-gray-600">Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">1,250</p>
              <p className="text-gray-600">Total Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">Level 5</p>
              <p className="text-gray-600">Current Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Progress Over Time</h2>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="points" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Achievement Distribution</h2>
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={achievementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {achievementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {achievementData.map((item) => (
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

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Hackathon Winner - TechFest 2024',
              status: 'verified',
              date: '2 days ago',
              points: 50
            },
            {
              title: 'Research Paper Published',
              status: 'pending',
              date: '1 week ago',
              points: 75
            },
            {
              title: 'Community Service - 40 hours',
              status: 'verified',
              date: '2 weeks ago',
              points: 40
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">+{activity.points} pts</p>
                <p className={`text-xs capitalize ${
                  activity.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}