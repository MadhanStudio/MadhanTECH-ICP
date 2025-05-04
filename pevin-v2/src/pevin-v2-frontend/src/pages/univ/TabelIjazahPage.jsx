import React from 'react';
import { Table } from 'react-bootstrap';

function TableIjazahPage({ data }) {
  return (
    <div>
      <h3>Daftar Ijazah</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Mahasiswa</th>
            <th>NIM</th>
            <th>Program Studi</th>
            <th>Tanggal Lulus</th>
            <th>Nomor Ijazah</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.nim}</td>
                <td>{item.prodi}</td>
                <td>{item.tanggalLulus}</td>
                <td>{item.noIjazah}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Belum ada data ijazah
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableIjazahPage;
