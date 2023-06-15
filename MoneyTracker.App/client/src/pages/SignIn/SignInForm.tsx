import React, { useState } from 'react';
import { IUserType, UserLoginType } from '../../types/IUserType';
import '../../styles/SignInForm.scss';
import { AuthorizationReducer } from '../../store/Example/Reducers/AuthorizationReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {useForm} from "react-hook-form";
import { useNavigate  } from 'react-router-dom';

const {SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_ERROR} = AuthorizationReducer.actions;
const SignInForm = () => {
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,

    } = useForm()
    const error = useAppSelector((state) => state.Authorization.error);
    const IsSinging = useAppSelector((state) => state.Authorization.loading);
    const dispatch = useAppDispatch();

    const SignIn = (data: any) => {
        console.log(data)
        dispatch(SIGN_IN({email: data.email, password: data.password}));
    };
    const navigate = useNavigate ();
    const handleClick = () => {
      navigate('/registration');
    };

  return (
    <div className="sign-in-form">
    {IsSinging ? <div className="loading......"></div> : null}
    <form onSubmit={handleSubmit(SignIn)}>
      <div className="mb-3 px-5 mt-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={errors?.email ? "This field is required!" : "Your email"}
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div className="mb-3 px-5">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder={errors?.password ? "This field is required!" : "123456"}
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <div className="px-5 mb-3 padding-bottom">
        <button type="submit" className="btn btn-secondary px-4">
          Sign In
        </button>
      </div>
      <div className="px-1 mb-3 padding-bottom">
      <button type="button" className="btn btn-secondary px-4" onClick={handleClick}>
      Registration
    </button>
      </div>
    </form>
  </div>
  );
};

export default SignInForm;
