import React, { useEffect, useState } from 'react';
import {baseUrl} from "../settings.js";

const UpdateBooking = ({ booking, setShowUpdateBookingModal }) => {
    const [username, setUsername] = useState(booking.username);
    const [car, setCar] = useState(booking.car);
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/info/allusers`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/api/booking/cars`)
            .then(response => response.json())
            .then(data => {
                setCars(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleUserChange = event => {
        setUsername(event.target.value);
    };

    const handleCarChange = event => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => (option.value));
        setCar(selectedOptions);
    }



    const handleUpdateBooking = () => {
        const updatedBooking = {
            ...booking,
            car: JSON.parse(car),
            userName: username
        };

        fetch(`${baseUrl}/api/booking/update/${booking.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBooking)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        setShowUpdateBookingModal(false);
    };


    return (
        <div className="modal-content">
            <h2>Change user</h2>
            <label htmlFor="userSelect">Select user:</label>
            <select
                id="userSelect"
                value={username}
                onChange={handleUserChange}
            >
                {users.map(user => (
                    <option key={user.userName} value={user.userName}>
                        {user.userName}
                    </option>
                ))}
            </select>

            <h2>Change car</h2>
            <label htmlFor="carSelect">Select user:</label>
            <select
                id="carSelect"
                value={car}
                onChange={handleCarChange}
            >
                {cars.map(car => (
                    <option key={car.registrationNumber} value={JSON.stringify(car)}>
                        {car.registrationNumber}
                    </option>
                ))}
            </select>

            <button onClick={handleUpdateBooking}>Update</button>
        </div>
    );
};

export default UpdateBooking;
