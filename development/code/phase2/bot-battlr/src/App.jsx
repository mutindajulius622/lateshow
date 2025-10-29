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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔍 Starting to fetch bots...');
    
    fetch('http://localhost:8001/bots')
      .then(response => {
        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Bots data received:', data);
        console.log('✅ Number of bots:', data.length);
        console.log('✅ First bot:', data[0]);
        setBots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error fetching bots:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addToArmy = (bot) => {
    console.log('➕ Adding bot to army:', bot.name);
    if (!army.find(b => b.id === bot.id) && !army.find(b => b.bot_class === bot.bot_class)) {
      setArmy([...army, bot]);
    }
  };

  const releaseFromArmy = (bot) => {
    console.log('➖ Releasing bot from army:', bot.name);
    setArmy(army.filter(b => b.id !== bot.id));
  };

  const dischargeBot = (bot) => {
    console.log('🗑️ Discharging bot:', bot.name);
    fetch(`http://localhost:8001/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        setBots(bots.filter(b => b.id !== bot.id));
        setArmy(army.filter(b => b.id !== bot.id));
      })
      .catch(err => console.error('Error discharging bot:', err));
  };

  const sortedAndFilteredBots = () => {
    let result = [...bots];
    console.log('🔄 Filtering and sorting bots. Total:', result.length);
    
    if (filters.length > 0) {
      result = result.filter(bot => filters.includes(bot.bot_class));
      console.log('🎯 After filtering:', result.length);
    }
    
    if (sortBy) {
      result.sort((a, b) => b[sortBy] - a[sortBy]);
      console.log('📊 After sorting by:', sortBy);
    }
    
    return result;
  };

  // Debug current state
  console.log('📊 App state - loading:', loading, 'error:', error, 'bots count:', bots.length);

  if (loading) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Bot Battlr</h1>
          <div className="loading">🔄 Loading bots from server...</div>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Bot Battlr</h1>
          <div className="error">
            ❌ Error: {error}
            <br />
            <small>Make sure JSON server is running on http://localhost:8001</small>
          </div>
        </header>
      </div>
    );
  }

  const displayBots = sortedAndFilteredBots();
  console.log('🎯 Bots to display:', displayBots.length);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Bot Battlr</h1>
        <p>Custom Build Your Bot Army</p>
        <div className="debug-info">
          📊 Loaded: {bots.length} bots | Displaying: {displayBots.length} bots | Army: {army.length} bots
        </div>
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

      {displayBots.length === 0 ? (
        <div className="no-bots">
          <h2>Available Bots</h2>
          <p>No bots found matching your criteria.</p>
          <p>Try adjusting your filters or check if bots are loaded.</p>
        </div>
      ) : (
        <BotCollection 
          bots={displayBots}
          onAddToArmy={addToArmy}
          onDischarge={dischargeBot}
        />
      )}
    </div>
  );
}

export default App;