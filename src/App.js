import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Components/layout";
import Home from "./Pages/HomePage/home";
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/signup';
import Header from './Pages/header';
function App() {
return (
<>
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            </Route>


        <Route path="/" element={<Header />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        </Route>

        </Routes>
    </BrowserRouter>
</>
);
}

export default App;
