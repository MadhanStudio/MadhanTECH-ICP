// src/components/Navbar.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'; // Jika nanti ingin tambah link

const NavbarComponent = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        if (location.pathname === '/') {
          setShowNavbar(false);
        }
      }
    };

    handleScroll(); // cek posisi awal scroll

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (


    <>
      {showNavbar && (
        <Navbar
          className="bg-body-tertiary"
          expand="lg"
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1000,
            transition: 'top 0.3s ease-in-out',
          }}
        >
          <Container>
            <Navbar.Brand href="/home">
              <img
                src="/nav-pic.svg"
                style={{ width: '27vmin', height: 'auto' }}
                className="justify-content-start mt-3 mb-3"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavbarComponent;
