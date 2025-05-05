import React from 'react';
// import './SearchIjazahPage.css'; // pastikan file ini ada

function SearchIjazahPage() {
  return (
    <div className="search-ijazah-container">
      {/* Logo dan Nama Sistem */}
      <div className="header">
        <img
          src="/nav-pic.svg"
          alt="Logo"
          className="logo"
          style={{ width: '300px', height: 'auto', marginLeft: 'auto', marginRight: '10px' }} // Ukuran logo langsung diatur di sini
        />
        <h1 className="title">Pusat Validasi Ijazah Nasional</h1>
      </div>

      {/* Kolom Pencarian */}
      <div className="search-bar">
        <input type="text" placeholder="Masukkan nomor ijazah..." className="search-input" />
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchIjazahPage;
