import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'react-toastify/dist/ReactToastify.css';

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/videos/videoList`);
        setVideos(response.data);
      } catch (error) {
        toast.error('Error fetching videos.');
      }
    };

    fetchVideos();
  }, []);

  // Sort videos by title in ascending order
  const sortedVideos = [...videos].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-teal-700 p-4">
      <div className="w-full max-w-3xl bg-gray-900 bg-opacity-90 rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Video List</h2>

        {/* Scrollable List Container */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
          <ul className="space-y-4">
            {sortedVideos.length > 0 ? (
              sortedVideos.map((video) => (
                <li
                  key={video.videoId}
                  className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg p-4 flex items-center justify-between shadow-md hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                    <p className="text-sm text-gray-300">{video.description}</p>
                    <p className="text-xs text-gray-400">{video.contentType}</p>
                  </div>
                  <Link
                    to={`/stream/${video.videoId}`} // Update to link to VideoStream
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Play
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-white text-center">No videos available</p>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
