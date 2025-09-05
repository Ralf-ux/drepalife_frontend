import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { User, AuthState, UserRole } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: true, // Set to true by default for guest access
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user: user,
          token: storedToken,
          isLoading: false,
          isAuthenticated: true,
        });

        // Navigate to the appropriate dashboard based on the user's role
        if (user.role === 'patient') {
          router.replace('/(patient)/dashboard');
        } else if (user.role === 'health_expert') {
          router.replace('/(expert)/dashboard');
        } else if (user.role === 'admin') {
          router.replace('/(admin)/dashboard');
        }
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email,
        role,
        firstName: 'John',
        lastName: 'Doe',
        verified: true,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
      });

      // Navigate to the appropriate dashboard based on the user's role
      if (mockUser.role === 'patient') {
        router.replace('/(patient)/dashboard');
      } else if (mockUser.role === 'health_expert') {
        router.replace('/(expert)/dashboard');
      } else if (mockUser.role === 'admin') {
        router.replace('/(admin)/dashboard');
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Set isAuthenticated to true for new users
    setAuthState((prev) => ({ ...prev, isAuthenticated: true }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        verified: userData.role !== 'health_expert', // Health experts need approval
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
      });

      // Navigate to the appropriate dashboard based on the user's role
      if (mockUser.role === 'patient') {
        router.replace('/(patient)/dashboard');
      } else if (mockUser.role === 'health_expert') {
        router.replace('/(expert)/dashboard');
      } else if (mockUser.role === 'admin') {
        router.replace('/(admin)/dashboard');
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
      console.log('token removed successfully');

      // Redirect to landing page after logout
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState((prev) => ({ ...prev, user: updatedUser }));
      AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
