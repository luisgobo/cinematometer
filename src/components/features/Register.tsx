import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import "../../styles/register.scss"
import { useFierbase } from '../../context/use-firebase';
import { TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import AuthorizedPage from "../layouts/AuthorizedPage";


//const MIN_PASSWORD_CHARACTERS = 8;

interface registerFormValues {
    email: string,
    password: string,
    name: string
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Email has no a correct format, please check").required(),
    password:
        Yup.string()
            .required('Please Enter your password')
            .matches(                
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .test("minLenght", "Min lenght is 8", (value) => value?.length ? value.length >= 8 : false),
    name: Yup.string()
            .test("minLenght", "Min lenght is 2", (value) => value?.length ? value.length >= 2 : false)
});

export const Register = () => {

    const { securityRegister } = useFierbase();
    const handleFormSubmit = async (values: registerFormValues) => {
        try {
            await securityRegister(values.email, values.password, values.name);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AuthorizedPage>
            <main className="main">
                <Formik<registerFormValues>
                    initialValues={{
                        email: '',
                        password: '',
                        name: ''
                    }}
                    validationSchema={RegisterSchema}
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
                        <form onSubmit={handleSubmit}>
                            <h1>Register</h1>
                            <TextField
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                required
                                label="Email"
                                type="email"
                                value={values.email}
                                placeholder='your@email.com'
                                onChange={handleChange("email")}
                                onBlur={handleBlur("email")} />

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

                            <TextField
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                required
                                label="Name"
                                type="text"
                                value={values.name}
                                placeholder='Type your name'
                                onChange={handleChange("name")}
                                onBlur={handleBlur("name")} />

                            <LoadingButton
                                loading={isSubmitting || isValidating}
                                disabled={!isValid}
                                variant="outlined"
                                type="submit"
                            >
                                Register
                            </LoadingButton>
                        </form>
                    )
                    }
                </Formik>
            </main>
        </AuthorizedPage>
    )
}
