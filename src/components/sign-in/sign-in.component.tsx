import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth, signInWithGoogle } from 'firebase/firebase.utils';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/custom-button/custom-button.component';

import './sign-in.styles.scss';

export default function SignIn(): JSX.Element {
  const initialForm = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(form.email, form.password);
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
    } finally {
      setForm(initialForm);
      setLoading(false);
    }
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          label='Email'
          value={form.email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          value={form.password}
          handleChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit' isLoading={loading}>
            Sign in
          </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
