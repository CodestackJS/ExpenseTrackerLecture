import { Link, useNavigate } from "react-router-dom"
import { Nav, Navbar, Container, NavbarCollapse  } from "react-bootstrap";

interface NavProps {
    isLoggedIn: boolean,
    handleLogout: () => void
}

const NavBar = ({isLoggedIn, handleLogout}:NavProps) => {
    let navigate = useNavigate();
  return (
    <>
    <Navbar variant="dark" >
    <Container>

<Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/ExpenseList'}>Expenses</Nav.Link>
                  <Nav.Link as={Link} to={'/CreateAccount'}>Create Account</Nav.Link>
              </Nav>
              <Nav className="welcome">
                {isLoggedIn ? 
                    <Nav.Link as={Link} to={'/'} onClick={handleLogout}>Logout</Nav.Link>:
                    <Nav.Link as ={Link} to={'/'} >Log In</Nav.Link>
                }
              </Nav>
              
          </Navbar.Collapse>
</Container>
    </Navbar>
        
    </>
    
  )
}

export default NavBar