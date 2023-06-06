import React, {useEffect,useState} from 'react';
import LogIn from "../components/LoginForm.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import facade from "../apiFacade.js";

function About({user}) {
    const [dataFromServer, setDataFromServer] = useState("Loading...");

    useEffect(() => {
        const url = user.roles.split(',').includes('user') ? '/api/info/user' : '/api/joke';
        facade.fetchData(url).then(res => {
            console.log(res);
            setDataFromServer(res.msg)});
    }, []);
    return (
        <div>
            {dataFromServer}
            <h1>About</h1>
        </div>
    );
}

export default About;