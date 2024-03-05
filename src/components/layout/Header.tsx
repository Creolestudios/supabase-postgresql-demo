'use client';
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import Link from 'next/link';
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from '@/components/ui/navigation-menu';
import MenuIcon from './MenuIcon';
import { User } from '@supabase/supabase-js';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { useRouter } from 'next/navigation';

export default function Header({ user }: { user: User | undefined }) {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = SupabaseClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b mb-3'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='lg:hidden' size='icon' variant='outline'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Link href='#'>
            <span className='sr-only'>ShadCN</span>
          </Link>
          <div className='grid gap-2 py-6'>
            <Link
              className='flex w-full items-center py-2 text-lg font-semibold'
              href='/'
            >
              Home
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link className='mr-6 hidden lg:flex' href='#'>
        <span className='sr-only'>ShadCN</span>
      </Link>
      <NavigationMenu className='hidden lg:flex'>
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
              href='/'
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      {user ? (
        <div className='ml-auto'>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div className='ml-auto flex gap-2'>
          <Link href={'/auth/user'}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
