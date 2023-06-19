import "../../styles/Registration.scss";
import { RegistrationReducer } from "../../store/Example/Reducers/RegistrationReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../../tools/validator";

const { REGISTRATION } = RegistrationReducer.actions;

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm();
  // const isAuth = useAppSelector((state) => state.Authorization.isAuth);
  // const error = useAppSelector((state) => state.Registration.error);
  const IsSinging = useAppSelector((state) => state.Registration.loading);
  const dispatch = useAppDispatch();

  const Registration = (data: any) => {
    if (validatePassword(data.password)) {
      setError("password", { message: validatePassword(data.password) });
      return;
    }

    if (validateEmail(data.email)) {
      setError("email", { message: validateEmail(data.email) });
      return;
    }

    console.log(data);
    dispatch(
      REGISTRATION({
        name: data.name,
        password: data.password,
        email: data.email,
      })
    );
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/SignInForm");
  };
  return (
    <div className="sign-up-mobile">
    {IsSinging ? <div className="loading"></div> : null}
    <form onSubmit={handleSubmit(Registration)} className="sign-up-mobile form-container">
      <div className="form-header">
        <p className="signup">Sign Up</p>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        {...register("username", {
          required: "Username is required",
        })}
      />
      {errors.username && (
        <p className="error-message error">{errors.username.message?.toString()}</p>
      )}

    <input
      type="email"
      className="form-control"
      placeholder="Email"
      {...register("email", {
        required: "Email is required",
      })}
    />
    {errors.email && (
      <p className="error-message error">{errors.email.message?.toString()}</p>
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
      <p className="error-message error">{errors.password.message?.toString()}</p>
    )}

    <input
      type="password"
      className="form-control"
      placeholder="Confirm Password"
      {...register("confirmPassword", {
        required: "Confirm Password is required",
      })}
    />
    {errors.confirmPassword && (
      <p className="error-message error">
        {errors.confirmPassword.message?.toString()}
      </p>
    )}

    <div className="checkbox-container">
      <input type="checkbox" className="checkbox" />
      <p className="terms-text">
        By signing up, you agree to the <span className="highlighted-text">Terms of Service</span> and <span className="highlighted-text">Privacy Policy</span>
      </p>
    </div>

    <button className="btn btn-secondary">Sign Up</button>

    <p className="login-text">
      Have an account? <span onClick={handleClick}>Log In</span>
    </p>

  </form>
</div>
  );
};

export default RegistrationForm;