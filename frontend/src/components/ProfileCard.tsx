import { UserProfile } from '../types/user';
import { Badge } from './ui/badge';

interface ProfileCardProps {
  user: UserProfile;
  compatibility?: number;
}

export function ProfileCard({ user, compatibility }: ProfileCardProps) {
  const searchGoalLabels: { [key: string]: string } = {
    friends: 'Друзья',
    startup: 'Стартап',
    mentor: 'Ментор',
    team: 'Команда',
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl">
      <div className="relative h-[400px]">
        <img
          src={user.photo}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        {compatibility && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full">
            {compatibility}% совместимость
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-gray-900">{user.name}, {user.age}</h2>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{user.city}</span>
          </div>
        </div>

        <p className="text-gray-700">{user.about}</p>

        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Опыт</span>
          </div>
          <p className="text-gray-600">{user.experience}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Ищет</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.searchGoals.map((goal) => (
              <Badge key={goal} variant="secondary">
                {searchGoalLabels[goal]}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 mb-2">Навыки</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 5).map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 mb-2">Интересы</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 4).map((interest) => (
              <Badge key={interest}>
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
