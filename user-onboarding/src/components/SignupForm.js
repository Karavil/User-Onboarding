import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from 'axios';
import { useForm } from "react-hook-form";

//Styled form components
const StyledForm = styled.form`
   width: 100%;

   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 300px;

   font-size: 1.2rem;
`;

const InputDiv = styled.div`
   margin: 10px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`;

const StyledInput = styled.input`
   border-radius: 5px;
   height: 70%;
   font-size: 1em;
   width: 100%;
`;
const StyledTextInput = styled(StyledInput)`
`;

const FormWarning = styled.p`
   padding: 4px;
   text-align: left;
   color: red;
   margin: 0;
`;

// Schema for form input (rules, etc)
const phoneRegExp =
   "/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/";
const passwordRegExp =
   "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,30}$";

const schema = yup.object().shape({
   firstName: yup.string().required("Please enter your first name."),
   lastName: yup.string().required("Please enter your last name."),
   email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter an email"),
   password: yup
      .string()
      .matches(
         passwordRegExp,
         "Please make sure to have a minimum eight and maximum 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required("Please enter a password."),
   mobileNumber: yup
      .string()
      .matches(phoneRegExp, "Please enter a valid number.")
      .required("Please enter a mobile number."),
   termsOfService: yup
      .boolean()
      .oneOf([true], "You must accept the terms of service to continue.")
      .required("You must accept the terms of service to continue.")
});

//Main form component
const SignupForm = props => {
   const { register, handleSubmit, errors } = useForm({
      defaultValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         mobileNumber: '',
         termsOfService: false,
      },
      validationSchema: schema
   });

   const onSubmit = data => {
         console.log("submitting! ", data);
         axios
           .post("https://reqres.in/api/users/", data)
           .then(res => {
             console.log('success', res);
           })
           .catch(err => console.log(err.response));
   }

   return (
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
         <InputDiv>
            <StyledTextInput
               type="text"
               placeholder="First name"
               name="firstName"
               ref={register}
            />
            {errors.firstName && (
               <FormWarning>{errors.firstName.message}</FormWarning>
            )}
         </InputDiv>

         <InputDiv>
            <StyledTextInput
               type="text"
               placeholder="Last name"
               name="lastName"
               ref={register}
            />
            {errors.lastName && (
               <FormWarning>{errors.lastName.message}</FormWarning>
            )}
         </InputDiv>

         <InputDiv>
            <StyledTextInput
               type="text"
               placeholder="Email"
               name="email"
               ref={register}
            />
            {errors.email && <FormWarning>{errors.email.message}</FormWarning>}
         </InputDiv>

         <InputDiv>
            <StyledTextInput
               type="password"
               placeholder="Password"
               name="password"
               ref={register}
            />
            {errors.password && (
               <FormWarning>{errors.password.message}</FormWarning>
            )}
         </InputDiv>

         <InputDiv>
            <StyledTextInput
               type="tel"
               placeholder="Mobile number"
               name="mobileNumber"
               ref={register}
            />
            {errors.mobileNumber && (
               <FormWarning>{errors.mobileNumber.message}</FormWarning>
            )}
         </InputDiv>

         <InputDiv>
            <StyledTextInput
               type="checkbox"
               placeholder="Terms of Service"
               name="termsOfService"
               ref={register}
            />
            {errors.termsOfService && (
               <FormWarning>{errors.termsOfService.message}</FormWarning>
            )}
         </InputDiv>

         <button type="submit">Submit</button>
      </StyledForm>
   );
};

export default SignupForm;
