import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "./components/SignupForm";

import "./App.css";

const SignupList = ({ signups }) => {
   const CardList = styled.div`
      margin: 100px 0;
      border: 2px grey solid;
      min-height: 50px;

      .no-signups {
         color: grey;
      }
   `;

   const Card = styled.div`
      border: 2px solid black;
      background: green;
      color: white;
   `;
   const cards = signups.map(user => {
      return (
         <Card key={Date.now()}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <h3>{user.email}</h3>
            <h3>{user.mobileNumber}</h3>
         </Card>
      );
   });
   return (
      <CardList>
         <h1>Registered Users:</h1>
         {signups.length > 0 ? cards : <h2 className='no-signups'>No signups at the moment.</h2>}
      </CardList>
   );
};

function App() {
   const [signups, setSignups] = useState([]);

   const addNewSignup = userData => {
      setSignups(signups => [...signups, userData]);
   };

   return (
      <div className="App">
         <SignupForm addNewSignup={addNewSignup} />
         <SignupList signups={signups} />
      </div>
   );
}

export default App;
