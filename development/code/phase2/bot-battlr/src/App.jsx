import React, { useState, useEffect } from 'react';
import './App.css';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import SortBar from './components/SortBar';
import FilterBar from './components/FilterBar';


function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(res => res.json())
      .then(data => setBots(data))
      .catch(err => console.error('Error fetching bots:', err));
  }, []);

  const addToArmy = (bot) => {
    if (!army.find(b => b.id === bot.id) && !army.find(b => b.bot_class === bot.bot_class)) {
      setArmy([...army, bot]);
    }
  };

  const releaseFromArmy = (bot) => {
    setArmy(army.filter(b => b.id !== bot.id));
  };

  const dischargeBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        setBots(bots.filter(b => b.id !== bot.id));
        setArmy(army.filter(b => b.id !== bot.id));
      })
      .catch(err => console.error('Error discharging bot:', err));
  };

  const sortedAndFilteredBots = () => {
    let result = [...bots];
    
    if (filters.length > 0) {
      result = result.filter(bot => filters.includes(bot.bot_class));
    }
    
    if (sortBy) {
      result.sort((a, b) => b[sortBy] - a[sortBy]);
    }
    
    return result;
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Bot Battlr</h1>
        <p>Custom Build Your Bot Army</p>
      </header>
      
      <div className="controls">
        <FilterBar filters={filters} setFilters={setFilters} />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <YourBotArmy 
        army={army} 
        onRelease={releaseFromArmy}
        onDischarge={dischargeBot}
      />

      <BotCollection 
        bots={sortedAndFilteredBots()}
        onAddToArmy={addToArmy}
        onDischarge={dischargeBot}
      />
    </div>
  );
}

export default App;