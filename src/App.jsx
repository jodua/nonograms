import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';
import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

