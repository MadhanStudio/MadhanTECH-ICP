import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { test_ijazah_backend } from "../../../../declarations/test_ijazah_backend";
import Form from "react-bootstrap/Form";

function ProfilePage() {
  const location = useLocation();

  const [formData, setFormData] = useState({});
  const [ijazahList, setIjazahList] = useState([]);

  useEffect(() => {
    const fetchIjazah = async () => {
      try {
        const data = await test_ijazah_backend.getAllIjazah();
        console.log("Data ijazah dari backend:", data); // ✅ Debug
        setIjazahList(data);
      } catch (error) {
        console.error("Gagal mengambil data ijazah:", error);
      }
    };

    fetchIjazah();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
      window.location.reload();
    }, 3000);
  };

  const getTitle = () => {
    if (location.pathname === "/edit-profil") return "Edit Profil";
    if (location.pathname === "/unggah-ijazah") return "Unggah Ijazah";
    return "Dashboard";
  };

  const [editIndex, setEditIndex] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleUpdateStatus = async (nim, nama, statusBaru, asalKampus) => {
    try {
      const result = await test_ijazah_backend.updateIjazah(
        nim,
        nama,
        statusBaru,
        asalKampus
      );
      if (result) {
        showNotification("Status berhasil diubah.", "success");
        setEditIndex(null);
      } else {
        showNotification("Gagal mengubah status.", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      showNotification("Terjadi kesalahan saat update.", "error");
    }
  };

  const handleDeleteIjazah = async (nim, nama) => {
    try {
      const result = await test_ijazah_backend.hapusIjazah(nim, nama);
      if (result) {
        showNotification("Ijazah berhasil dihapus.", "success");
      } else {
        showNotification("Gagal menghapus ijazah.", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("erjadi kesalahan saat menghapus data.", "error");
    }
  };

  return (
    <Container className="dashboard-container mb-5">
      <Row xs={1} sm={1} md={1} lg={2} className="g- justify-content-center">
        <Col lg={12}>
          <Row>
            <Col>
              <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">
                  Selamat datang di Dashboard Admin
                </p>
              </div>

              {/* Notifikasi */}
              {notification.message && (
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    backgroundColor:
                      notification.type === "success" ? "#d4edda" : "#f8d7da",
                    color:
                      notification.type === "success" ? "#155724" : "#721c24",
                    border:
                      notification.type === "success"
                        ? "1px solid #c3e6cb"
                        : "1px solid #f5c6cb",
                  }}
                >
                  {notification.message}
                </div>
              )}
              <Row>
                <Container className="mt-5 mb-5">
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nama Mahasiswa</th>
                        <th>NIM</th>
                        <th>Asal Kampus</th>
                        <th>Tempat/Tanggal Lahir</th>
                        <th>Email</th>
                        <th>Tahun Masuk</th>
                        <th>Tahun Keluar</th>
                        <th>IPK</th>
                        <th>Jurusan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ijazahList.length === 0 ? (
                        <tr>
                          <td colSpan="12">Belum ada data ijazah.</td>
                        </tr>
                      ) : (
                        ijazahList
                          .sort((a, b) => b.graduationYear - a.graduationYear)
                          .map((ijazah, index) => (
                            <tr key={ijazah.id}>
                              <td>{ijazah.id}</td>
                              <td>{ijazah.nama}</td>
                              <td>{ijazah.nim}</td>
                              <td>{ijazah.jurusan}</td>
                              <td>{ijazah.ttl}</td>
                              <td>{ijazah.email}</td>
                              <td>{ijazah.tahun_masuk}</td>
                              <td>{ijazah.tahun_keluar}</td>
                              <td>{ijazah.ipk}</td>
                              <td>{ijazah.asal_kampus}</td>
                              <td>
                                {editIndex === index ? (
                                  <Form.Select
                                    size="sm"
                                    value={newStatus}
                                    onChange={(e) =>
                                      setNewStatus(e.target.value)
                                    }
                                  >
                                    <option value="Valid">Valid</option>
                                    <option value="Tidak Valid">
                                      Tidak Valid
                                    </option>
                                  </Form.Select>
                                ) : (
                                  ijazah.status
                                )}
                              </td>

                              <td>
                                {editIndex === index ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="success"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          ijazah.nim,
                                          ijazah.nama,
                                          newStatus,
                                          ijazah.asal_kampus
                                        )
                                      }
                                    >
                                      Simpan
                                    </Button>{" "}
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => setEditIndex(null)}
                                    >
                                      Batal
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setEditIndex(index);
                                        setNewStatus(ijazah.status);
                                      }}
                                    >
                                      Edit Status
                                    </Button>{" "}
                                    <Button
                                      size="sm"
                                      variant="danger"
                                      onClick={() =>
                                        handleDeleteIjazah(
                                          ijazah.nim,
                                          ijazah.nama
                                        )
                                      }
                                    >
                                      Hapus
                                    </Button>
                                  </>
                                )}
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
