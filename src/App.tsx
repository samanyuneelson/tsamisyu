import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Header></Header>
      <Portfolio></Portfolio>
    </div>
  );
}

export default App;
