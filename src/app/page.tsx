import { Button } from '@/components/ui/button';
import SupabaseServer from '@/lib/supabase/SupabaseServer';
import Link from 'next/link';

async function Home() {
  const supabase = await SupabaseServer();
  const userSession = await supabase.auth.getSession();
  const { session } = userSession.data;

  return (
    <div className='flex justify-center items-center h-[calc(100vh-100px)]'>
      <Link href={session ? '/chats' : '/auth/user'}>
        <Button>Start Global Chat</Button>
      </Link>
    </div>
  );
}
export default Home;
