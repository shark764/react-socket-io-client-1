import logo from './logo.svg';
import './App.css';
import SocketIOTest from './SocketIOTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <main>
        <SocketIOTest />
      </main>
    </div>
  );
}

export default App;
