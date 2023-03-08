import './App.css';
import Header from './components/Header/Header';
import Literacy from './components/Literacy/Literacy';
import Navbar from './components/Navbar/Navbar';
import Portfolio from './components/Portfolio/Portfolio';
import WhatsappIcon from './components/whatsappIcon/whatsappIcon';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Header/>
      <Literacy/>
      <Portfolio/>
      <WhatsappIcon number="8281828578" />
    </div>
  );
}

export default App;
