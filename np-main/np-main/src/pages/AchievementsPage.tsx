import React, { useState } from 'react';
import { Plus, ListFilter as Filter, Search } from 'lucide-react';
import AchievementCard from '../components/Achievements/AchievementCard';
import AchievementForm from '../components/Achievements/AchievementForm';
import type { Achievement } from '../lib/supabase';

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    id: '1',
    student_id: '1',
    title: 'First Place - TechFest Hackathon 2024',
    description: 'Developed an AI-powered study assistant that helps students optimize their learning schedule based on cognitive patterns.',
    category: 'co-curricular',
    type: 'Competition',
    date: '2024-03-15',
    points: 75,
    status: 'verified',
    documents: ['certificate.pdf', 'project-demo.mp4'],
    created_at: '2024-03-16T10:00:00Z'
  },
  {
    id: '2',
    student_id: '1',
    title: 'Research Paper Publication',
    description: 'Published research paper on "Machine Learning Applications in Educational Technology" in IEEE Conference proceedings.',
    category: 'academic',
    type: 'Research',
    date: '2024-02-28',
    points: 100,
    status: 'pending',
    documents: ['paper.pdf', 'acceptance-letter.pdf'],
    created_at: '2024-03-01T10:00:00Z'
  },
  {
    id: '3',
    student_id: '1',
    title: 'Community Service - 50 Hours',
    description: 'Volunteered at local coding bootcamp teaching programming fundamentals to underprivileged youth.',
    category: 'extra-curricular',
    type: 'Volunteer Work',
    date: '2024-01-15',
    points: 50,
    status: 'verified',
    documents: ['volunteer-certificate.pdf'],
    created_at: '2024-01-20T10:00:00Z'
  }
];

export default function AchievementsPage() {
  const [achievements] = useState(mockAchievements);
  const [filteredAchievements, setFilteredAchievements] = useState(mockAchievements);
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterAchievements(term, filterCategory, filterStatus);
  };

  const handleCategoryFilter = (category: string) => {
    setFilterCategory(category);
    filterAchievements(searchTerm, category, filterStatus);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    filterAchievements(searchTerm, filterCategory, status);
  };

  const filterAchievements = (search: string, category: string, status: string) => {
    let filtered = achievements;

    if (search) {
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(search.toLowerCase()) ||
        achievement.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === category);
    }

    if (status !== 'all') {
      filtered = filtered.filter(achievement => achievement.status === status);
    }

    setFilteredAchievements(filtered);
  };

  const handleSubmit = (achievementData: Partial<Achievement>) => {
    // In a real app, this would call your API
    console.log('Achievement data:', achievementData);
    setShowForm(false);
    setEditingAchievement(undefined);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = (achievementId: string) => {
    // In a real app, this would call your API
    console.log('Delete achievement:', achievementId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Achievements</h1>
          <p className="text-gray-600">Track and manage your academic and co-curricular accomplishments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Filter by:</span>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="academic">Academic</option>
              <option value="co-curricular">Co-curricular</option>
              <option value="extra-curricular">Extra-curricular</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters or search term.'
              : 'Start building your profile by adding your first achievement.'}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Achievement
          </button>
        </div>
      )}

      {/* Achievement Form Modal */}
      {showForm && (
        <AchievementForm
          achievement={editingAchievement}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingAchievement(undefined);
          }}
        />
      )}
    </div>
  );
}