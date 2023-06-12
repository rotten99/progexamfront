import {Route, Routes} from "react-router-dom";
import Home from "../routes/Home.jsx";
import About from "../routes/About.jsx";
import React from "react";
import CreateAssistant from "../routes/CreateAssistant.jsx";
import AllAss from "../routes/AllAss.jsx";
import CreateBooking from "../routes/CreateBooking.jsx";
import UserBookings from "../routes/UserBookings.jsx";
import AdminBookings from "../routes/AdminBookings.jsx";
import ChangeAssistant from "./ChangeAssistant.jsx";

const Content = ({user}) =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About user={user}/>}/>
            <Route path="/createAss" element={<CreateAssistant/>}/>
            <Route path="/allAss" element={<AllAss/>}/>
            <Route path="/createBooking" element={<CreateBooking user={user}/>}/>
            <Route path="/userBookings" element={<UserBookings user={user}/>}/>
            <Route path="/adminBookings" element={<AdminBookings/>}/>
        </Routes>
    )
}

export default Content;