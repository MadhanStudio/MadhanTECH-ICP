import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table, Button, Nav, Navbar } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

function ProfilePage() {
  const location = useLocation();

  let formData = {};
  try {
    const dataToStore = localStorage.getItem('univProfile');
    formData = dataToStore ? JSON.parse(dataToStore) : {};
  } catch (error) {
    console.error('Data di localStorage.univProfile tidak valid JSON:', error);
    formData = {};
  }

  const [ijazahList, setIjazahList] = useState([]);

  useEffect(() => {
    try {
      const dataToStore2 = localStorage.getItem('universityData');
      const parsedIjazah = dataToStore2 ? JSON.parse(dataToStore2) : [];
      const dataArray = Array.isArray(parsedIjazah) ? parsedIjazah : [parsedIjazah];
      setIjazahList(dataArray);
    } catch (error) {
      console.error('Data di localStorage.universityData tidak valid JSON:', error);
      setIjazahList([]);
    }
  }, []);

  const getTitle = () => {
    if (location.pathname === '/edit-profil') return 'Edit Profil';
    if (location.pathname === '/unggah-ijazah') return 'Unggah Ijazah';
    return 'Dashboard';
  };

  return (
    <Container className="dashboard-container mb-5">
      <Row xs={1} sm={1} md={1} lg={2} className="g-4">
        <Col lg={3}>
          <Navbar expand="lg" className="custom-navbar">
            <Container fluid className="flex-column align-items-start">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <Navbar.Brand href={location.pathname}>{getTitle()}</Navbar.Brand>
                <Navbar.Toggle aria-controls="nav-menu" />
              </div>
              <Navbar.Collapse id="nav-menu" className="w-100">
                <Nav className="flex-column w-100">
                  {location.pathname !== '/profil-universitas' && (
                    <Nav.Link as={Link} to="/profil-universitas">
                      Dashboard
                    </Nav.Link>
                  )}
                  {location.pathname !== '/edit-profil' && (
                    <Nav.Link as={Link} to="/edit-profil">
                      Edit Profil
                    </Nav.Link>
                  )}
                  {location.pathname !== '/unggah-ijazah' && (
                    <Nav.Link as={Link} to="/unggah-ijazah">
                      Unggah Ijazah
                    </Nav.Link>
                  )}
                  {location.pathname !== '/home' && (
                    <Nav.Link as={Link} to="/home">
                      Logout
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col lg={9}>
          <Row>
            <Col>
              <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">
                  Selamat datang di {formData.universityName || '(nama universitas)'}!
                </p>
              </div>

              <Row className="profile-container mt-2">
                <Col lg={4} className="d-flex justify-content-center align-items-center">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Logo Universitas"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    'Tidak ada logo'
                  )}
                </Col>
                <Col lg={8}>
                  <Row>
                    <h4 className="regist-title">{formData.universityName}</h4>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="form-label mt-2">Status</Row>
                      <Row className="profile-text">{formData.status}</Row>
                      <Row className="form-label mt-2">Akun Identity</Row>
                      <Row className="profile-text">{formData.internetIdentity}</Row>
                      <Row className="form-label mt-2">No. SK Pendirian</Row>
                      <Row className="profile-text">{formData.skNumber}</Row>
                      <Row className="form-label mt-2">Nomor Telepon</Row>
                      <Row className="profile-text">{formData.phoneNumber}</Row>
                      <Row className="form-label mt-2">Alamat</Row>
                      <Row className="profile-text">{formData.address}</Row>
                    </Col>
                    <Col>
                      <Row className="form-label mt-2">Akreditasi</Row>
                      <Row className="profile-text">{formData.accreditation}</Row>
                      <Row className="form-label mt-2">Website Resmi</Row>
                      <Row className="profile-text">
                        <a href={formData.website}>{formData.website}</a>
                      </Row>
                      <Row className="form-label mt-2">Tanggal Berdiri</Row>
                      <Row className="profile-text">{formData.establishedDate}</Row>
                      <Row className="form-label mt-2">Fax</Row>
                      <Row className="profile-text">{formData.fax}</Row>
                      <Row className="form-label mt-2">Kode Pos</Row>
                      <Row className="profile-text">{formData.postalCode}</Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Container className="mt-5 mb-5">
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama Mahasiswa</th>
                        <th>Email</th>
                        <th>Telepon</th>
                        <th>Program Studi</th>
                        <th>GPA</th>
                        <th>Tahun Masuk</th>
                        <th>Tahun Lulus</th>
                        <th>Status</th>
                        <th>Ijazah</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ijazahList.length === 0 ? (
                        <tr>
                          <td colSpan="11">Belum ada data ijazah.</td>
                        </tr>
                      ) : (
                        ijazahList
                          .sort((a, b) => b.graduationYear - a.graduationYear) // sort berdasarkan tahun lulus
                          .map((ijazah, index) => (
                            <tr key={ijazah.id}>
                              <td>{index + 1}</td>
                              <td>{ijazah.sarjanaName}</td>
                              <td>{ijazah.email}</td>
                              <td>{ijazah.sarjanaPhoneNum}</td>
                              <td>{ijazah.program}</td>
                              <td>{ijazah.gpa}</td>
                              <td>{ijazah.entryYear}</td>
                              <td>{ijazah.graduationYear}</td>
                              <td>{ijazah.statusValidasi}</td>
                              <td>
                                {ijazah.ijazahFile ? (
                                  <img
                                    src={ijazah.ijazahFile}
                                    alt="Ijazah"
                                    style={{ width: '100px', objectFit: 'contain' }}
                                  />
                                ) : (
                                  'Tidak ada file'
                                )}
                              </td>
                              <td>
                                <Button size="sm">Edit Status</Button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                </Container>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
