'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import ShowPassword from './ShowPassword';
import { useState } from 'react';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SocialLogin from './SocialLogin';

const formSchema: any = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = SupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error?.message) {
      toast.error(error.message, { style: { background: 'red' } });
    } else if (data.user) {
      router.push('/chat');
      router.refresh();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='relative'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter you password'
                        {...field}
                      />
                    </FormControl>
                    <ShowPassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-[100%]'>
            Login
          </Button>
        </form>
      </Form>
      <Separator className='my-6 bg-slate-50 h-[.5px]' />
      <div className='flex justify-between'>
        <SocialLogin />
      </div>
    </div>
  );
}
