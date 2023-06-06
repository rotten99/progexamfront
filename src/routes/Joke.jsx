import React, { useEffect, useState } from 'react';
import facade from '../apiFacade.js';

const Joke = ({ user }) => {
    const [data, setData] = useState('Loading...');

    useEffect(() => {
        const url = user.roles.split(',').includes('user') ? '/api/info/user' : '/api/joke';
        facade.fetchData(url).then((res) => {
            console.log(res);
            setData(res.jokes);
        });
    }, []);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default Joke;
