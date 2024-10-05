import { useState } from "react"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { GetLoggedInUser, login } from "../../Services/DataService";
import NavBar from "./Navbar";




const Login = () => {

  let navigate = useNavigate();

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleUsername = (e: string) => {
    setUsername(e);
  }

  const handlePassword = (e: string) => {
    setPassword(e);
  }

  const handleSubmit = async () => {
    let userData = {
      id: 0,
      username: Username,
      password: Password
    }

    let token = await login(userData)
    console.log(token, "This should log the token");
    if(token != null)
    {
      localStorage.setItem("Token", token);
      await GetLoggedInUser(Username);
      navigate('/ExpenseList')
    }
    return userData;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
      
      }


  return (
    <>
                <NavBar handleLogout={handleLogout} isLoggedIn={isLoggedIn}/>

      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form>
              <p className="text-center">Login</p>
                <Form.Group className="mb-3" controlId="Username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" onChange= {(e) => handleUsername(e.target.value)}/>
                  </Form.Group>

                <Form.Group className="mb-3" controlId="Username">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter Password" onChange={(e) => handlePassword(e.target.value)}/>
                </Form.Group>

                <Button variant="outline-primary" onClick={handleSubmit}>
                  Login
                </Button>
                <p className="mt-3">Don't have an account?</p>
                <Button variant="outline-primary" onClick={() => navigate('/CreateAccount')}>
                  Create Account
                </Button>


            </Form>
          </Col>
        </Row>
      </Container>
    
    
    
    
    
    </>
  )
}

export default Login