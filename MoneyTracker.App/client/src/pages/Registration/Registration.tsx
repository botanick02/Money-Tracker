import "../../styles/Registration.scss";
import {RegistrationReducer} from "../../store/Example/Reducers/RegistrationReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {useForm} from "react-hook-form";
import {validateEmail, validatePassword} from "../../tools/validator";
import InputWrapper from "../../elements/InputWrapper";

const {REGISTRATION} = RegistrationReducer.actions;

const RegistrationForm = () => {
    const {
        register,
        formState: {errors},
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
            setError("password", {message: validatePassword(data.password)});
            return;
        }

        if (validateEmail(data.email)) {
            setError("email", {message: validateEmail(data.email)});
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


    return (
        <div className="sign-up-mobile">
            {IsSinging ? <div className="loading"/> : null}
            <h3>Sign Up</h3>

            <form onSubmit={handleSubmit(Registration)} className="form-container">
                <InputWrapper>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                </InputWrapper>
                {errors.username && (
                    <p className="error-message">{errors.username.message?.toString()}</p>
                )}

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

                <InputWrapper>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                        })}
                    />
                </InputWrapper>
                {errors.confirmPassword && (
                    <p className="error-message">
                        {errors.confirmPassword.message?.toString()}
                    </p>
                )}

                <div className="checkbox-container">
                    <input type="checkbox"/>
                    <label>
                        By signing up, you agree to the <a href={""}>Terms of Service</a> and <a href={""}>Privacy
                        Policy</a>
                    </label>
                </div>

                <button className="button">Sign Up</button>

                <p className="login-text">
                    Have an account? <a href={"/SignInForm"}>Log In</a>
                </p>

            </form>
        </div>
    );
};

export default RegistrationForm;