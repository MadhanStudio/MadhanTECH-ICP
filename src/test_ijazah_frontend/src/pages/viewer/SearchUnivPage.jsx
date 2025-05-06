import React, { useState } from 'react';

const universities = [
  {
    name: 'Universitas Negeri Malang',
    location: 'Kota Malang, Jawa Timur, Indonesia',
    accreditation: 'Akreditasi Unggul',
    registered: 'Juli 2015 - sekarang',
    logo: '/path-to-logo.png',
    status: 'aktif', // Adding status for filtering
  },
  {
    name: 'Universitas Negeri Malang',
    location: 'Kota Malang, Jawa Timur, Indonesia',
    accreditation: 'Akreditasi Unggul',
    registered: 'Juli 2015 - sekarang',
    logo: '/path-to-logo.png',
    status: 'tidak-aktif', // Example of another status
  },
  {
    name: 'Universitas Negeri Malang',
    location: 'Kota Malang, Jawa Timur, Indonesia',
    accreditation: 'Akreditasi Unggul',
    registered: 'Juli 2015 - sekarang',
    logo: '/path-to-logo.png',
    status: 'aktif',
  },
];

function SearchUnivPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // state for filtering by status

  const filteredUniversities = universities.filter((univ) => {
    const isNameMatch = univ.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = statusFilter ? univ.status === statusFilter : true;
    return isNameMatch && isStatusMatch;
  });

  return (
    <div className="search-page">
      <h1 className="page-title">Daftar Perguruan Tinggi</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Masukkan nama Perguruan Tinggi"
          className="filter-input filter"
          value={searchTerm} // Bind value to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
        />
        <select
          className="filter-input filter-input-name"
          value={statusFilter} // Bind value to statusFilter state
          onChange={(e) => setStatusFilter(e.target.value)} // Update statusFilter on change
        >
          <option value="">Tampilkan Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="tidak-aktif">Tidak Aktif</option>
        </select>
      </div>

      <div className="univ-list">
        {filteredUniversities.length === 0 ? (
          <p>Data tidak ditemukan</p>
        ) : (
          filteredUniversities.map((univ, index) => (
            <div className="univ-card" key={index}>
              <img src={univ.logo} alt="Logo Universitas" className="univ-logo" />
              <div className="univ-info">
                <h2 className="univ-name">{univ.name}</h2>
                <p className="univ-detail">
                  <img src="/lokasi.svg" alt="Lokasi" className="icon" /> {univ.location}
                </p>
                <p className="univ-detail">
                  <img src="/akred.svg" alt="akreditasi" className="icon" /> {univ.accreditation}
                </p>
                <p className="univ-detail">Terdaftar pada: {univ.registered}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchUnivPage;
