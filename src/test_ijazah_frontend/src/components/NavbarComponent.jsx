import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InternetIdentityButton from "./InternetIdentityButton";

const NavbarComponent = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        if (location.pathname === "/") {
          setShowNavbar(false);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLoginChange = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      {showNavbar && (
        <Navbar
          expand="lg"
          className="shadow-sm"
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "#ffffff",
            zIndex: 1000,
            transition: "top 0.3s ease-in-out",
            borderBottom: "2px solid #eeeeee"
          }}
        >
          <Container>
            <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
              <img
                src="/nav-pic.svg"
                alt="Logo"
                style={{ width: "120px", height: "auto" }}
                className="me-2"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" style={{ fontWeight: "500", gap: "1rem" }}>
                <Nav.Link
                  as={Link}
                  to="/home"
                  className={location.pathname === "/home" ? "text-primary" : "text-dark"}
                >
                  Home
                </Nav.Link>

                {isLoggedIn && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/profil-universitas"
                      className={location.pathname === "/profil-universitas" ? "text-primary" : "text-dark"}
                    >
                      Profil
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/unggah-ijazah"
                      className={location.pathname === "/unggah-ijazah" ? "text-primary" : "text-dark"}
                    >
                      Form Ijazah
                    </Nav.Link>
                  </>
                )}

                <Nav.Link
                  as={Link}
                  to="/cari-ijazah"
                  className={location.pathname === "/cari-ijazah" ? "text-primary" : "text-dark"}
                >
                  Cari Ijazah
                </Nav.Link>
              </Nav>

              <Nav className="ms-3">
                <InternetIdentityButton onLoginChange={handleLoginChange} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavbarComponent;
