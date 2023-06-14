import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const useLogin = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const handleFormSubmit = async (formData) => {
    try {
      if (formData) {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
          callbackUrl: 'http://localhost:3000',
        });
        console.log(result);
        if (result.ok) {
          toast.success('Login Successfully');
          router.push(result.url);
        } else {
          toast.error('Wrong Credentials');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        toast.error('USER NOT FOUND');
      }
    }
  };

  return { register, handleSubmit, handleFormSubmit };
};

export default useLogin;
