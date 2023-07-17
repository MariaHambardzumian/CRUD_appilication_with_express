export interface User {
    id: number;
    name: string;
    age: number;
    gender: 'female' | 'male' | 'other';
    status: boolean;
    creation_timestamp: number;
    modification_timestamp: number | null;
  }