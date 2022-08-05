import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';
import Game from './components/Game/Game';
import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Levels from './components/Levels/Levels';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/levels" element={<Levels />} />
        <Route exact path="/play/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

