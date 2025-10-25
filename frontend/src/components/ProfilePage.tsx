import { useState } from 'react';
import { UserProfile } from '../types/user';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

interface ProfilePageProps {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
}

export function ProfilePage({ user, onSave }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const searchGoalOptions = [
    { value: 'friends' as const, label: 'Друзья' },
    { value: 'startup' as const, label: 'Партнер для стартапа' },
    { value: 'mentor' as const, label: 'Ментор' },
    { value: 'team' as const, label: 'Команда для проекта' },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfile({ ...profile, interests: [...profile.interests, newInterest.trim()] });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({ ...profile, interests: profile.interests.filter((i) => i !== interest) });
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setProfile({ ...profile, hobbies: [...profile.hobbies, newHobby.trim()] });
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setProfile({ ...profile, hobbies: profile.hobbies.filter((h) => h !== hobby) });
  };

  const handleSearchGoalToggle = (value: 'friends' | 'startup' | 'mentor' | 'team') => {
    const currentGoals = profile.searchGoals;
    if (currentGoals.includes(value)) {
      setProfile({ ...profile, searchGoals: currentGoals.filter((g) => g !== value) });
    } else {
      setProfile({ ...profile, searchGoals: [...currentGoals, value] });
    }
  };

  const handleSave = () => {
    onSave(profile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-gray-900 mb-6">Мой профиль</h1>
      
      <div className="space-y-6">
        {/* Фото профиля */}
        <div>
          <Label>Фотография профиля</Label>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-gray-600">
              <p>URL текущего фото</p>
              <Input
                value={profile.photo}
                onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Базовые данные */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="age">Возраст</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="city">Город</Label>
            <Input
              id="city"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </div>
        </div>

        {/* О себе */}
        <div>
          <Label htmlFor="about">О себе</Label>
          <Textarea
            id="about"
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            rows={4}
          />
        </div>

        {/* Профессиональный опыт */}
        <div>
          <Label htmlFor="experience">Профессиональный опыт</Label>
          <Input
            id="experience"
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
          />
        </div>

        {/* Навыки */}
        <div>
          <Label>Навыки</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="Добавить навык"
            />
            <Button onClick={handleAddSkill}>Добавить</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M18 6 6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m6 6 12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Интересы */}
        <div>
          <Label>Интересы</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
              placeholder="Добавить интерес"
            />
            <Button onClick={handleAddInterest}>Добавить</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.interests.map((interest) => (
              <Badge key={interest} className="gap-1">
                {interest}
                <button onClick={() => handleRemoveInterest(interest)}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M18 6 6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m6 6 12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Хобби */}
        <div>
          <Label>Хобби</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddHobby()}
              placeholder="Добавить хобби"
            />
            <Button onClick={handleAddHobby}>Добавить</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.hobbies.map((hobby) => (
              <Badge key={hobby} variant="outline" className="gap-1">
                {hobby}
                <button onClick={() => handleRemoveHobby(hobby)}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M18 6 6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m6 6 12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Цели поиска */}
        <div>
          <Label>Цели поиска (можно выбрать несколько)</Label>
          <div className="space-y-3 mt-2">
            {searchGoalOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={profile.searchGoals.includes(option.value)}
                  onCheckedChange={() => handleSearchGoalToggle(option.value)}
                />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка сохранения */}
        <div className="flex justify-end pt-4">
          <Button size="lg" onClick={handleSave}>
            Сохранить профиль
          </Button>
        </div>
      </div>
    </div>
  );
}
