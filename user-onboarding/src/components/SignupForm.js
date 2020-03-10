import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";

//Styled form components
const StyledForm = styled.form`
   width: 100%;

   display: flex;
   flex-direction: column;

   font-size: 1.2rem;
`;

const InputDiv = styled.div`
   margin: 10px;
   display: flex;
   flex-direction: column;
`;

const StyledLabel = styled.label`
   text-align: left;
`;

const StyledInput = styled.input`
   border-radius: 5px;
   font-size: 1em;
   margin: 0;

   &[type='checkbox'] {
      transform: scale(1.2);
      margin: 0 10px;

      &:checked {
         background: #abd;
      }
   }
`;

const FormWarning = styled.p`
   padding: 4px;
   text-align: left;
   color: red;
   margin: 0;
`;

// Schema for form input (rules, etc)
const phoneRegExp = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
const passwordRegExp = new RegExp(
   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,30})"
);

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
         "Please make sure to have a minimum 8 and maximum 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required("Please enter a password."),
   mobileNumber: yup
      .string()
      .matches(
         phoneRegExp,
         "Please enter a valid phone number. Example: 3059332288"
      )
      .required("Please enter a mobile number."),
   termsOfService: yup
      .boolean()
      .oneOf([true], "You must accept the terms of service to continue.")
      .required("You must accept the terms of service to continue.")
});

//Test values
const testValues = {
   firstName: "Cool",
   lastName: "Name",
   email: "coolemail123@gmail.com",
   password: "CoolPassword123$",
   mobileNumber: "292-332-3392",
   termsOfService: true
};

//Main form component
const SignupForm = props => {
   const { register, handleSubmit, errors, reset } = useForm({
      defaultValues: testValues,
      validationSchema: schema,
      mode: "onBlur"
   });

   const onSubmit = data => {
      console.log("submitting! ", data);
      axios
         .post("https://reqres.in/api/users/", data)
         .then(res => {
            console.log("success", res.data);
            const user = res.data;
            props.addNewSignup(user);
         })
         .catch(err => console.log(err.response));
      reset({});
   };

   return (
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
         <InputDiv>
            <StyledInput
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
            <StyledInput
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
            <StyledInput
               type="text"
               placeholder="Email"
               name="email"
               ref={register}
            />
            {errors.email && <FormWarning>{errors.email.message}</FormWarning>}
         </InputDiv>

         <InputDiv>
            <StyledInput
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
            <StyledInput
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
            <StyledLabel htmlFor="termsOfService">
               I accept the Terms of Service:
               <StyledInput
                  className="checkbox"
                  type="checkbox"
                  placeholder="Terms of Service"
                  name="termsOfService"
                  id="termsOfService"
                  ref={register}
               />
            </StyledLabel>
            {errors.termsOfService && (
               <FormWarning>{errors.termsOfService.message}</FormWarning>
            )}
         </InputDiv>

         <input type="submit" />
      </StyledForm>
   );
};

export default SignupForm;
