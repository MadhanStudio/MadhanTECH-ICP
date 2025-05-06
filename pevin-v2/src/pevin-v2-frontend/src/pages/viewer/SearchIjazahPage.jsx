// import React from 'react';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import './SearchIjazahPage.css'; // pastikan file ini ada

function SearchIjazahPage() {
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

  return (
    <div className="search-ijazah-container">
      {/* Logo dan Nama Sistem */}
      <div className="header">
        <img 
          src="/nav-pic.svg" 
          alt="Logo" 
          className="logo-ijazah" 
          // style={{ width: '300px', height: 'auto', marginLeft: 'auto', marginRight: '10px'}}  // Ukuran logo langsung diatur di sini
        />
        <h1 className="title">Pusat Validasi Ijazah Nasional</h1>
      </div>

      {/* Kolom Pencarian */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Masukkan nomor ijazah..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      
      <div className="nama-tag">
        <span className="label-gray">Ijazah</span>
        <span className="separator">›</span>
        <span className="label-bold">Bunga Matahari</span>
        <button className="close-button">
          <img src="close.svg" alt="Close" />
        </button>
      </div>


      {/* Tabel Hasil */}
      <div className="table-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>Hasil Pencarian</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="certificate-card">
                  <div className="left">
                    <p className="label">Nama Mahasiswa</p>
                    {ijazahList.length > 0 && (
                      <h2 className="name">{ijazahList[0].sarjanaName}</h2>
                    )}
                    <div className="info-grid" >
                        <div>
                          <p className="label">Tahun Masuk</p>
                          {ijazahList.length > 0 && (
                        <h2 className="name">{ijazahList[0].entryYear}</h2>
                      )}
                        </div>
                        <div>
                          <p className="label">Tahun Kelulusan</p>
                          {ijazahList.length > 0 && (
                        <h2 className="name">{ijazahList[0].graduationYear}</h2>
                      )}
                        </div>
                        <div>
                          <p className="label">GPA (IPK)</p>
                          {ijazahList.length > 0 && (
                        <h2 className="name">{ijazahList[0].gpa}</h2>
                      )}
                        </div>
                        <div>
                          <p className="label">Status</p>
                          <p className="status"></p>
                        </div>
                    </div>

                    <div className="program">
                      <p className="label">Program Studi</p>
                      <p>S1 Pendidikan Bahasa Indonesia</p>
                      <p className="label">Gelar</p>
                      <p>Sarjana Pendidikan (S.Pd)</p>
                    </div>
                  </div>

                  <div className="right">
                    <p className="uploaded">Diunggah oleh:</p>
                    <img 
                      src="/UM.png" 
                      alt="Logo Universitas Negeri Malang" 
                      className="logo" 
                      style={{ width: '150px', height: 'auto' }} 
                    />
                    <h3>Universitas Negeri<br />Malang</h3>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchIjazahPage;
