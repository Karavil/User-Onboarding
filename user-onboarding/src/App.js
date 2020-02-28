import React, { useState } from "react";
import SignupForm from "./components/SignupForm";

import "./App.css";

const SignupList = ({ signups }) => {
   const cards = signups.map(user => {
      return (<div className="card" key={Date.now()}>
         <h1>
            {`${user.firstName} ${user.lastName}`}
         </h1>
         <h2>{user.email}</h2>
         <h2>{user.mobileNumber}</h2>
      </div>)
   })
   return (
      <div className="cardList">{cards}</div>
   )
};

function App() {
   const [signups, setSignups] = useState([]);

   const addNewSignup = userData => {
      setSignups(signups => [...signups, userData]);
   };

   return (
      <div className="App">
         <SignupForm addNewSignup={addNewSignup} />
         <SignupList signups={signups}/>
      </div>
   );
}

export default App;
