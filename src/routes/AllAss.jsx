import React from 'react';
import { useEffect, useState } from 'react';
import {baseUrl} from "../settings.js";

const AllAss = () => {
    const [assistants, setAssistants] = useState([]);

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

    return (
        <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th>Name</th>
                <th>Primary Language</th>
                <th>Years of Experience</th>
                <th>Price per Hour</th>
            </tr>
            </thead>
            <tbody>
            {assistants.map(assistant => (
                <tr key={assistant.name}>
                    <td>{assistant.name}</td>
                    <td>{assistant.primaryLanguage}</td>
                    <td>{assistant.yearsOfExperience}</td>
                    <td>{assistant.pricePrHour+"kr/h"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}


export default AllAss;