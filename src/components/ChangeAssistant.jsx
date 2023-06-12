import React, { useEffect, useState } from 'react';
import {baseUrl} from "../settings.js";

const ChangeAssistant = ({ booking ,setShowChangeAssistantModal}) => {
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

    const handleAssistantChange = event => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => (option.value));
        setSelectedAssistants(selectedOptions);
    };



    const handleUpdateBooking = () => {
        booking.washingAssistants = selectedAssistants.map(assistant => JSON.parse(assistant));
        console.log(booking)
        // Send the request to update the booking with the selected assistants
        fetch(`${baseUrl}/api/booking/update/assistants/${booking.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend
                console.log(data);
                // Perform any necessary actions after updating the booking
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        setShowChangeAssistantModal(false);
    };

    return (
        <div className="modal-content">
            <h2>Change Assistant</h2>
            <label htmlFor="assistantSelect">Select Assistants:</label>
            <select
                id="assistantSelect"
                multiple
                value={selectedAssistants}
                onChange={handleAssistantChange}
            >
                {assistants.map(assistant => (
                    <option key={assistant.name} value={JSON.stringify(assistant)}>
                        {assistant.name}
                    </option>
                ))}
            </select>
            <button onClick={handleUpdateBooking}>Update</button>
        </div>
    );
};
export default ChangeAssistant;