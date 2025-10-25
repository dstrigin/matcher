import { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { ProfileCard } from './ProfileCard';
import { Button } from './ui/button';

interface RecommendationsPageProps {
  users: UserProfile[];
  compatibility: { [key: string]: number };
}

export function RecommendationsPage({ users, compatibility }: RecommendationsPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const currentUser = users[currentIndex];

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX.current;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      const direction = dragOffset > 0 ? 'right' : 'left';
      if (direction === 'right') {
        handleLike();
      } else {
        handleDislike();
      }
    } else {
      setDragOffset(0);
    }
  };

  const handleLike = () => {
    if (!currentUser || isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection('right');
    
    // Simulate mutual match (50% chance)
    if (Math.random() > 0.5) {
      setMatches([...matches, currentUser.id]);
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
      setDragOffset(0);
    }, 300);
  };

  const handleDislike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection('left');
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
      setDragOffset(0);
    }, 300);
  };

  if (currentIndex >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="text-center space-y-4">
          <svg className="w-16 h-16 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-gray-900">Рекомендации закончились</h2>
          <p className="text-gray-600">Проверьте позже, появятся новые люди!</p>
          {matches.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                У вас {matches.length} {matches.length === 1 ? 'новый матч' : 'новых матча'}! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md mb-6">
        <h1 className="text-gray-900 mb-2">Рекомендации</h1>
        <p className="text-gray-600">
          {users.length - currentIndex} {users.length - currentIndex === 1 ? 'человек' : 'людей'} найдено
        </p>
      </div>

      <div className="relative w-full max-w-md h-[700px]">
        {currentUser && (
          <div
            ref={cardRef}
            className={`absolute w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform select-none`}
            style={{
              transform: swipeDirection 
                ? `translateX(${swipeDirection === 'right' ? '400px' : '-400px'}) rotate(${swipeDirection === 'right' ? '20deg' : '-20deg'})`
                : `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
              opacity: swipeDirection ? 0 : Math.max(0.5, 1 - Math.abs(dragOffset) / 300),
              transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            <ProfileCard 
              user={currentUser} 
              compatibility={compatibility[currentUser.id]} 
            />
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 p-0"
          onClick={handleDislike}
          disabled={isAnimating}
        >
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18 6 6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m6 6 12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600"
          onClick={handleLike}
          disabled={isAnimating}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
