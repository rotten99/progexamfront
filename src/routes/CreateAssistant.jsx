import React from 'react';
import { useState } from 'react';
import {baseUrl} from "../settings.js";

const CreateAssistant = () => {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [experience, setExperience] = useState(0);
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the assistant data
        const assistantData = {
            name: name,
            language: language,
            experience: experience,
            price: price
        };

        // Send the data to your backend endpoint
        fetch(`${baseUrl}/api/assistant/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                primaryLanguage: language,
                yearsOfExperience: experience,
                pricePrHour: price,
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend
                console.log(data);
                // Perform any necessary actions after creating the assistant

                // Reset the form fields to their initial values
                setName('');
                setLanguage('');
                setExperience(0);
                setPrice(0);

                // Display an alert
                alert('Assistant made');
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="language">Primary Language:</label>
                <input
                    type="text"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="experience">Years of Experience:</label>
                <input
                    type="number"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="price">Price per Hour:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
            </div>
            <button type="submit">Create Assistant</button>
        </form>
    );
}

export default CreateAssistant;
