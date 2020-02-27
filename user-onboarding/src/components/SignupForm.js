import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const StyledForm = styled.form`
   width: 100%;

   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 300px;

   font-size: 1.2rem;
`;

const StyledTextInput = styled.input`
   font-size: 1em;
`;

const SignupForm = props => {
   const { register, handleSubmit, errors } = useForm();
   const onSubmit = data => console.log(data);
   console.log(errors);

   return (
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
         <StyledTextInput
            type="text"
            placeholder="First name"
            name="First name"
            ref={register({ required: true, maxLength: 80 })}
         />
         <StyledTextInput
            type="text"
            placeholder="Last name"
            name="Last name"
            ref={register({ required: true, maxLength: 100 })}
         />
         <StyledTextInput
            type="text"
            placeholder="Email"
            name="Email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
         />
         <StyledTextInput
            type="text"
            placeholder="Password"
            name="Password"
            ref={register}
         />
         <StyledTextInput
            type="tel"
            placeholder="Mobile number"
            name="Mobile number"
            ref={register({ required: true, minLength: 6, maxLength: 12 })}
         />
         <StyledTextInput
            type="checkbox"
            placeholder="Terms of Service"
            name="Terms of Service"
            ref={register}
         />

         <StyledTextInput type="submit" />
      </StyledForm>
   );
};

export default SignupForm;
