import FormHeader from '@components/FormHeader';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useLogin from 'src/hooks/useLogin';

export default function Login() {
  const { handleSubmit, register, handleFormSubmit } = useLogin();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  return (
    <div>
      {status === 'unauthenticated' && (
        <>
          <div className='flex h-screen bg-slate-100 p-10'>
            <div className='flex flex-col  md:flex-row  w-full max-w-xl m-auto items-center shadow-md border  shadow-black bg-fuchsia-50 rounded-lg  p-12 sm:p-10 md:p-0'>
              <div className='w-full mx-auto '>
                <img
                  className='mx-auto  max-sm:hidden max-md:hidden'
                  src='https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                />
              </div>
              <div className='bg-img'></div>

              <div className='px-3 text-lg z-50 '>
                <div className='text-4xl pb-2 text-white md:text-black  md:border-black  border-b-4 w-fit '>
                  LOGIN
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className='w-full border-b-2 border-b-white md:border-b-slate-700  '>
                    <input
                      placeholder='Email'
                      className='form-input'
                      {...register('email')}
                      required
                    />
                  </div>
                  <div className='w-full mb-6  border-b-2 border-b-white md:border-b-slate-700 '>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-input'
                      {...register('password')}
                      required
                    />
                  </div>
                  <div className=' p-2 mt-3  text-center border-2 border-b-white md:border-slate-500 text-white md:text-black rounded-md  w-full md:w-fit '>
                    <input
                      type='submit'
                      value='Login'
                      className='cursor-pointer'
                    />
                  </div>
                </form>
                <Link href='/signup'>
                  <div className='text-sm pt-2 inline-block md:text-slate-600 text-white   cursor-pointer font-medium hover:text-slate-900 w-fit '>
                    Create One?
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
