import React, { useState } from "react";
import { IUserType, UserLoginType } from "../../types/IUserType";
import "../../styles/Registration.scss";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_ERROR } =
  AuthorizationReducer.actions;
const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const error = useAppSelector((state) => state.Authorization.error);
  const IsSinging = useAppSelector((state) => state.Authorization.loading);
  const dispatch = useAppDispatch();

  const SignIn = (data: any) => {
    console.log(data);
    dispatch(SIGN_IN({ email: data.email, password: data.password }));
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };

  return (
    <div className="sign-up-mobile">
      {IsSinging ? <div className="loading......"></div> : null}

      <form
        onSubmit={handleSubmit(SignIn)}
        className="sign-up-mobile form-container"
      >
        <p className="signup">Login</p>

        <input
          type="email"
          className="form-control"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="error-message error">
            {errors.email.message?.toString()}
          </p>
        )}

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="error-message error">
            {errors.password.message?.toString()}
          </p>
        )}

        {errors.confirmPassword && (
          <p className="error-message error">
            {errors.confirmPassword.message?.toString()}
          </p>
        )}

        <button className="btn btn-secondary">Login</button>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <p className="login-text">
          Don’t have an account yet? <span onClick={handleClick}> Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
