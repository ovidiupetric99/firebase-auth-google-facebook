import "./App.css";
import { useState } from "react";

import { signInUser, signOutUser } from "./Firebase";

function App() {
  const [data, setData] = useState(null);

  const handleSignIn = async (event) => {
    const result = await signInUser(event.target.name);
    if (result) {
      setData(result);
    }
  };

  const handleSignOutButton = async () => {
    await signOutUser();
    setData(null);
  };

  return (
    <div className="App">
      <button
        name="google"
        className="login-button google-button"
        onClick={handleSignIn}
      >
        Sign In with Google
      </button>
      <button
        name="facebook"
        className="login-button facebook-button"
        onClick={handleSignIn}
      >
        Sign In with Facebook
      </button>
      {data ? (
        <div>
          <div>
            <h2>Provider: {data.provider}</h2>
            <h2>Display Name: {data.name}</h2>
            <h2>Email: {data.email} </h2>
            <img src={data.profilePicture} alt="" />
          </div>
          <button onClick={handleSignOutButton}>Sign Out</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
