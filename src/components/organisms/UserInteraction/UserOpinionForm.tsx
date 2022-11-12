import { Timestamp } from "firebase/firestore";
import { Formik } from "formik";
import styled from '@emotion/styled'
import { LoadingButton } from "@mui/lab";
import { useFierbase } from "../../../context/use-firebase";
import { MovieRate } from "../../../models/MovieRate";
import AuthorizedPage from "../../layouts/AuthorizedPage";
import * as Yup from 'yup'
import { TextField } from "@mui/material";

const MovieRateSchema = Yup.object().shape({
  comments: Yup.string().required(),
  movieRateValue: Yup.number().required().min(1).max(10)
});

export interface UserOpinionFormProps {
  userId: string,
  movieId: number,
}

export const UserOpinionForm: React.FC<UserOpinionFormProps> = ({

  userId,
  movieId

}) => {

  const { insertMovieRate } = useFierbase();

  const handleFormSubmit = async (values: MovieRate) => {
    try {      
      await insertMovieRate(values.movieRateId, values.userId, values.movieId, values.comments, values.movieRateValue);
    } catch (error) {
      console.log(error);
    }
  }

  const ButtonStyled = styled(LoadingButton)(() => ({
    borderRadius: '25px'
  }));

  return (
    <AuthorizedPage>
      <main>
        <Formik<MovieRate>
          initialValues={{
            movieRateId: '',
            userId: userId,
            movieId: movieId,
            comments: '',
            movieRateValue: 0,
            created: Timestamp.now(),


          }}
          validationSchema={MovieRateSchema}
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
            <form className="user-opinion-form" onSubmit={handleSubmit}>

              <h3 className="user-opinion-p">Let us know about this movie</h3>

              <TextField
                error={touched.comments && !!errors.comments}
                helperText={touched.comments && errors.comments}
                required
                label="Comments"
                type="text"
                value={values.comments}
                placeholder='Add a comment'
                onChange={handleChange("comments")}
                onBlur={handleBlur("comments")}
                className="user-opinion-textbox"
                variant="outlined"
              />

              <TextField
                error={touched.movieRateValue && !!errors.movieRateValue}
                helperText={touched.movieRateValue && errors.movieRateValue}
                required
                label="Movie Rate"
                type="number"
                value={values.movieRateValue}
                placeholder='Type a value'
                onChange={handleChange("movieRateValue")}
                onBlur={handleBlur("movieRateValue")}
                className="user-opinion-textbox2" />


              {/* <MinimalTextbox 
                  inputId="Test" 
                  inputLabel="test" 
                  handleChange={handleChange} 
                  handleBlur={handleBlur}/> */}

              <ButtonStyled
                loading={isSubmitting || isValidating}
                disabled={!isValid}
                variant="outlined"
                type="submit"
              >
                Submit rate
              </ButtonStyled>
            </form>
          )
          }
        </Formik>
      </main>
    </AuthorizedPage>
  )
}
