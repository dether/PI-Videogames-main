import './App.css'
import { Routes, Route } from "react-router-dom";
import React from 'react';
import HomePage from "./components/Home-Page/HomePage";
import LadingPage from './components/Lading-Page/LadingPage';
import CardDetail from './components/CardDetail/CardDetail';
import NotFound from './components/NotFound/NotFound';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';

function App() {
  
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<LadingPage/>} />
        <Route path="/home" element= {<HomePage/>} /> 
        <Route path="/videogames" element={<VideogameCreate />} />

        <Route path="/videogame/:id" element={<CardDetail />}/>
        <Route path="*" element={<NotFound msg="Error 404 - Pagina no existe!" />} />
      </Routes>
    </div>
    </>
  )
}

export default App
