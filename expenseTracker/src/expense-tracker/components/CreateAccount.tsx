
import { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { createAccount } from '../../Services/DataService';
import NavBar from './Navbar';



const CreateAccount = () => {
    let navigate = useNavigate();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e:string) => {
        setUsername(e);
    }
    const handlePassword = (e:string) => {
        setPassword(e);
    }

    const handleSubmit = () => {
        let userData = {
            id: 0,
            username: Username,
            password: Password
        }
        console.log(userData)
        createAccount(userData)
        navigate("/")
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
                        <p className='text-center'>Create Account</p>
                        <Form.Group className='mb-3' controlId='Username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='username' placeholder='Enter Username' onChange={(e) => handleUser(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='Password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' onChange={(e) => handlePassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-primary" onClick={handleSubmit}>
                                Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    
    
    
    </>
  )
}

export default CreateAccount