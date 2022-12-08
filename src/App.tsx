import './App.css';
import ICal from './components/ICal';

function App() {
  return (
    <div className="App" id="app">
      <ICal src={{
        url: 'https://www.clojurians-zulip.org/feeds/events.ics',
        format: 'ics'
      }} />
    </div>
  );
}

export default App;
