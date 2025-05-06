import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../dist/css/main.css'; // Pastikan path CSS-nya sesuai


function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kolom Kiri - Tentang PeVIN */}
        <div className="footer-column">
          <img
            src="/pevin.svg"
            alt="PeVIN Logo"
            className="footer-logo"
          />
          <p className="footer-description">
            Platform Web3 terdesentralisasi yang dirancang untuk memverifikasi keaslian ijazah secara digital,
            transparan, dan aman. Dengan memanfaatkan teknologi blockchain pada jaringan Internet Computer,
            PeVIN memungkinkan institusi pendidikan untuk menerbitkan ijazah yang tervalidasi, serta memudahkan
            pihak ketiga, seperti perusahaan dan sekolah lanjutan, untuk memverifikasi data ijazah.
          </p>
        </div>

        {/* Kolom Kanan - Developer dan Powered By */}
        <div className="footer-column-right">
          {/* Kolom Developer */}
          <div className="footer-column developer">
            <p className="footer-title">Developed By :</p>
            <img
              src="/MadhanTECH.svg"
              alt="Madhan Logo"
              className="footer-logo-dev"
            />
          </div>

          {/* Kolom Powered By */}
          <div className="footer-column powered-by">
            <p className="footer-title">Powered By :</p>
            <div className="footer-powered-logos">
              <img src="/react.svg" alt="React" />
              <img src="/motoco-icon 1.png" alt="Motoko" />
              <img src="/icp.svg" alt="Internet Computer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;