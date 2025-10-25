import { useState } from 'react';
import { ProfilePage } from './components/ProfilePage';
import { RecommendationsPage } from './components/RecommendationsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { mockCurrentUser, mockUsers, mockCompatibility } from './data/mockData';
import { UserProfile } from './types/user';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type TabType = 'recommendations' | 'analytics' | 'profile';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockCurrentUser);
  const [activeTab, setActiveTab] = useState<TabType>('recommendations');

  const handleSaveProfile = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    toast.success('Профиль успешно сохранен!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      <div className="w-full">
        {/* Navigation */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around h-16">
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  activeTab === 'recommendations' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Поиск</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  activeTab === 'analytics' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 17V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 17V5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 17v-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Аналитика</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  activeTab === 'profile' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Профиль</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'recommendations' && (
            <RecommendationsPage 
              users={mockUsers} 
              compatibility={mockCompatibility} 
            />
          )}

          {activeTab === 'analytics' && (
            <div className="py-6">
              <AnalyticsPage user={currentUser} />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="py-6">
              <ProfilePage user={currentUser} onSave={handleSaveProfile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
