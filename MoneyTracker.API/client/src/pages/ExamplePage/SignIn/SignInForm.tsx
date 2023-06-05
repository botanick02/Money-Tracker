import React, { useState } from 'react';
import { LoginFormState } from '../../../types/ExampleType';
import '../../../styles/SignInForm.scss';

const SignInForm: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = () => {
  
    console.log('login');
  };

  return (
    <div className="sign-in-form">
      <h2>Enter your Email and  Password </h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
