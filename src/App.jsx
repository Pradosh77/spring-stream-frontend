import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UploadVideo from './components/UploadVideo';
import VideoList from './components/VideoList';
import VideoStream from './components/VideoStream';
import './App.css';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>
        <div className="space-x-4">
          <Link
            to="/upload"
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Video
          </Link>
          <Link
            to="/list"
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
          >
            Video List
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/list" element={<VideoList />} />
        <Route path="/stream/:videoId" element={<VideoStream />} />
        <Route path="/" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
}

export default App;