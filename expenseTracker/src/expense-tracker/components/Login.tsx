import { useState } from "react"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";




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
      Username: Username,
      Password: Password
    }

    let token = await login(userData)
    console.log(token.token, "This should log the token");
    if(token.token != null)
    {
      localStorage.setItem("Token", token.token);
      await GetLoggedInUser(Username);
      navigate('/ExpenseList')
    }





  }


  return (
    <>
      
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

                <Button variant="outline-primary">
                  Login
                </Button>
                <p className="mt-3">Don't have an account?</p>
                <Button variant="outline-primary">
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