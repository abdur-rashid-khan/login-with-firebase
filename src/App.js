import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [user , setUser ] =useState({})

  const signIn = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      setUser(user)
    }).catch((error) => {
      console.log('error : ' , error)
    });
    }

    const signInWithGitHub =()=>{
      const gitProvider = new GithubAuthProvider();
      const gitAuth = getAuth(app);
      signInWithPopup(gitAuth,gitProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
      }).catch(error => {
        console.error(error);
      })
    }
    // logout
    const logout = () =>{
      setUser({})
    }
  return (
    <div className="App">
      <img src={user.photoURL} alt="" />
      {
        console.log(user)
      }
        <p>{user.displayName}</p>
      {
          user.displayName ?<button onClick={logout}>logout</button>:
        <>
          <button onClick={signIn}>login</button>
          <button onClick={signInWithGitHub}>login with github</button>
        </>
      }
    </div>
  );
}

export default App;
