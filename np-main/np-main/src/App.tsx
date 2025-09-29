import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import FacultyDashboard from './components/Dashboard/FacultyDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import AchievementsPage from './pages/AchievementsPage';
import ChatPage from './pages/ChatPage';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={getDashboardComponent()} />
          {user.role === 'student' && (
            <>
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/transcripts" element={<div>Transcripts Page - Coming Soon</div>} />
              <Route path="/mentorship" element={<div>Mentorship Page - Coming Soon</div>} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
            </>
          )}
          {user.role === 'faculty' && (
            <>
              <Route path="/verifications" element={<div>Verifications Page - Coming Soon</div>} />
              <Route path="/students" element={<div>Students Page - Coming Soon</div>} />
              <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
            </>
          )}
          {user.role === 'admin' && (
            <>
              <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
              <Route path="/users" element={<div>Users Management Page - Coming Soon</div>} />
              <Route path="/verifications" element={<div>Verifications Page - Coming Soon</div>} />
              <Route path="/reports" element={<div>Reports Page - Coming Soon</div>} />
            </>
          )}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;