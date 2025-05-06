// import React, { useEffect, useState } from "react";
// import { test_ijazah_backend } from "../../../../declarations/test_ijazah_backend";

// // import './SearchIjazahPage.css'; // pastikan file ini ada

// function SearchIjazahPage() {
//   const [allIjazah, setAllIjazah] = useState([]);
//   const [filteredIjazah, setFilteredIjazah] = useState([]);
//   const [query, setQuery] = useState("");

//   // Ambil semua data ijazah saat component dimount
//   useEffect(() => {
//     const fetchIjazah = async () => {
//       try {
//         console.log("Mengambil data ijazah dari backend...");
//         const data = await test_ijazah_backend.getAllIjazah(); // Pastikan ini benar
//         console.log("Data ijazah berhasil diambil:", data);
//         setAllIjazah(data);
//       } catch (error) {
//         console.error("Gagal mengambil data ijazah:", error);

//         // Coba tampilkan pesan error secara visual juga (opsional)
//         alert(
//           "Terjadi kesalahan saat mengambil data. Lihat console untuk detail."
//         );
//       }
//     };
//     fetchIjazah();
//   }, []);

//   const handleSearch = () => {
//     const lowerQuery = query.toLowerCase();
//     console.log("Query pencarian:", lowerQuery);

//     const filtered = allIjazah.filter((ijazah) =>
//       (ijazah.nama + ijazah.nim + ijazah.jurusan + ijazah.asal_kampus)
//         .toLowerCase()
//         .includes(lowerQuery)
//     );

//     console.log("Hasil pencarian:", filtered);
//     setFilteredIjazah(filtered);
//   };

//   return (
//     <div className="search-ijazah-container">
//       {/* Header */}
//       <div className="header">
//         <img
//           src="/nav-pic.svg"
//           alt="Logo"
//           className="logo"
//           style={{
//             width: "300px",
//             height: "auto",
//             marginLeft: "auto",
//             marginRight: "10px",
//           }}
//         />
//         <h1 className="title">Pusat Validasi Ijazah Nasional</h1>
//       </div>

//       {/* Single Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Cari berdasarkan Nama, NIM, Jurusan, atau Asal Kampus..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           Search
//         </button>
//       </div>

//       {/* Tabel Hasil */}
//       <div className="table-container">
//         <table className="result-table">
//           {/* <thead>
//           <tr>
//             <th>Nama</th>
//             <th>NIM</th>
//             <th>Jurusan</th>
//             <th>Asal Kampus</th>
//             <th>Status</th>
//           </tr>
//         </thead> */}
//           <tbody>
//             {filteredIjazah.length > 0 ? (
//               filteredIjazah.map((ijazah, index) => (
//                 <tr key={index}>
//                   <td>{ijazah.nama}</td>
//                   <td>{ijazah.nim}</td>
//                   <td>{ijazah.jurusan}</td>
//                   <td>{ijazah.asal_kampus}</td>
//                   <td>{ijazah.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   Belum ada hasil pencarian
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SearchIjazahPage;
import React, { useEffect, useState } from "react";
import { test_ijazah_backend } from "../../../../declarations/test_ijazah_backend";
// import "./SearchIjazahPage.css"; // CSS yang akan dibuat setelah ini

function SearchIjazahPage() {
  const [allIjazah, setAllIjazah] = useState([]);
  const [filteredIjazah, setFilteredIjazah] = useState([]);
  const [selectedIjazah, setSelectedIjazah] = useState(null);
  const [query, setQuery] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchIjazah = async () => {
      try {
        const data = await test_ijazah_backend.getAllIjazah();
        setAllIjazah(data);
      } catch (error) {
        console.error("Gagal mengambil data ijazah:", error);
        alert("Gagal mengambil data. Lihat console.");
      }
    };
    fetchIjazah();
  }, []);

  const handleSearch = () => {
    const lowerQuery = query.toLowerCase();
    const filtered = allIjazah.filter((ijazah) =>
      (ijazah.nama + ijazah.nim + ijazah.jurusan + ijazah.asal_kampus)
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredIjazah(filtered);
    setSelectedIjazah(null); // reset selected detail
  };

  const handleRowClick = (ijazah) => {
    setSelectedIjazah(ijazah);
  };

  return (
    <div className="search-ijazah-container">
      {/* Header */}
      <header className="header">
        <img src="/nav-pic.svg" alt="Logo" className="logo" />
        <h1>Pusat Validasi Ijazah Nasional</h1>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari Nama, NIM, Jurusan, atau Kampus..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Cari</button>
      </div>

      {/* Tabel */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Asal Kampus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredIjazah.length > 0 ? (
              filteredIjazah.map((ijazah, index) => (
                <tr key={index} onClick={() => handleRowClick(ijazah)}>
                  <td>{ijazah.nama}</td>
                  <td>{ijazah.nim}</td>
                  <td>{ijazah.jurusan}</td>
                  <td>{ijazah.asal_kampus}</td>
                  <td>{ijazah.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-result">
                  Belum ada hasil pencarian
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail */}
      {selectedIjazah && (
        <div className="detail-card">
          <p>
            <strong>Nama:</strong> {selectedIjazah.nama}
          </p>
          <p>
            <strong>NIM:</strong> {selectedIjazah.nim}
          </p>
          <p>
            <strong>Asal Kampus:</strong> {selectedIjazah.asal_kampus}
          </p>
          <p>
            <strong>Tempat/Tanggal Lahir</strong> {selectedIjazah.ttl}
          </p>
          <p>
            <strong>Email:</strong> {selectedIjazah.email}
          </p>
          <p>
            <strong>Jurusan:</strong> {selectedIjazah.jurusan}
          </p>
          <p>
            <strong>Tahun Masuk:</strong> {selectedIjazah.tahun_masuk}
          </p>
          <p>
            <strong>Tahun Keluar:</strong> {selectedIjazah.tahun_keluar}
          </p>
          <p>
            <strong>IPK:</strong> {selectedIjazah.ipk}
          </p>
          <p>
            <strong>Status:</strong> {selectedIjazah.status}
          </p>
          <button onClick={() => setSelectedIjazah(null)}>Tutup</button>
        </div>
      )}
    </div>
  );
}

export default SearchIjazahPage;
