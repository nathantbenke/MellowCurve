import React, { useState } from 'react';
import "./Login.scss"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username === "wireman"){
      window.location.href = '/Home';
    }

    const response = await fetch('http://localhost:8000/accounts/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok && data.success) { // TODO: Remove the wireman check, I just didnt have access to the sql stuff
      console.log('User logged in successfully');
      // Redirect to home page
      window.location.href = '/home';
    } else {
      console.log('Login failed');
      setErrorMessage('Incorrect username or password.');
    }
  };
  
  const handleCreateAccountSubmit = async (event) => {
    window.location.href = "/createaccount";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text">
          Username:
          <input className="form-input" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label className="text">
          Password:
          <input className="form-input" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="form-submit" type="submit">Log In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <br />
      <p className="text">Don't have an account?</p>
      <button className="form-submit" onClick={handleCreateAccountSubmit}>Create one here</button>
    </div>
  );
}

export default Login;
