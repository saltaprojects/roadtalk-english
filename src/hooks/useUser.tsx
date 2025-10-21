import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  userName: string;
  userId: string | null;
  loading: boolean;
}

let cachedUserData: UserData | null = null;
let listeners: Array<(data: UserData) => void> = [];

export const useUser = () => {
  const [userData, setUserData] = useState<UserData>(
    cachedUserData || { userName: '', userId: null, loading: true }
  );

  useEffect(() => {
    // Add this component to listeners
    listeners.push(setUserData);

    // If we have cached data, use it immediately
    if (cachedUserData) {
      setUserData(cachedUserData);
      return () => {
        listeners = listeners.filter(l => l !== setUserData);
      };
    }

    // Otherwise fetch user data
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          const newData = { userName: '', userId: null, loading: false };
          cachedUserData = newData;
          listeners.forEach(listener => listener(newData));
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        const newData = {
          userName: profile ? `${profile.first_name} ${profile.last_name}` : '',
          userId: session.user.id,
          loading: false,
        };

        cachedUserData = newData;
        listeners.forEach(listener => listener(newData));
      } catch (error) {
        console.error('Error fetching user:', error);
        const newData = { userName: '', userId: null, loading: false };
        cachedUserData = newData;
        listeners.forEach(listener => listener(newData));
      }
    };

    fetchUser();

    return () => {
      listeners = listeners.filter(l => l !== setUserData);
    };
  }, []);

  const refreshUser = async () => {
    cachedUserData = null;
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      const newData = { userName: '', userId: null, loading: false };
      cachedUserData = newData;
      listeners.forEach(listener => listener(newData));
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', session.user.id)
      .single();

    const newData = {
      userName: profile ? `${profile.first_name} ${profile.last_name}` : '',
      userId: session.user.id,
      loading: false,
    };

    cachedUserData = newData;
    listeners.forEach(listener => listener(newData));
  };

  return {
    ...userData,
    refreshUser,
  };
};

