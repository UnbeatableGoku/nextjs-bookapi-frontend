import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSignup from 'src/hooks/useSignup';

export default function Signup() {
  const { handleSubmit, register, handleFormSubmit } = useSignup();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }
  return (
    <>
      {status === 'unauthenticated' && (
        <div className='flex h-screen bg-slate-100  p-10'>
          <div className='flex flex-col  md:flex-row  w-full max-w-xl m-auto items-center shadow-md border  shadow-black bg-fuchsia-50 rounded-lg  p-12 sm:p-10 md:p-0'>
            <div className='w-full mx-auto'>
              <img
                className='mx-auto  max-sm:hidden max-md:hidden'
                src='https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
              />
            </div>
            <div className='bg-img'></div>

            <div className='px-3 text-lg z-50'>
              <div className='text-4xl pb-4'>SIGNUP</div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='w-full border-b-2 border-b-slate-700 '>
                  <input
                    placeholder='Email'
                    className='pt-4 bg-transparent  placeholder:text-black'
                    {...register('email')}
                    required
                  />
                </div>
                <div className='w-full border-b-2 border-b-slate-700 '>
                  <input
                    placeholder='Username'
                    className='pt-4 bg-transparent  placeholder:text-black'
                    {...register('username')}
                    required
                  />
                </div>
                <div className='w-full  border-b-2 border-b-slate-700 '>
                  <input
                    placeholder='Password'
                    className='pt-4 bg-transparent  placeholder:text-black'
                    type='password'
                    {...register('password')}
                  />
                </div>
                <div className=' p-2 mt-3  border border-slate-500 rounded-md  w-fit '>
                  <input
                    type='submit'
                    value='Signup'
                    className='cursor-pointer'
                  />
                </div>
              </form>
              <Link href='/login'>
                <div className='w-fit text-sm pt-2 text-slate-600 cursor-pointer font-medium hover:text-slate-900 inline-block'>
                  Already have an account?
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
