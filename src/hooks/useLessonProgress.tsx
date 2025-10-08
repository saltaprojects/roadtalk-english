import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FREE_LESSONS_LIMIT = 3;

export const useLessonProgress = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCompletedLessons = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lesson_completions')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching lesson completions:', error);
        return;
      }

      setCompletedLessons(data?.map(item => item.lesson_id) || []);
    } catch (error) {
      console.error('Error fetching lesson completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to track progress.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('lesson_completions')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
        });

      if (error && error.code !== '23505') { // Ignore duplicate key error
        console.error('Error marking lesson complete:', error);
        return false;
      }

      setCompletedLessons(prev => [...new Set([...prev, lessonId])]);
      return true;
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      return false;
    }
  };

  const canAccessLesson = (lessonNumber: number, isSubscribed: boolean) => {
    // All lessons require subscription
    return isSubscribed;
  };

  const getCompletedCount = () => completedLessons.length;

  const hasReachedFreeLimit = () => completedLessons.length >= FREE_LESSONS_LIMIT;

  useEffect(() => {
    fetchCompletedLessons();
  }, []);

  return {
    completedLessons,
    loading,
    markLessonComplete,
    canAccessLesson,
    getCompletedCount,
    hasReachedFreeLimit,
    fetchCompletedLessons,
    FREE_LESSONS_LIMIT,
  };
};
