import React from 'react';
import {useEffect, useState} from 'react';
import ChangeAssistant from "../components/ChangeAssistant.jsx";
import UpdateBooking from "../components/UpdateBooking.jsx";
import {baseUrl} from "../settings.js";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [showChangeAssistantModal, setShowChangeAssistantModal] = useState(false);
    const [showUpdateBookingModal, setShowUpdateBookingModal] = useState(false);
    const [bookingUse, setBookingUse] = useState({});


    // Fetch bookings data for the given username
    useEffect(() => {
        fetch(`${baseUrl}/api/booking/all`)
            .then(response => response.json())
            .then(data => {

                setBookings(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleDeleteBooking = (id) => {
        // Send the request to delete the booking
        fetch(`${baseUrl}/api/booking/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend
                console.log(data);
                // Perform any necessary actions after deleting the booking
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    const handleChangeAssistant = (booking) => {
        console.log("change assistant")
        setShowChangeAssistantModal(true);
        setBookingUse(booking);

    }
    const handleUpdateBooking = (booking) => {
        console.log("update booking")
        setShowUpdateBookingModal(true);
        setBookingUse(booking);

    };

    return (
        <div>
            {showChangeAssistantModal &&
                <ChangeAssistant booking={bookingUse} setShowChangeAssistantModal={setShowChangeAssistantModal}/>}
            {showUpdateBookingModal &&
                <UpdateBooking booking={bookingUse} setShowUpdateBookingModal={setShowUpdateBookingModal}/>}
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Car</th>
                    <th>Assistants</th>
                    <th>User</th>
                    <th>Prices</th>
                    <th>Actions</th>
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
                        <td>{booking.userName}</td>
                        <td>
                            {booking.washingAssistants.map(assistant => (
                                <span key={assistant.name}>{assistant.pricePrHour * booking.duration} kr<br/></span>
                            ))}
                        </td>
                        <td>
                            <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                            /
                            <button onClick={() => handleChangeAssistant(booking)}>Change Assistant</button> /
                            <button onClick={() => handleUpdateBooking(booking)}>Update Booking</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookings;