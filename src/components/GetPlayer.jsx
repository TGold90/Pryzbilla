import React, { useState } from 'react';
import GuessInput from './GuessInput';


function GetPlayer() {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [displayedName, setDisplayedName] = useState('');
    const [error, setError] = useState(null);

    function getRandomId(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const handleGuess = (char) => {
        if (!playerInfo) return;

        const fullName = `${playerInfo.First} ${playerInfo.Last}`.toUpperCase();
        let newDisplayedName = '';

        for (let i = 0; i < fullName.length; i++) {
            if (fullName[i] === char) {
                newDisplayedName += char;
            } else if (displayedName[i] !== '_') {
                newDisplayedName += displayedName[i];
            } else {
                newDisplayedName += '_';
            }
        }

        setDisplayedName(newDisplayedName);
    };

    const fetchData = async () => {
        const randomId = getRandomId(1, 4083);
        const url = `https://api-nba-v1.p.rapidapi.com/players?id=${randomId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
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
            {playerInfo && <GuessInput onGuess={handleGuess} />}
            {displayedName && <div className="displayName">{displayedName.split('').map((char, index) => <span key={index}>{char} </span>)}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default GetPlayer;