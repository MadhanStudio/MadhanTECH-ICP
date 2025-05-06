import SHA256 "./SHA256";
import Nat8 "mo:base/Nat8";
import _ "mo:base/Nat";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

actor {
  type Ijazah = {
    id : Text;
    nim : Text;
    nama : Text;
    jurusan : Text;
    ttl : Text;
    email : Text;
    tahun_masuk : Text;
    tahun_keluar : Text;
    ipk : Text;
    asal_kampus : Text;
    status : Text;
    hash : Text;
  };

  var database : [Ijazah] = [];

  /// Fungsi konversi array byte menjadi string hex (string 64-char SHA256)
  func toHexString(bytes : [Nat8]) : Text {
    let hexChars = "0123456789abcdef";
    let hexArray = Text.toArray(hexChars);
    var result = "";
    for (byte in bytes.vals()) {
      let hi = Nat8.toNat(byte) / 16;
      let lo = Nat8.toNat(byte) % 16;
      result := result # Text.fromChar(hexArray[hi]) # Text.fromChar(hexArray[lo]);
    };
    return result;
  };

  /// Generate hash SHA256 dari nim + nama
  public func generateHash(nim : Text, nama : Text) : async Text {
    let data = nim # nama;
    let bytes : [Nat8] = Blob.toArray(Text.encodeUtf8(data));

    let hashBytes : [Nat8] = SHA256.sha256(bytes);
    return toHexString(hashBytes);
  };

  /// Tambah ijazah jika belum ada
  public func tambahIjazah(id : Text, nim : Text, nama : Text, jurusan : Text, ttl : Text, email : Text, tahun_masuk : Text, tahun_keluar : Text, ipk : Text, asal_kampus : Text, status : Text) : async Bool {
    if (await cekIjazah(nim, nama)) {
      return false;
    };
    let dataHash = await generateHash(nim, nama);
    database := Array.append(database, [{ id = id; nim = nim; nama = nama; jurusan = jurusan; ttl = ttl; email = email; tahun_masuk = tahun_masuk; tahun_keluar = tahun_keluar; ipk = ipk; asal_kampus = asal_kampus; status = status; hash = dataHash }]);
    return true;
  };

  /// Cek apakah ijazah dengan nim dan nama sudah ada
  public query func cekIjazah(nim : Text, nama : Text) : async Bool {
    for (ij in database.vals()) {
      if (ij.nim == nim and ij.nama == nama) {
        return true;
      };
    };
    return false;
  };

  public func updateIjazah(nim : Text, nama : Text, statusBaru : Text, asalKampusBaru : Text) : async Bool {
    var updated = false;

    database := Array.map<Ijazah, Ijazah>(
      database,
      func(ij) {
        if (ij.nim == nim and ij.nama == nama) {
          updated := true;
          {
            id = ij.id;
            nim = ij.nim;
            nama = ij.nama;
            jurusan = ij.jurusan;
            ttl = ij.ttl;
            email = ij.email;
            tahun_masuk = ij.tahun_masuk;
            tahun_keluar = ij.tahun_keluar;
            ipk = ij.ipk;
            asal_kampus = asalKampusBaru;
            status = statusBaru;
            hash = ij.hash;
          };
        } else {
          ij;
        };
      },
    );

    return updated;
  };

  public func hapusIjazah(nim : Text, nama : Text) : async Bool {
    let newDatabase = Array.filter<Ijazah>(
      database,
      func(ij) {
        not (ij.nim == nim and ij.nama == nama);
      },
    );

    let deleted = database.size() != newDatabase.size();
    database := newDatabase;
    return deleted;
  };

  /// Lihat semua data
  public query func getAllIjazah() : async [Ijazah] {
    return database;
  };

  // public query func cariIjazah(nama : Text, nim : Text, jurusan : Text, asal_kampus : Text) : async [Ijazah] {
  //   return Array.filter<Ijazah>(
  //     database,
  //     func(i) {
  //       i.nama == nama or i.nim == nim or i.jurusan == jurusan or i.asal_kampus == asal_kampus;
  //     },
  //   );
  // };

};
