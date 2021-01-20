import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
  });
  initializeLoginFramework()
  //use context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  //login page
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //login page end

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })
  }
  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
      })
  }
  
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      isFieldValid =
        event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
       createUserWithEmailAndPassword(user.name, user.email, user.password)
       .then(res => {
           setUser(res);
           setLoggedInUser(res);
           history.replace(from);
       })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button>Sign in using fb</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "signUp" : "signIn"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
