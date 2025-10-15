import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionStatus {
  subscribed: boolean;
  subscription_status: string;
  subscription_end?: string;
  loading: boolean;
}

export const useSubscription = () => {
  const [status, setStatus] = useState<SubscriptionStatus>({
    subscribed: false,
    subscription_status: 'inactive',
    loading: true,
  });
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setStatus({ subscribed: false, subscription_status: 'inactive', loading: false });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setStatus({ subscribed: false, subscription_status: 'inactive', loading: false });
        return;
      }

      setStatus({
        subscribed: data.subscribed,
        subscription_status: data.subscription_status,
        subscription_end: data.subscription_end,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setStatus({ subscribed: false, subscription_status: 'inactive', loading: false });
    }
  };

  const createCheckoutSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };

  const manageSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      throw error;
    }
  };

  useEffect(() => {
    checkSubscription();

    // Refresh subscription status every minute
    const interval = setInterval(checkSubscription, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    ...status,
    createCheckoutSession,
    manageSubscription,
    checkSubscription,
  };
};
