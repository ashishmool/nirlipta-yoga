import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Journey from './Components/Journey';
import Retreats from './Components/Retreats';
import Categories from './Components/Categories';
import Plans from './Components/Plans';
import Quote from './Components/Quote';
import Instructors from './Components/Instructors';
import Courses from "./Pages/Courses";

function App() {
  return (
      <Router> {/* Wrap the entire application in Router */}
        <div className='App'>
          <Header />
          <Routes> {/* Add Routes for navigation */}
            <Route path="/" element={<Journey />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
