import React, { useState } from 'react';
import { Container, Col, Row, Table, Form, Button, Nav, Navbar, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function FormIjazahPage() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    sarjanaName: '',
    ttl: '',
    email: '',
    dosenPA: '',
    sarjanaPhoneNum: '',
    program: '',
    entryYear: '',
    graduationYear: '',
    gpa: '',
    ijazahFile: null,
    statusValidasi: 'Valid',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const validate = () => {
    const newErrors = {};

    if (!formData.sarjanaName.trim()) {
      newErrors.sarjanaName = 'Nama sarjana wajib di isi';
    }

    if (!formData.ttl.trim()) {
      newErrors.ttl = 'Tempat tanggal lahir masuk wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    }

    if (!formData.dosenPA.trim()) {
      newErrors.dosenPA = 'Wajib menyantumkan Dosen Pembimbing Akademik';
    }

    if (!formData.sarjanaPhoneNum.trim()) {
      newErrors.sarjanaPhoneNum = 'Wajib menyantumkan nomor telpon pemilik ijazah';
    }

    if (!formData.program.trim()) {
      newErrors.program = 'Wajib menyertakan program studi pemilik ijazah';
    }

    if (!formData.entryYear.trim()) {
      newErrors.entryYear = 'Tahun masuk wajib dipilih';
    }

    if (!formData.graduationYear.trim()) {
      newErrors.graduationYear = 'Tahun kelulusan wajib dipilih';
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = 'GPA wajib diisi';
    } else if (isNaN(parseFloat(formData.gpa))) {
      newErrors.gpa = 'GPA harus berupa angka';
    } else if (parseFloat(formData.gpa) > 4.0 || parseFloat(formData.gpa) < 0.0) {
      newErrors.gpa = 'GPA harus di antara 0.00 - 4.00';
    }

    if (!formData.ijazahFile) {
      newErrors.ijazahFile = 'File ijazah wajib diunggah';
    }

    return newErrors;
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let dataToStore2 = { ...formData };

    if (formData.ijazahFile instanceof File) {
      // convert ijazahFile file to base64 string
      dataToStore2.ijazahFile = await convertFileToBase64(formData.ijazahFile);
    }

    localStorage.setItem('universityData', JSON.stringify(dataToStore2));
    navigate('/profil-universitas');
  };

  const [resetKey, setResetKey] = useState(Date.now());

  const handleCancel = () => {
    setFormData({
      sarjanaName: '',
      ttl: '',
      email: '',
      dosenPA: '',
      sarjanaPhoneNum: '',
      program: '',
      entryYear: '',
      graduationYear: '',
      gpa: '',
      ijazahFile: null,
      statusValidasi: 'Valid',
    });
    setResetKey(Date.now());
  };

  const getTitle = () => {
    if (location.pathname === '/edit-profil') return 'Edit Profil';
    if (location.pathname === '/unggah-ijazah') return 'Unggah Ijazah';
    return 'Dashboard';
  };

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
        <Col lg={9}>
          <Row>
            <Col xs={{ order: 'second' }} md={{ order: 'second' }} lg={{ order: 'second' }}>
              <div className="regist-header mt-4">
                <h1 className="regist-title">Formulir Unggah Data Ijazah</h1>
                <p className="regist-subtitle">
                  Pastikan data yang telah sesuai dengan data yang tertera pada ijazah asli.
                </p>
              </div>

              <div className="cotainer-form">
                <Form onSubmit={handleSubmit} className="edit-form">
                  <Table responsive="xs" className="regist-table">
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="sarjanaName">
                            <Form.Label>Nama Sarjana</Form.Label>
                            <Form.Control
                              className="placeholder-text"
                              type="text"
                              name="sarjanaName"
                              value={formData.sarjanaName}
                              onChange={handleChange}
                              isInvalid={!!errors.sarjanaName}
                              placeholder="Masukkan nama pemilik ijazah di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.sarjanaName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="ttl">
                            <Form.Label>Tempat Tanggal Lahir</Form.Label>
                            <Form.Control
                              type="text"
                              name="ttl"
                              value={formData.ttl}
                              onChange={handleChange}
                              isInvalid={!!errors.ttl}
                              placeholder="Masukkan tempat, tanggal lahir"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.ttl}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                              placeholder="Masukkan email, contoh: sarjana@gmail.com"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="dosenPA">
                            <Form.Label>Dosen Pendamping Akademik</Form.Label>
                            <Form.Control
                              type="text"
                              name="dosenPA"
                              value={formData.dosenPA}
                              onChange={handleChange}
                              isInvalid={!!errors.dosenPA}
                              placeholder="Masukkan nama Dosen Pembimbing Akademik"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.dosenPA}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="sarjanaPhoneNum">
                            <Form.Label>Nomor Telpon</Form.Label>
                            <Form.Control
                              type="text"
                              name="sarjanaPhoneNum"
                              value={formData.sarjanaPhoneNum}
                              onChange={handleChange}
                              isInvalid={!!errors.sarjanaPhoneNum}
                              placeholder="Masukkan nomor telpon, contoh: +62 XXX-XXXXX"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.sarjanaPhoneNum}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="program">
                            <Form.Label>Program Studi</Form.Label>
                            <Form.Control
                              type="text"
                              name="program"
                              value={formData.program}
                              onChange={handleChange}
                              isInvalid={!!errors.program}
                              placeholder="Masukkan program studi di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.program}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Group controlId="entryYear">
                            <Form.Label>Tahun Masuk</Form.Label>
                            <Form.Select
                              name="entryYear"
                              value={formData.entryYear}
                              onChange={handleChange}
                              isInvalid={!!errors.entryYear}
                            >
                              <option value="">Pilih tahun</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.entryYear}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group controlId="graduationYear">
                            <Form.Label>Tahun Kelulusan</Form.Label>
                            <Form.Select
                              name="graduationYear"
                              value={formData.graduationYear}
                              onChange={handleChange}
                              isInvalid={!!errors.graduationYear}
                            >
                              <option value="">Pilih tahun</option>
                              <option value={currentYear}>{currentYear}</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.graduationYear}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Group controlId="gpa">
                            <Form.Label>GPA/IPK</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              max="4"
                              name="gpa"
                              value={formData.gpa}
                              onChange={handleChange}
                              isInvalid={!!errors.gpa}
                              placeholder="0.00-4.00"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.gpa}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group controlId="ijazahFile">
                            <Form.Label>Unggah File Ijazah (PDF)</Form.Label>
                            <Form.Control
                              type="file"
                              name="ijazahFile"
                              accept="image/png, image/jpeg, image/jpg, application/pdf"
                              onChange={handleChange}
                              isInvalid={!!errors.ijazahFile}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.ijazahFile}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group className="mt-3">
                            <i>*Data ijazah yang diunggah tidak dapat diubah di kemudian hari</i>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <Button variant="dark" type="submit" className="w-100 py-2">
                              Upload
                            </Button>
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              key={resetKey}
                              variant="outline-dark"
                              type="button"
                              onClick={handleCancel}
                              className="w-100 py-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FormIjazahPage;
