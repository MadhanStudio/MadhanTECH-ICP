import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Table, Button, Nav, Navbar, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

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
      setIjazahList(parsedIjazah);
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

  // ... lanjutkan kode lainnya

  return (
    <Container className="dashboard-container mt-5 mb-5">
      <Row xs={1} sm={1} md={1} lg={2} className="g-4">
        <Col xs={{ order: 'first' }} sm={{ order: 'first' }} md={{ order: 'first' }} lg={3}>
          <Navbar expand="lg" className="bg-body-tertiary">
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
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col xs={{ order: 'last' }} sm={{ order: 'last' }} md={{ order: 'last' }} lg={9}>
          <Row>
            <Col xs={{ order: 'second' }} md={{ order: 'second' }} lg={{ order: 'second' }}>
              <div className="regist-header mt-4">
                <h1 className="regist-title">Dashboard</h1>
                <p className="regist-subtitle">
                  Selamat datang di {formData.universityName || '(nama universitas)'} !
                </p>
              </div>

              <div className="cotainer-form">
                <Row>
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    xs={{ order: 'first' }}
                    sm={{ order: 'first' }}
                    md={{ order: 'first' }}
                    lg={4}
                  >
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
                  <Col xs={{ order: 'last' }} sm={{ order: 'last' }} md={{ order: 'last' }} lg={8}>
                    <div className="regist-header">
                      <Row className="regist-title">{formData.universityName}</Row>
                    </div>

                    <Row>
                      <Col>
                        <Row className="form-label">Internet Identitiy Number</Row>
                        <Row>{formData.internetIdentity}</Row>
                        <Row className="form-label">Status</Row>
                        <Row>{formData.status}</Row>
                        <Row className="form-label">No. SK Pendirian</Row>
                        <Row>{formData.skNumber}</Row>
                        <Row className="form-label">Website Resmi</Row>
                        <Row>
                          <a href={formData.website}>{formData.website}</a>
                        </Row>
                      </Col>
                      <Col>
                        <Row className="form-label">Akreditasi</Row>
                        <Row>{formData.accreditation}</Row>
                        <Row className="form-label">Tanggal Berdiri</Row>
                        <Row>{formData.establishedDate}</Row>
                        <Row className="form-label">Alamat</Row>
                        <Row>
                          {formData.city}, {formData.province}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Container className="dashboard-container mt-5 mb-5">
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Mahasiswa</th>
                          <th>Tahun Masuk</th>
                          <th>Tahun Lulus</th>
                          <th>Program Studi</th>
                          <th>Gelar</th>
                          <th>GPA</th>
                          <th>Tanggal Terbit</th>
                          <th>Nomor Ijazah</th>
                          <th>Status</th>
                          <th>File</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ijazahList.length === 0 ? (
                          <tr>
                            <td colSpan="12">Belum ada data ijazah.</td>
                          </tr>
                        ) : (
                          ijazahList.map((ijazah, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{ijazah.mahasiswaName}</td>
                              <td>{ijazah.entryYear}</td>
                              <td>{ijazah.graduationYear}</td>
                              <td>{ijazah.program}</td>
                              <td>{ijazah.degree}</td>
                              <td>{ijazah.gpa}</td>
                              <td>{ijazah.establishedDate}</td>
                              <td>{ijazah.ijazahNumber}</td>
                              <td>{ijazah.statusValidasi}</td>
                              <td>
                                {ijazah.ijazahFile ? (
                                  <img
                                    src={ijazah.ijazahFile}
                                    alt="File Ijazah"
                                    style={{
                                      width: '100%',
                                      height: 'auto',
                                      maxHeight: '200px',
                                      objectFit: 'contain',
                                    }}
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
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
