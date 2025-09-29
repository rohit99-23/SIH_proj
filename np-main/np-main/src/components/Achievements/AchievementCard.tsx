import React from 'react';
import { Calendar, Award, Clock, CircleCheck as CheckCircle, Circle as XCircle, FileText } from 'lucide-react';
import type { Achievement } from '../../lib/supabase';

interface AchievementCardProps {
  achievement: Achievement;
  onEdit?: (achievement: Achievement) => void;
  onDelete?: (achievementId: string) => void;
}

export default function AchievementCard({ achievement, onEdit, onDelete }: AchievementCardProps) {
  const getStatusColor = (status: Achievement['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Achievement['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'co-curricular':
        return 'bg-green-100 text-green-800';
      case 'extra-curricular':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{achievement.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
        </div>
        <div className="flex space-x-2 ml-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(achievement.status)}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(achievement.status)}
              <span className="capitalize">{achievement.status}</span>
            </div>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
            {achievement.category.replace('-', ' ')}
          </span>
          <span className="text-xs text-gray-500">{achievement.type}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Award className="h-4 w-4" />
          <span>{achievement.points} pts</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(achievement.date).toLocaleDateString()}
        </div>
        
        {achievement.documents.length > 0 && (
          <div className="flex items-center text-sm text-blue-600">
            <FileText className="h-4 w-4 mr-1" />
            <span>{achievement.documents.length} document{achievement.documents.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(achievement)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(achievement.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}