import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import LifeSnaps from './pages/LifeSnaps';
import GuestBook from './pages/GuestBook';

function App() {
  return (
    <Layout>
      <Routes>
      <Route path="/happy-birthday-TT" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/life-snaps" element={<LifeSnaps />} />
        <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
    </Layout>
  );
}

export default App;