import React, {useEffect, useState} from 'react';
import {IUserType, UserLoginType} from '../../types/IUserType';
import '../../styles/Registration.scss';
import {AuthorizationReducer} from '../../store/Example/Reducers/AuthorizationReducer';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import InputWrapper from "../../elements/InputWrapper";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";


const {SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_ERROR,SIGN_IN_GOOGLE} = AuthorizationReducer.actions;
const SignInForm = () => {
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        setError
    } = useForm()

    const serverError = useAppSelector((state) => state.Registration.error);
    const IsSinging = useAppSelector((state) => state.Authorization.loading);
    const dispatch = useAppDispatch();

  const SignIn = (data: any) => {
    console.log(data)
    dispatch(SIGN_IN({email: data.email, password: data.password}));
};
useEffect(() => {
  if (serverError) {
    setError("serverError", { message: "Wrong login or password" });
  }
}, [serverError, setError]);

  const signInGoogle = (response: CredentialResponse) => {
    if (response.credential){
      dispatch(SIGN_IN_GOOGLE({ token: response.credential} ));
    }
    else{
      console.log("No credential in google response");
    }
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };


    return (
        <div className="sign-up-mobile">
            {IsSinging ? <div className="loading......"/> : null}
            <h3>Login</h3>

            <form onSubmit={handleSubmit(SignIn)} className="sign-up-mobile form-container">
                <InputWrapper>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                </InputWrapper>
                {errors.email && (
                    <p className="error-message">{errors.email.message?.toString()}</p>
                )}

                <InputWrapper>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                </InputWrapper>
                {errors.password && (
                    <p className="error-message">{errors.password.message?.toString()}</p>
                )}


                {errors.confirmPassword && (
                    <p className="error-message">
                        {errors.confirmPassword.message?.toString()}
                    </p>
                )}

                <button className="button">Login</button>

                <p className="login-text">
                    Don’t have an account yet? <a href={"/registration"}> Sign Up</a>
                </p>

            </form>
        </div>
    );
};

export default SignInForm;
