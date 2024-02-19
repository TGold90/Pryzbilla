import React, { useState } from 'react';

function GetPlayer() {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [displayedName, setDisplayedName] = useState('');
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
                console.log(playerData)
                const playerInfo = {
                    First: `${playerData.firstname}`,
                    Last: `${playerData.lastname}`,
                    Birth: `${playerData.birth.date} ${playerData.birth.country}`,
                    RookieYear: `${playerData.nba.start}`,
                    Height: `${playerData.height.feets} ${playerData.height.inches}`,
                    Weight: `${playerData.weight.pounds}`
                };
                setPlayerInfo(playerInfo);
                console.log(playerInfo);

                const blanks = `${playerInfo.First.replace(/[a-zA-Z]/g, '_')} ${playerInfo.Last.replace(/[a-zA-Z]/g, '_')}`;
                setDisplayedName(blanks);

            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Start game!!</button>
            {displayedName && <div className="displayName">{displayedName.split('').map((char, index) => <span key={index}>{char} </span>)}</div>}
            {playerInfo && <div>{playerInfo.Name}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default GetPlayer;