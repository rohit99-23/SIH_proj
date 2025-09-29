import React from 'react';
import AIChat from '../components/Chat/AIChat';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Career Counselor</h1>
        <p className="text-gray-600">Get personalized guidance for your academic and career journey</p>
      </div>
      
      <AIChat />
    </div>
  );
}