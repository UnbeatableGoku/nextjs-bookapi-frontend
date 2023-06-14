import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const useSignup = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleFormSubmit = async (formData) => {
    try {
      if (formData) {
        const { data } = await axios.post('/api/auth/signup', formData);
        if (data.message) {
          toast.success('User Created');
          router.push('/login');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return { register, handleSubmit, handleFormSubmit };
};

export default useSignup;
