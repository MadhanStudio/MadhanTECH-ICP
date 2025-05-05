import React, { useState } from 'react';
import { Container, Col, Row, Table, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RegistPage() {
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

    let dataToStore = { ...formData };

    if (formData.logo instanceof File) {
      // convert logo file to base64 string
      dataToStore.logo = await convertFileToBase64(formData.logo);
    }

    localStorage.setItem('univProfile', JSON.stringify(dataToStore));
    navigate('/profil-universitas');
  };

  return (
    <Container className="regist-background">
      <Row xs={1} md={1} lg={2} className="g-4">
        <Col xs={{ order: 'second' }} md={{ order: 'second' }} lg={{ order: 'first' }}>
          <div className="regist-header mt-4">
            <h1 className="regist-title">Registrasi Perguruan Tinggi</h1>
            <p className="regist-subtitle">Selamat datang di laman pendaftaran Perguruan Tinggi</p>
          </div>

          <div className="cotainer-form">
            <Form onSubmit={handleSubmit} className="regist-form">
              <Table responsive="xs" className="regist-table">
                <tr>
                  <td colSpan={2}>
                    <Form.Group controlId="universityName">
                      <Form.Label>Nama Perguruan Tinggi</Form.Label>
                      <Form.Control
                        className="placeholder-text"
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleChange}
                        placeholder="Masukkan nama perguruan tinggi"
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
                      <Form.Label>Akun Identity</Form.Label>
                      <Form.Control
                        className="placeholder-text"
                        type="text"
                        name="internetIdentity"
                        value={formData.internetIdentity}
                        onChange={handleChange}
                        placeholder="Masukkan akun internet identity"
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
                        className="placeholder-text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        isInvalid={!!errors.status}
                      >
                        <option>Aktif</option>
                        <option>Tidak Aktif</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="accreditation">
                      <Form.Label>Akreditasi</Form.Label>
                      <Form.Select
                        className="placeholder-text"
                        name="accreditation"
                        value={formData.accreditation}
                        onChange={handleChange}
                        isInvalid={!!errors.accreditation}
                      >
                        <option>Unggul</option>
                        <option>Sangat Baik</option>
                        <option>Baik</option>
                        <option>Tidak Terakreditasi</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.accreditation}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="establishedDate">
                      <Form.Label>Tanggal Berdiri</Form.Label>
                      <InputGroup>
                        <FormControl
                          className="placeholder-text"
                          type="date"
                          name="establishedDate"
                          value={formData.establishedDate}
                          onChange={handleChange}
                          isInvalid={!!errors.establishedDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.establishedDate}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Form.Group controlId="skNumber">
                      <Form.Label>No. SK Pendirian</Form.Label>
                      <Form.Control
                        className="placeholder-text"
                        type="text"
                        name="skNumber"
                        value={formData.skNumber}
                        onChange={handleChange}
                        placeholder="Masukkan Nomor Surat Keputusan Pendirian"
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
                      <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
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
                        placeholder="+62 XXX-XXXXXX"
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
                        placeholder="+62 XXX-XXXXXX"
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
                        placeholder="Masukkan alamat lengkap resmi"
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
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
                        className="placeholder-text"
                        type="file"
                        name="logo"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleChange}
                        isInvalid={!!errors.logo}
                      />
                      <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Form.Group>
                      <i>
                        *Data yang disertakan merupakan data resmi dan sesuai dengan perguruan
                        tinggi terkait
                      </i>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="d-flex justify-content-end">
                      <Button variant="dark" type="submit" className="w-100 py-2">
                        Submit
                      </Button>
                    </div>
                    <p className="text-center small">
                      Sudah punya akun? <a href="https://identity.ic0.app/">Login di sini</a>
                    </p>
                  </td>
                </tr>
              </Table>
            </Form>
          </div>
        </Col>

        <Col
          xs={{ order: 'first' }}
          md={{ order: 'first' }}
          lg={{ order: 'second' }}
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <img src=".\public\title-pevin.svg" alt="Registration" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistPage;
