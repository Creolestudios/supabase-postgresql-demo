import { toast } from '@/components/ui/use-toast';
import SupabaseClient from '@/lib/supabase/SupbaseClient';

export const githubLogin = async () => {
  const supabase = SupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: location.origin + '/auth/callback',
    },
  });
  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  }
};

export const googleLogin = async () => {
  const supabase = SupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: location.origin + '/auth/callback',
    },
  });
  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  }
};
