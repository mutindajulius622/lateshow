import React from 'react';

function YourBotArmy({ army, onRelease, onDischarge }) {
  if (army.length === 0) {
    return (
      <div className="your-bot-army">
        <h2>Your Bot Army</h2>
        <p>No bots enlisted yet. Add some bots to your army!</p>
      </div>
    );
  }

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      <div className="army-grid">
        {army.map(bot => (
          <div key={bot.id} className="bot-card army-card">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <div className="bot-actions">
              <button 
                onClick={() => onRelease(bot)}
                className="release-btn"
              >
                Release
              </button>
              <button 
                onClick={() => onDischarge(bot)}
                className="discharge-btn"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;