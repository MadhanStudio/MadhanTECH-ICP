import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table, Form, Button, Nav, Navbar, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function FormIjazahPage() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: uuidv4(),
    mahasiswaName: '',
    entryYear: '',
    graduationYear: '',
    gpa: '',
    establishedDate: '',
    ijazahNumber: '',
    program: '',
    degree: '',
    ijazahFile: null,
    agree: false,
    statusValidasi: 'Valid',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.mahasiswaName.trim())) {
      newErrors.mahasiswaName = 'Nama Mahasiswa hanya boleh berisi huruf';
    }

    if (!formData.entryYear) {
      newErrors.entryYear = 'Tahun masuk wajib dipilih';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Tahun kelulusan wajib dipilih';
    }

    if (parseFloat(formData.gpa) > 4.0 || parseFloat(formData.gpa) < 0.0) {
      newErrors.gpa = 'GPA harus di antara 0.00 - 4.00';
    }

    if (!formData.establishedDate) {
      newErrors.establishedDate = 'Tanggal terbit wajib diisi';
    } else {
      const selectedYear = new Date(formData.establishedDate).getFullYear();
      if (selectedYear !== currentYear) {
        newErrors.establishedDate = `Tanggal harus dari tahun ${currentYear}`;
      }
    }

    if (!formData.ijazahNumber.trim()) {
      newErrors.ijazahNumber = 'Nomor Ijazah wajib diisi';
    }

    if (!/^[A-Za-z0-9\s]+$/.test(formData.program.trim())) {
      newErrors.program = 'Program studi hanya boleh berisi huruf dan angka';
    }

    if (!/^[A-Za-z0-9\s.,-]*$/.test(formData.degree.trim())) {
      newErrors.degree = 'Gelar hanya boleh berisi huruf, angka, atau tanda baca';
    }

    if (!formData.ijazahFile) {
      newErrors.ijazahFile = 'File ijazah wajib diunggah';
    }

    if (!formData.agree) {
      newErrors.agree = 'Anda harus menyetujui syarat & ketentuan';
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
      mahasiswaName: '',
      entryYear: '',
      graduationYear: '',
      gpa: '',
      establishedDate: '',
      ijazahNumber: '',
      program: '',
      degree: '',
      ijazahFile: null,
      agree: false,
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
        <Col xs={{ order: 'last' }} sm={{ order: 'last' }} md={{ order: 'last' }} lg={9}>
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
                          <Form.Group controlId="mahasiswaName">
                            <Form.Label>Nama Mahasiswa</Form.Label>
                            <Form.Control
                              className="placeholder-text"
                              type="text"
                              name="mahasiswaName"
                              value={formData.mahasiswaName}
                              onChange={handleChange}
                              isInvalid={!!errors.mahasiswaName}
                              placeholder="Masukkan nama mahasiswa di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.mahasiswaName}
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
                            <Form.Label>GPA(IPK)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              max="4"
                              name="gpa"
                              value={formData.gpa}
                              onChange={handleChange}
                              isInvalid={!!errors.gpa}
                              placeholder="Masukkan IPK mahasiswa di sini"
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.gpa}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group controlId="establishedDate">
                            <Form.Label>Tanggal Terbit</Form.Label>
                            <Form.Control
                              type="date"
                              name="establishedDate"
                              value={formData.establishedDate}
                              onChange={handleChange}
                              min={minDate}
                              max={maxDate}
                              isInvalid={!!errors.establishedDate}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.establishedDate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="ijazahNumber">
                            <Form.Label>Nomor Ijazah</Form.Label>
                            <Form.Control
                              type="text"
                              name="ijazahNumber"
                              value={formData.ijazahNumber}
                              onChange={handleChange}
                              isInvalid={!!errors.ijazahNumber}
                              placeholder="Masukkan nomor ijazah di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.ijazahNumber}
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
                        <td colSpan={2}>
                          <Form.Group controlId="degree">
                            <Form.Label>Gelar</Form.Label>
                            <Form.Control
                              type="text"
                              name="degree"
                              value={formData.degree}
                              onChange={handleChange}
                              isInvalid={!!errors.degree}
                              placeholder="Masukkan gelar, contoh: S.Pd"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.degree}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
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
                          <Form.Group controlId="agree" className="mt-3">
                            <Form.Check
                              type="checkbox"
                              name="agree"
                              label="Saya telah membaca dan menyetujui syarat dan ketentuan yang berlaku"
                              checked={formData.agree}
                              onChange={handleChange}
                              isInvalid={!!errors.agree}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.agree}
                            </Form.Control.Feedback>
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
