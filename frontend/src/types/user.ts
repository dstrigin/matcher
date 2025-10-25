export interface UserProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  photo: string;
  about: string;
  interests: string[];
  skills: string[];
  goals: string[];
  experience: string;
  hobbies: string[];
  searchGoals: ('friends' | 'startup' | 'mentor' | 'team')[];
}

export interface Match {
  userId: string;
  compatibility: number;
}
