import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">
          <img
            src="/nav-pic.svg"
            style={{ width: '10vm', height: 'auto' }}
            className="justify-content-start mt-3 mb-2"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end mt-3 mb-2">
          <Navbar.Text>
            <a href="/login">login</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
