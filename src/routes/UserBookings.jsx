import React from 'react';
import {useEffect, useState} from 'react';
import {baseUrl} from "../settings.js";
const UserBookings = ({user}) => {
    const [bookings, setBookings] = useState([]);
    const [price, setPrice] = useState("loading...");

    useEffect(() => {
        fetch(`${baseUrl}/api/booking/user/${user.username}`)
            .then(response => response.json())
            .then(data => {
                console.log(data + "**********************")
                setBookings(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let total = 0;
        bookings.map(booking=> booking.washingAssistants.map(assistant => (total += assistant.pricePrHour * booking.duration)))
        setPrice(total);
    },[bookings]);

    return (
        <div>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Car</th>
                    <th>Assistants</th>
                    <th>Prices</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map(booking => (
                    <tr key={booking.id}>
                        <td>{booking.dateAndTime}</td>
                        <td>{booking.duration}</td>
                        <td>{booking.car.registrationNumber}</td>
                        <td>
                            {booking.washingAssistants.map(assistant => (
                                <span key={assistant.name}>
                  {assistant.name}
                                    <br/>
                </span>
                            ))}
                        </td>
                        <td>{booking.washingAssistants.map(assistant => (<span key={assistant.name}> {assistant.pricePrHour * booking.duration} kr<br/></span>))}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h4>Total Price: {price}</h4>
        </div>
    );
};

export default UserBookings;