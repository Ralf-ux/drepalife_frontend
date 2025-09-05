import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';

export const useAuthRedirect = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkLoggedUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userInfo = await AsyncStorage.getItem('user');

        if (token && userInfo) {
          setUser(JSON.parse(userInfo));
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.log('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedUser();
  }, [pathname]);

  return { user, loading };
};
