import {NavLink} from "react-router-dom";
import LogIn from "./LoginForm.jsx";
import LoggedIn from "./LoggedIn.jsx";
import React from "react";

const Header = ({loggedIn,login,user,logout}) =>{
    return (
        <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            {user.roles.includes('admin') && <li><NavLink to="/createAss">New Assistant</NavLink></li>}
            {user.roles.includes('user') &&<li><NavLink to="/allAss">See Assistants</NavLink></li>}
            {user.roles.includes('user') &&<li><NavLink to="/createBooking">New Booking</NavLink></li>}
            {user.roles.includes('user') &&<li><NavLink to="/userBookings">See Bookings</NavLink></li>}
            {user.roles.includes('admin') &&<li><NavLink to="/adminBookings">Handle Bookings</NavLink></li>}
            {!loggedIn ? (<LogIn login={login}/>) :
                (<>
                    <LoggedIn user={user} logout={logout}/>
                </>)}
        </ul>
    )
}

export default Header;