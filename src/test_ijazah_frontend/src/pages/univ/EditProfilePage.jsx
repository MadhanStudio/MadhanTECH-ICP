import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table, Form, Button, Nav, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    universityName: '',
    internetIdentity: '',
    status: '',
    accreditation: '',
    establishedDate: '',
    skNumber: '',
    website: '',
    phoneNumber: '',
    fax: '',
    address: '',
    postalCode: '',
    logo: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('univProfile');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.universityName.trim()) {
      newErrors.universityName = 'Nama universitas wajib diisi';
    }

    if (!formData.internetIdentity.trim()) {
      newErrors.internetIdentity = 'Internet Identity wajib diisi';
    }

    if (!formData.establishedDate) {
      newErrors.establishedDate = 'Tanggal berdiri wajib diisi';
    }

    if (!formData.skNumber.trim()) {
      newErrors.skNumber = 'Nomor SK wajib diisi';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website resmi wajib diisi';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat lengkap wajib diisi';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telpon resmi wajib diisi';
    }

    if (!formData.fax.trim()) {
      newErrors.fax = 'Fax resmi wajib diisi';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Kode pos wajib diisi';
    }

    if (!formData.logo) {
      newErrors.logo = 'Logo universitas wajib diunggah';
    }
    return newErrors;
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('univProfile', JSON.stringify(formData));
      alert('Data berhasil diperbarui!');
    }
    navigate('/profil-universitas');
  };

  const handleCancel = () => {
    navigate('/profil-universitas');
  };

  const getTitle = () => {
    if (location.pathname === '/edit-profil') return 'Edit Profil';
    if (location.pathname === '/unggah-ijazah') return 'Unggah Ijazah';
    return 'Dashboard';
  };

  return (
    <Container className="dashboard-container mb-5">
      <Row xs={1} sm={1} md={1} lg={2} className="g-4">
        <Col xs={{ order: 'first' }} sm={{ order: 'first' }} md={{ order: 'first' }} lg={3}>
        </Col>
        <Col lg={9}>
          <Row>
            <Col xs={{ order: 'second' }} md={{ order: 'second' }} lg={{ order: 'second' }}>
              <div className="regist-header mt-4">
                <h1 className="regist-title">Edit Profil Perguruan Tinggi</h1>
                <p className="regist-subtitle">
                  Ubah data profil Perguruan Tinggi pada formulir berikut
                </p>
              </div>

              <div className="cotainer-form">
                <Form onSubmit={handleSubmit} className="edit-form">
                  <Table responsive="xs" className="regist-table">
                    <tr>
                      <td colSpan={2}>
                        <Form.Group controlId="universityName">
                          <Form.Label>Nama Perguruan Tinggi</Form.Label>
                          <Form.Control
                            type="text"
                            name="universityName"
                            value={formData.universityName}
                            onChange={handleChange}
                            isInvalid={!!errors.universityName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.universityName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Group controlId="internetIdentity">
                          <Form.Label>Internet Identity</Form.Label>
                          <Form.Control
                            type="text"
                            name="internetIdentity"
                            value={formData.internetIdentity}
                            onChange={handleChange}
                            isInvalid={!!errors.internetIdentity}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.internetIdentity}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group controlId="status">
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option>Aktif</option>
                            <option>Tidak Aktif</option>
                          </Form.Select>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Group controlId="accreditation">
                          <Form.Label>Akreditasi</Form.Label>
                          <Form.Select
                            name="accreditation"
                            value={formData.accreditation}
                            onChange={handleChange}
                          >
                            <option>Unggul</option>
                            <option>Sangat Baik</option>
                            <option>Baik</option>
                            <option>Tidak Terakreditasi</option>
                          </Form.Select>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group controlId="establishedDate">
                          <Form.Label>Tanggal Berdiri</Form.Label>
                          <Form.Control
                            type="date"
                            name="establishedDate"
                            value={formData.establishedDate}
                            onChange={handleChange}
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
                        <Form.Group controlId="skNumber">
                          <Form.Label>No. SK Pendirian</Form.Label>
                          <Form.Control
                            type="text"
                            name="skNumber"
                            value={formData.skNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.skNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.skNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Form.Group controlId="website">
                          <Form.Label>Website Resmi</Form.Label>
                          <Form.Control
                            className="placeholder-text"
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="contoh: https://link-website.com"
                            isInvalid={!!errors.website}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.website}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Group controlId="phoneNumber">
                          <Form.Label>Nomor Telpon</Form.Label>
                          <Form.Control
                            className="placeholder-text"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.phoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group controlId="fax">
                          <Form.Label>Fax</Form.Label>
                          <Form.Control
                            className="placeholder-text"
                            type="text"
                            name="fax"
                            value={formData.fax}
                            onChange={handleChange}
                            isInvalid={!!errors.fax}
                          />
                          <Form.Control.Feedback type="invalid">{errors.fax}</Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Form.Group controlId="address">
                          <Form.Label>Alamat Lengkap</Form.Label>
                          <Form.Control
                            className="placeholder-text"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            isInvalid={!!errors.address}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.address}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Form.Group controlId="postalCode">
                          <Form.Label>Kode Pos</Form.Label>
                          <Form.Control
                            className="placeholder-text"
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Masukkan Kode Pos sesuai dengan alamat"
                            isInvalid={!!errors.postalCode}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.postalCode}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Form.Group controlId="logo">
                          <Form.Label>Logo Universitas (PNG/JPG)</Form.Label>
                          <Form.Control
                            type="file"
                            name="logo"
                            accept="image/png, image/jpeg"
                            onChange={handleChange}
                            isInvalid={!!errors.logo}
                          />
                          {formData.logo && (
                            <div className="mt-2">
                              <img
                                src={formData.logo}
                                alt="Preview Logo"
                                style={{ maxWidth: '150px', maxHeight: '150px' }}
                              />
                            </div>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {errors.logo}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="d-flex justify-content-end">
                          <Button type="submit" variant="dark" className="w-100 py-2">
                            Update
                          </Button>
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                          <Button
                            variant="outline-dark"
                            onClick={handleCancel}
                            className="w-100 py-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </tr>
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

export default EditProfilePage;
