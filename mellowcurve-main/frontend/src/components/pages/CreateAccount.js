import {React, Component} from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/scss/bootstrap.scss'
import './Home.scss'

class CreateAccount extends Component {
  
    state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };

    handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
  
    componentDidMount () {      
     }

    handleCreateAccountSubmit = async (event) => {
      event.preventDefault();
      const { username, password, confirmPassword} = this.state;
      if (!username || !password || !confirmPassword) {
        this.setState({
          errorMessage: "Please fill out all fields.",
        });
        return;
      }
      if (password !== confirmPassword) {
        this.setState({
          errorMessage: "Passwords must match.",
        });
        return;
      }
      if (password.length < 8) {
        this.setState({
          errorMessage: "Password must be longer than 8 characters.",
        });
        return;
      }
      // try to create user
      const response = await fetch('http://localhost:8000/create-user/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log('User created successfully');
        // Automatically log in the user after creating an account
        const loginResponse = await fetch('http://localhost:8000/accounts/login/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok && loginData.success) {
          console.log('User logged in successfully');
          // Redirect to home page
          window.location.href = '/home';
        } else {
          console.log('Login failed');
        }
      } else {
        console.log('Account creation failed');
        this.setState({
          errorMessage: data.message,
        });
      }
    };
    
  render() {
    const { username, password, confirmPassword, errorMessage } = this.state;
    return (
      <Container className="home-container">
        <Row className='justify-content-center'>
        <Col md={6} className='form-container'>
        <h3>Create Your MellowCurve Account:</h3>
        <form onSubmit={this.handleCreateAccountSubmit}>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleInputChange}
          />
          <br />
          <input
              className="form-input"
              type="password"
              name="password"
              placeholder='Create password (min. 8 characters)'
              value={password}
              onChange={this.handleInputChange}
            />
          <br />
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={this.handleInputChange}
          />
          <br />
          <button className="form-submit" onClick={this.handleCreateAccountSubmit}>
            Create Account
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Col>
        </Row>
      </Container>
    );
  }

}

export default CreateAccount;
