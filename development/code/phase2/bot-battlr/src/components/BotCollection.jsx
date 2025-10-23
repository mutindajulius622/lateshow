import React from 'react';

function BotCollection({ bots, onAddToArmy, onDischarge }) {
  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bot-grid">
        {bots.map(bot => (
          <div key={bot.id} className="bot-card">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p className="catchphrase">{bot.catchphrase}</p>
            <div className="bot-actions">
              <button 
                onClick={() => onAddToArmy(bot)}
                className="enlist-btn"
              >
                Enlist
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

export default BotCollection;