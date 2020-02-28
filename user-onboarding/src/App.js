import React, { useState } from "react";
import SignupForm from "./components/SignupForm";

import "./App.css";

const SignupList = ({ signups }) => {};

function App() {
   const [signups, setSignups] = useState([]);
   const addNewSignup = userData => {
      setSignups(signups => [...signups, userData]);
   };
   return (
      <div className="App">
         <SignupForm addNewSignup={addNewSignup} />
      </div>
   );
}

export default App;
