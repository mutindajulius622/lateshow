import React from 'react';

function BotCollection({ bots, onAddToArmy, onDischarge }) {
  console.log('🎨 BotCollection rendering with', bots.length, 'bots');
  
  if (bots.length === 0) {
    return (
      <div className="bot-collection">
        <h2>Available Bots</h2>
        <div className="empty-state">
          <p>No bots available to display.</p>
          <p>Check the console for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bot-collection">
      <h2>Available Bots ({bots.length})</h2>
      <div className="bot-grid">
        {bots.map(bot => {
          console.log('🎨 Rendering bot:', bot.name);
          return (
            <div key={bot.id} className="bot-card">
              <img src={bot.avatar_url} alt={bot.name} onError={(e) => {
                console.log('❌ Image failed to load for:', bot.name);
                e.target.src = 'https://via.placeholder.com/300x300?text=Bot+Image';
              }} />
              <h3>{bot.name}</h3>
              <p>Class: {bot.bot_class}</p>
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <p className="catchphrase">"{bot.catchphrase}"</p>
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
          );
        })}
      </div>
    </div>
  );
}

export default BotCollection;