import { useState } from "react";
import { test_ijazah_backend } from "../../declarations/test_ijazah_backend";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/univ/ProfilePage";
import FormIjazahPage from "./pages/univ/FormIjazahPage";
import SearchIjazahPage from "./pages/viewer/SearchIjazahPage";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/home" Component={HomePage} />
        {/* <Route path="/registrasi-universitas" Component={RegistPage} /> */}
        <Route path="/profil-universitas" Component={ProfilePage} />
        {/* <Route path="/edit-profil" Component={EditProfilePage} /> */}
        <Route path="/unggah-ijazah" Component={FormIjazahPage} />
        <Route path="/cari-ijazah" Component={SearchIjazahPage} />
        {/* <Route path="/cari-perguruan-tinggi" Component={SearchUnivPage} /> */}
        <Route path="/" Component={HomePage} />
      </Routes>
      <FooterComponent />
    </div>
  );

  // Default

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    test_ijazah_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
