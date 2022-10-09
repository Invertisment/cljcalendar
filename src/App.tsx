import './App.css';
import Footer from './components/Footer';
import ICal from './components/ICal';

function App() {
  return (
    <div className="App">
      <ICal src={{
        url: 'https://www.clojurians-zulip.org/feeds/events.ics',
        format: 'ics'
      }} />
      <Footer />
    </div>
  );
}

export default App;
