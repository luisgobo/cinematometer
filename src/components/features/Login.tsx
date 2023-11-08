import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup'
import "../../styles/register.scss"
import { useFierbase } from '../../context/use-firebase';
import { TextField, Link } from '@mui/material';
import styled from '@emotion/styled'
import { LoadingButton } from "@mui/lab";
import AuthorizedPage from "../layouts/AuthorizedPage";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
    email: string,
    password: string
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email has no a correct format, please check").required(),
    password:
        Yup.string()
            .required('Please Enter your password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must Contain: 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .test("minLenght", "Min lenght is 8", (value) => value?.length ? value.length >= 8 : false),
});

export const Login = () => {

    const { login } = useFierbase();
    const navigate = useNavigate();

    const handleFormSubmit = async (values: LoginFormValues) => {
        try {
            const user = await login(values.email, values.password);            
            if(user){
                navigate("/");  
            }

        } catch (error) {            
            console.log(error);
        }
    }

    const ButtonStyled = styled(LoadingButton)(() => ({
        borderRadius: '25px',                
    }));

    return (
        <AuthorizedPage>
            <main className="main">
                <Formik<LoginFormValues>
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleFormSubmit}
                    validateOnBlur
                    validateOnChange
                    validateOnMount
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        isValidating
                    }) => (
                        <form className="registry-form" onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <TextField
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                required
                                label="Email"
                                type="email"
                                value={values.email}
                                placeholder='your_email@here.com'
                                onChange={handleChange("email")}
                                onBlur={handleBlur("email")}
                                className="textfield" />

                            <TextField
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                required
                                label="Password"
                                type="password"
                                value={values.password}
                                placeholder='Type your password'
                                onChange={handleChange("password")}
                                onBlur={handleBlur("password")} />

                            <ButtonStyled
                                loading={isSubmitting || isValidating}
                                disabled={!isValid}
                                variant="outlined"
                                type="submit"
                            >
                                Login
                            </ButtonStyled>
                            <div>
                                No User? Crated it <Link href="/register" underline="none">{"here"}</Link>
                            </div>
                        </form>
                    )
                    }
                </Formik>
            </main>
        </AuthorizedPage>
    )
}
