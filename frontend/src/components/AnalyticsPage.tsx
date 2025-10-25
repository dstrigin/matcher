import { UserProfile } from '../types/user';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AnalyticsPageProps {
  user: UserProfile;
}

export function AnalyticsPage({ user }: AnalyticsPageProps) {
  // Prepare skills data for visualization
  const skillsData = user.skills.slice(0, 5).map((skill, index) => ({
    name: skill,
    level: Math.floor(Math.random() * 30) + 70, // Mock proficiency level
    color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][index % 5],
  }));

  // Professional qualities data
  const qualitiesData = [
    { category: 'Технические навыки', value: 85, color: '#3b82f6' },
    { category: 'Коммуникация', value: 78, color: '#8b5cf6' },
    { category: 'Лидерство', value: 72, color: '#10b981' },
    { category: 'Креативность', value: 90, color: '#f59e0b' },
    { category: 'Аналитика', value: 80, color: '#ef4444' },
  ];

  // Mock activity data
  const activityData = [
    { month: 'Июн', matches: 12, views: 45 },
    { month: 'Июл', matches: 18, views: 62 },
    { month: 'Авг', matches: 15, views: 58 },
    { month: 'Сен', matches: 22, views: 71 },
    { month: 'Окт', matches: 28, views: 89 },
  ];

  const maxActivity = Math.max(...activityData.map(d => Math.max(d.matches, d.views)));

  const stats = [
    {
      title: 'Просмотров профиля',
      value: '325',
      icon: 'users',
      trend: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Совпадений',
      value: '95',
      icon: 'target',
      trend: '+8%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Ср. совместимость',
      value: '84%',
      icon: 'trending',
      trend: '+5%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Рейтинг профиля',
      value: '4.8',
      icon: 'award',
      trend: '+0.3',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Аналитика профиля</h1>
        <p className="text-gray-600">Визуализация ваших навыков и активности</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">{stat.title}</p>
                    <p className={`${stat.color}`}>{stat.value}</p>
                    <p className="text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    {stat.icon === 'users' && (
                      <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {stat.icon === 'target' && (
                      <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {stat.icon === 'trending' && (
                      <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="16 7 22 7 22 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {stat.icon === 'award' && (
                      <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Уровень навыков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 py-4">
              {skillsData.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Qualities */}
        <Card>
          <CardHeader>
            <CardTitle>Профессиональные качества</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 py-4">
              {qualitiesData.map((quality) => (
                <div key={quality.category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{quality.category}</span>
                    <span className="text-gray-600">{quality.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${quality.value}%`,
                        backgroundColor: quality.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Активность за последние месяцы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <div className="flex items-end justify-around h-64 border-b border-gray-300">
              {activityData.map((data) => (
                <div key={data.month} className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-end h-48">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 bg-green-500 rounded-t transition-all hover:bg-green-600"
                        style={{ height: `${(data.matches / maxActivity) * 100}%` }}
                        title={`Совпадения: ${data.matches}`}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                        style={{ height: `${(data.views / maxActivity) * 100}%` }}
                        title={`Просмотры: ${data.views}`}
                      />
                    </div>
                  </div>
                  <span className="text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-gray-700">Совпадения</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span className="text-gray-700">Просмотры</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Топ навыки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.skills.slice(0, 5).map((skill, index) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${100 - index * 10}%` }}
                      />
                    </div>
                    <span className="text-gray-600 w-12 text-right">{100 - index * 10}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Интересы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.interests.map((interest, index) => (
                <div key={interest} className="flex items-center justify-between">
                  <span className="text-gray-700">{interest}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${95 - index * 8}%` }}
                      />
                    </div>
                    <span className="text-gray-600 w-12 text-right">{95 - index * 8}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
