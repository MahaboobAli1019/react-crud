import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Datainsert from './components/datainsert';
import Dataview from "./components/dataview";
import Dataedit from "./components/dataedit";
import DataEye from "./components/dataeye";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dataview/>} />
        <Route path="/insert" element={<Datainsert/>} />
        <Route path="/edit" element={<Dataedit/>}/>
        <Route path="/view" element={<DataEye/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
