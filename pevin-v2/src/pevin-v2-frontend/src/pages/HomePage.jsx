// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import React from 'react';
import '../dist/css/main.css'; 


function HomePage() {
  return (
    <div className="home-container " style={{ paddingTop: '200px', minHeight: '100vh' }}>
      <div className="logo-section">
        <img src="/nav-pic.svg" alt="Logo" className="logo" style={{ width: '400px', height: 'auto' }}/>
        <h2 className="web-name typing-text" style={{ marginTop: '20px', color: '#333' }}>
          Pusat Validasi Ijazah Nasional
        </h2>
        <p className="description">
          Platform Web3 terdesentralisasi yang dirancang untuk memverifikasi keaslian ijazah secara digital, transparan, dan aman. Dengan memanfaatkan teknologi blockchain pada jaringan Internet Computer, PeVIN memungkinkan institusi pendidikan untuk menerbitkan ijazah yang tervalidasi, serta memudahkan pihak ketiga, seperti perusahaan dan sekolah lanjutan, untuk memverifikasi data ijazah.
        </p>
        <button className="cta-button">Learn More</button>
      </div>

      <div className="affiliation-section ">
        <h3 className="section-title">Terasisiasi dengan Ribuan Perguruan Tinggi di Indonesia</h3>
        <div className="logo-slider">
          <div className="logo-track">
            {/* logo kampus */}
            <div className="logo-frame"><img src="/UM.png" alt="UM" /></div>
            <div className="logo-frame"><img src="/ub.jpg" alt="UB" /></div>
            <div className="logo-frame"><img src="/polinema.png" alt="POLINEMA" /></div>
            <div className="logo-frame"><img src="/uny.png" alt="UNY" /></div>
            <div className="logo-frame"><img src="/ugm.png" alt="UGM" /></div>
            <div className="logo-frame"><img src="/its.png" alt="ITS" /></div>
            {/* Duplikasi */}
            <div className="logo-frame"><img src="/UM.png" alt="UM" /></div>
            <div className="logo-frame"><img src="/ub.jpg" alt="UB" /></div>
            <div className="logo-frame"><img src="/polinema.png" alt="POLINEMA" /></div>
            <div className="logo-frame"><img src="/uny.png" alt="UNY" /></div>
            <div className="logo-frame"><img src="/ugm.png" alt="UGM" /></div>
            <div className="logo-frame"><img src="/its.png" alt="ITS" /></div>
          </div>
        </div>
      </div>



    </div>
    
  );
}

export default HomePage;