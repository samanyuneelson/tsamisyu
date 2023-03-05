import './App.css';
import Header from './components/Header/Header';
import Literacy from './components/Literacy/Literacy';
import Navbar from './components/Navbar/Navbar';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Header/>
      <Literacy/>
      <Portfolio/>
    </div>
  );
}

export default App;
