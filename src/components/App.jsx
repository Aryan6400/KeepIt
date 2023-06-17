import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MiddleRoute from "./MiddleRoute";
import Home from "./Home";
import Bin from "./Bin";
import About from "./About";
import PrivateComponent from "./PrivateComponent";
import Continue from "./Continue";
import TeamForm from "./TeamForm";
import Team from "./Team";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                
                    <Route element={<PrivateComponent />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/bin" element={<Bin />} />
                        <Route path="/join-team" element={<TeamForm />} />
                        <Route path="/team" element={<Team />} />
                    </Route>

                    <Route path="/about" element={<About />} />
                    <Route path="/continue" element={<Continue />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<Signup />} />
                    <Route path="/continue" element={<MiddleRoute />} />
                </Routes>
            </BrowserRouter>
            {/* <Footer /> */}
        </div>
    )
}

export default App;