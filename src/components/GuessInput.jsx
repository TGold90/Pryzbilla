import React, { useState } from 'react';

function GuessInput({ onGuess }) {
    const [guess, setGuess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z]$/.test(guess)) {
            setError('Please enter a valid letter.');
            return;
        }
        setError('');
        onGuess(guess.toUpperCase());
        setGuess('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                maxLength="1"
                placeholder="Enter a letter"
                aria-label="Guess a letter"
                autoFocus
            />
            <button type="submit">Guess</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default GuessInput;