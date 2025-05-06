import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../dist/css/main.css'; // Pastikan path CSS-nya sesuai

function FooterComponent() {
  return (
    <footer className="footer">
      <Row lg={2} xs={1}>
        <Col>
          <img src="/pevin.svg" alt="PeVIN Logo" className="footer-logo" />
        </Col>
        <Col>
          <div className="footer-column developer">
            <p className="footer-title">Developed By :</p>
            <img src="/MadhanTECH.svg" alt="Madhan Logo" className="footer-logo-dev"/>
          </div>
        </Col>
      </Row>
      <Row lg={2} xs={1}>
        <Col>
          <p className="footer-description">
            Platform Web3 terdesentralisasi yang dirancang untuk memverifikasi keaslian ijazah
            secara digital, transparan, dan aman. Memanfaatkan teknologi blockchain pada
            jaringan Internet Computer, PeVIN memungkinkan institusi pendidikan untuk menerbitkan
            ijazah dengan jaminan validasi yang mumpuni.
          </p>
        </Col>
        <Col className="d-flex justify-content-end flex-column">
          <p className="footer-title text-end">Powered By :</p>
          <div className="footer-powered-logos">
            <img src="/powered-by-group.svg" alt="Logos" className="footer-powered-logos" />
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default FooterComponent;