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
import ShowPassword from './ShowPassword';
import { useState } from 'react';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { toast } from 'sonner';

const formSchema: any = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  confirm_password: z.string(),
  profile_image: z.string().refine(async (value) => {
    if (!value) {
      return null;
    }
    return true;
  }),
});

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      profile_image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = SupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
          email: values.email,
          picture: values.profile_image,
        },
      },
    });
    if (data) {
      toast.success('You have successfully register.', {
        style: { background: '#355E3B' },
      });
      form.reset();
      window.location.reload();
    } else if (error) {
      toast.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder='Enter your password'
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
        <FormField
          control={form.control}
          name='confirm_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Re-enter your password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='profile_image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  onChange={async (e) => {
                    let file;
                    if (e.target.files) {
                      file = e.target.files[0];
                    }
                    const supabase = SupabaseClient();
                    const { data, error } = await supabase.storage
                      .from('profile')
                      .upload('public/' + file?.name, file as File);
                    if (data?.path) {
                      form.setValue(
                        'profile_image',
                        `https://jzlxvhbexspuuxmcpapg.supabase.co/storage/v1/object/public/profile/${data.path}`
                      );
                    } else {
                      toast.error(error?.message, {
                        style: { background: 'red' },
                      });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-[100%]'>
          Register
        </Button>
      </form>
    </Form>
  );
}
