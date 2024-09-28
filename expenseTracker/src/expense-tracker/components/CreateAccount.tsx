
import { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";



const CreateAccount = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e:string) => {
        setUsername(e);
    }

     

  return (
    <>
        <Container>
            <Row>
                <Col className="form-container d-flex justify-content-center">
                    <Form>
                        <p className='text-center'>Create Account</p>
                        <Form.Group className='mb-3' controlId='Username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='username' placeholder='Enter Username' onChange={(e) => handleUser(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='Username'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' onChange={(e) => handleUser(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-primary">
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