import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Form,
  Button,
  Nav,
  Navbar,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { test_ijazah_backend } from "../../../../declarations/test_ijazah_backend";
// import { AuthClient } from "@dfinity/auth-client";

function FormIjazahPage({ onSuccess }) {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    nim: "",
    nama: "",
    asal_kampus: "",
    ttl: "",
    email: "",
    jurusan: "",
    tahun_masuk: "",
    tahun_keluar: "",
    ipk: "",
    status: "Valid",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
      window.location.reload();
    }, 3000);
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => {
        const updatedData = { ...prev, [name]: files[0] };
        console.log(updatedData); // Tambahkan log untuk mengecek perubahan data
        return updatedData;
      });
    } else {
      setFormData((prev) => {
        const updatedData = { ...prev, [name]: value };
        console.log(updatedData); // Tambahkan log untuk mengecek perubahan data
        return updatedData;
      });
    }
  };

  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const validate = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama sarjana wajib di isi";
    }

    if (!formData.ttl.trim()) {
      newErrors.ttl = "Tempat tanggal lahir masuk wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    }

    if (!formData.jurusan.trim()) {
      newErrors.jurusan = "Wajib menyertakan jurusan studi pemilik ijazah";
    }

    if (!formData.tahun_masuk.trim()) {
      newErrors.tahun_masuk = "Tahun masuk wajib dipilih";
    }
    if (!formData.tahun_keluar.trim()) {
      newErrors.tahun_keluar = "Tahun keluar wajib dipilih";
    }

    if (!formData.ipk.trim()) {
      newErrors.ipk = "IPK wajib diisi";
    } else if (isNaN(parseFloat(formData.ipk))) {
      newErrors.ipk = "IPK harus berupa angka";
    } else if (
      parseFloat(formData.ipk) > 4.0 ||
      parseFloat(formData.ipk) < 0.0
    ) {
      newErrors.ipk = "IPK harus di antara 0.00 - 4.00";
    }

    // if (!formData.ijazahFile) {
    //   newErrors.ijazahFile = "File ijazah wajib diunggah";
    // }

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

    // if (!principal) {
    //   alert("Silakan login terlebih dahulu.");
    //   return;
    // }
    // Log data untuk memastikan isinya benar
    console.log("Form Data:", formData);

    const {
      id,
      nim,
      nama,
      asal_kampus,
      ttl,
      email,
      jurusan,
      tahun_masuk,
      tahun_keluar,
      ipk,
      status,
    } = formData;

    const ok = await test_ijazah_backend.tambahIjazah(
      id,
      nim,
      nama,
      asal_kampus,
      ttl,
      email,
      jurusan,
      tahun_masuk,
      tahun_keluar,
      ipk,
      status
    );

    if (ok) {
      showNotification("Ijazah berhasil ditambah", "success");
      setFormData({
        id: "",
        nim: "",
        nama: "",
        asal_kampus: "",
        ttl: "",
        email: "",
        jurusan: "",
        tahun_masuk: "",
        tahun_keluar: "",
        ipk: "",
        status: "",
      });
      onSuccess(); // Panggil fungsi onSuccess setelah berhasil menambah ijazah
    } else {
      showNotification("Ijazah gagal ditambah", "error");
    }
  };

  const [resetKey, setResetKey] = useState(Date.now());

  const handleCancel = () => {
    setFormData({
      id: uuidv4(),
      nama: "",
      nim: "",
      ttl: "",
      email: "",
      jurusan: "",
      tahun_masuk: "",
      tahun_keluar: "",
      ipk: "",
      // ijazahFile: null,
      status: "Valid",
    });
    setResetKey(Date.now());
  };

  const getTitle = () => {
    if (location.pathname === "/edit-profil") return "Edit Profil";
    if (location.pathname === "/unggah-ijazah") return "Unggah Ijazah";
    return "Dashboard";
  };

  return (
    <Container className="dashboard-container mt-10 mb-5">
      {/* Notifikasi */}
      {notification.message && (
        <div
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            backgroundColor:
              notification.type === "success" ? "#d4edda" : "#f8d7da",
            color: notification.type === "success" ? "#155724" : "#721c24",
            border:
              notification.type === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
          }}
        >
          {notification.message}
        </div>
      )}
      <Row xs={1} sm={1} md={1} lg={2} className="g-4">
        <Col
          xs={{ order: "first" }}
          sm={{ order: "first" }}
          md={{ order: "first" }}
          lg={3}
        ></Col>
        <Col lg={9}>
          <Row>
            <Col
              xs={{ order: "second" }}
              md={{ order: "second" }}
              lg={{ order: "second" }}
            >
              <div className="regist-header mt-4">
                <h1 className="regist-title">Formulir Unggah Data Ijazah</h1>
                <p className="regist-subtitle">
                  Pastikan data yang telah sesuai dengan data yang tertera pada
                  ijazah asli.
                </p>
              </div>

              <div className="cotainer-form">
                <Form onSubmit={handleSubmit} className="edit-form">
                  <Table responsive="xs" className="regist-table">
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="nama">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                              className="placeholder-text"
                              type="text"
                              name="nama"
                              value={formData.nama}
                              onChange={handleChange}
                              isInvalid={!!errors.nama}
                              placeholder="Masukkan nama pemilik ijazah di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.nama}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="NIM">
                            <Form.Label>NIM</Form.Label>
                            <Form.Control
                              className="placeholder-text"
                              type="int"
                              name="nim"
                              value={formData.nim}
                              onChange={handleChange}
                              isInvalid={!!errors.nim}
                              placeholder="Masukkan nama pemilik ijazah di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.nim}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="asalKampus">
                            <Form.Label>Asal Kampus</Form.Label>
                            <Form.Control
                              className="placeholder-text"
                              type="text"
                              name="asal_kampus"
                              value={formData.asal_kampus}
                              onChange={handleChange}
                              isInvalid={!!errors.asal_kampus}
                              placeholder="Masukkan nama pemilik ijazah di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.asal_kampus}
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
                          <Form.Group controlId="jurusan">
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Control
                              type="text"
                              name="jurusan"
                              value={formData.jurusan}
                              onChange={handleChange}
                              isInvalid={!!errors.jurusan}
                              placeholder="Masukkan jurusan studi di sini"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.jurusan}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Group controlId="tahun_masuk">
                            <Form.Label>Tahun Masuk</Form.Label>
                            <Form.Select
                              name="tahun_masuk"
                              value={formData.tahun_masuk}
                              onChange={handleChange}
                              isInvalid={!!errors.tahun_masuk}
                            >
                              <option value="">Pilih tahun</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.tahun_masuk}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group controlId="tahun_keluar">
                            <Form.Label>Tahun Keluar</Form.Label>
                            <Form.Select
                              name="tahun_keluar"
                              value={formData.tahun_keluar}
                              onChange={handleChange}
                              isInvalid={!!errors.tahun_keluar}
                            >
                              <option value="">Pilih tahun</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.tahun_keluar}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group controlId="ipk">
                            <Form.Label>IPK</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              max="4"
                              name="ipk"
                              value={formData.ipk}
                              onChange={handleChange}
                              isInvalid={!!errors.ipk}
                              placeholder="0.00-4.00"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.ipk}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                        {/* <td>
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
                        </td> */}
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Form.Group className="mt-3">
                            <i>
                              *Data ijazah yang diunggah tidak dapat diubah di
                              kemudian hari
                            </i>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <Button
                              variant="dark"
                              type="submit"
                              className="w-100 py-2"
                            >
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
