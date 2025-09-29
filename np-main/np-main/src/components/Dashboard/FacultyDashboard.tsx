import React from 'react';
import { SquareCheck as CheckSquare, Clock, Users, TrendingUp, FileText, CircleAlert as AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const verificationData = [
  { category: 'Academic', pending: 12, verified: 45 },
  { category: 'Co-curricular', pending: 8, verified: 32 },
  { category: 'Extra-curricular', pending: 15, verified: 28 },
  { category: 'Research', pending: 5, verified: 18 },
];

export default function FacultyDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="opacity-90">Welcome, Dr. Jane Doe. You have 25 pending verifications waiting for your review.</p>
        <div className="mt-4 flex items-center space-x-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Bulk Verify
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">25</p>
              <p className="text-gray-600">Pending Reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">123</p>
              <p className="text-gray-600">Verified This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">85</p>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-gray-600">Approval Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Verification Overview</h2>
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={verificationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar dataKey="verified" fill="#10B981" />
              <Bar dataKey="pending" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-sm text-gray-600">Verified</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {[
            {
              student: 'John Smith',
              achievement: 'Research Paper - Machine Learning Applications',
              category: 'Academic',
              submitted: '2 hours ago',
              priority: 'high'
            },
            {
              student: 'Emily Johnson',
              achievement: 'Debate Competition - First Place',
              category: 'Co-curricular',
              submitted: '5 hours ago',
              priority: 'medium'
            },
            {
              student: 'Michael Brown',
              achievement: 'Community Service - Environmental Clean-up',
              category: 'Extra-curricular',
              submitted: '1 day ago',
              priority: 'low'
            }
          ].map((submission, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  submission.priority === 'high' ? 'bg-red-500' : 
                  submission.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900">{submission.achievement}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">by {submission.student}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {submission.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{submission.submitted}</span>
                <div className="flex space-x-2">
                  <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors">
                    Approve
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Bulk Verification</h3>
          </div>
          <p className="text-gray-600 text-sm">Process multiple submissions at once</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-3">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Priority Queue</h3>
          </div>
          <p className="text-gray-600 text-sm">Review high-priority submissions first</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="font-semibold text-gray-900">Generate Report</h3>
          </div>
          <p className="text-gray-600 text-sm">Export verification statistics</p>
        </div>
      </div>
    </div>
  );
}