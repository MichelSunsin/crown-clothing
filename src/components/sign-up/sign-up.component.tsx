import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { auth, createUserProfileDocument } from 'firebase/firebase.utils';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/custom-button/custom-button.component';

import './sign-up.styles.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(): JSX.Element {
  const initialForm = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      toast.warning("Passwords don't match", { position: 'top-center' });
      return;
    }

    try {
      setLoading(true);

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      if (user) {
        await createUserProfileDocument(user, { displayName });
      }

      toast.success('Account created successfully', { position: 'top-center' });

      setForm(initialForm);
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const { displayName, email, password, confirmPassword } = form;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          label='Name'
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='email'
          name='email'
          label='Email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          value={password}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword}
          handleChange={handleChange}
          required
        />
        <CustomButton type='submit' isLoading={loading}>
          SIGN UP
        </CustomButton>
      </form>
      <ToastContainer />
    </div>
  );
}
