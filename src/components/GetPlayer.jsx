import React, { useState } from 'react';

function GetPlayer() {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [error, setError] = useState(null);

    function getRandomId(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const fetchData = async () => {
        const randomId = getRandomId(1, 4083);
        const url = `https://api-nba-v1.p.rapidapi.com/players?id=${randomId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b4545e6103msh10a075151893746p12e9dejsn0bddcd8c4d72',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json(); // Assuming the response is JSON
            if (result.results > 0) {
                const playerData = result.response[0];

                const playerInfo = {
                    Name: `${playerData.firstname} ${playerData.lastname}`,

                };
                setPlayerInfo(playerInfo);
                console.log(playerInfo);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Fetch NBA Players</button>
            {playerInfo && <div>Name: {playerInfo.Name}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default GetPlayer;