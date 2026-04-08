import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  goal?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  googleLogin: () => Promise<{ success: boolean; error?: string }>;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'user@example.com': {
    password: '123456',
    user: {
      id: 'user-1',
      name: 'Alex Johnson',
      email: 'user@example.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-15',
      goal: 'Software Engineer',
    },
  },
  'admin@example.com': {
    password: '123456',
    user: {
      id: 'admin-1',
      name: 'Sarah Mitchell',
      email: 'admin@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      joinDate: '2023-06-01',
    },
  },
  'mentor@example.com': {
    password: '123456',
    user: {
      id: 'mentor-1',
      name: 'Dr. Priya Sharma',
      email: 'mentor@example.com',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      joinDate: '2023-09-10',
    },
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  googleLogin: async () => ({ success: false }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rightstep-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<Record<string, { password: string; user: User }>>(() => {
    const saved = localStorage.getItem('rightstep-registered-users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rightstep-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rightstep-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const found = registeredUsers[email.toLowerCase()];
    if (!found) {
      return { success: false, error: 'Account not found. Please register first.' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Invalid password. Please try again.' };
    }
    setUser(found.user);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    await new Promise(r => setTimeout(r, 800));
    const lowerEmail = email.toLowerCase();
    if (registeredUsers[lowerEmail]) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email: lowerEmail,
      role,
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face`,
      joinDate: new Date().toISOString().split('T')[0],
    };
    const updated = { ...registeredUsers, [lowerEmail]: { password, user: newUser } };
    setRegisteredUsers(updated);
    localStorage.setItem('rightstep-registered-users', JSON.stringify(updated));
    setUser(newUser);
    return { success: true };
  };

  const googleLogin = async () => {
    await new Promise(r => setTimeout(r, 1000));
    const googleUser: User = {
      id: `google-${Date.now()}`,
      name: 'Google User',
      email: 'googleuser@gmail.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUser(googleUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rightstep-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
