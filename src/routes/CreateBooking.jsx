import React, { useEffect, useState } from 'react';
import {baseUrl} from "../settings.js";

const CreateBooking = ({ user }) => {
    const initialCarState = {
        registrationNumber: '',
        brand: '',
        make: '',
        year: ''
    };

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [car, setCar] = useState(initialCarState);
    const [assistants, setAssistants] = useState([]);
    const [selectedAssistants, setSelectedAssistants] = useState([]);

    useEffect(() => {
        // Fetch the list of assistants from the backend endpoint
        fetch(`${baseUrl}/api/assistant/all`)
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched assistants
                setAssistants(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }, []);

    const handleCarChange = (field, value) => {
        setCar(prevCar => ({
            ...prevCar,
            [field]: value
        }));
    };

    const handleAssistantsChange = event => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedAssistants(selectedOptions);
    };

    const resetForm = () => {
        setDate('');
        setTime('');
        setDuration('');
        setCar(initialCarState);
        setSelectedAssistants([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the booking data
        const bookingData = {
            dateAndTime: date + time,
            duration: duration,
            washingAssistants: selectedAssistants.map(assistant => JSON.parse(assistant)),
            car: car,
            userName: user.username
        };
        console.log(bookingData.washingAssistants + "**********************");

        // Send the data to your backend endpoint
        fetch(`${baseUrl}/api/booking/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend
                console.log(data);
                // Perform any necessary actions after creating the booking

                // Reset the form fields to their initial values
                resetForm();

                // Display an alert
                alert('Booking made');
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="duration">Duration (in hours):</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="carRegistrationNumber">Car Registration Number:</label>
                <input
                    type="text"
                    id="carRegistrationNumber"
                    value={car.registrationNumber}
                    onChange={(e) => handleCarChange('registrationNumber', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="carBrand">Car Brand:</label>
                <input
                    type="text"
                    id="carBrand"
                    value={car.brand}
                    onChange={(e) => handleCarChange('brand', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="carMake">Car Make:</label>
                <input
                    type="text"
                    id="carMake"
                    value={car.make}
                    onChange={(e) => handleCarChange('make', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="carYear">Car Year:</label>
                <input
                    type="number"
                    id="carYear"
                    value={car.year}
                    onChange={(e) => handleCarChange('year', parseInt(e.target.value))}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="assistants">Assistants:</label>
                    <select
                        id="assistants"
                        multiple
                        value={selectedAssistants}
                        onChange={handleAssistantsChange}
                    >
                        {assistants.map((assistant) => (
                            <option key={assistant.name} value={JSON.stringify(assistant)}>
                                {assistant.name + ' ' + assistant.pricePrHour + 'kr/h'}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit">Create Booking</button>
        </form>
    );
}

export default CreateBooking;
