import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPlayer from './VideoPlayer';

export default function VideoStream() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/list');
  };

  const videoSrc = `http://localhost:8080/api/videos/stream/range/${videoId}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 to-teal-700 p-4">
      <div className="w-full max-w-3xl bg-gray-900 bg-opacity-90 rounded-xl shadow-lg p-6">
        <button
          onClick={handleBack}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg mb-4 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>

        <h2 className="text-3xl font-bold mb-6 text-white text-center">Video Stream</h2>

        <div className="flex justify-center max-h-96">

          {/* <VideoPlayer
            src={`http://localhost:8080/api/videos/${videoId}/master.m3u8`}
          ></VideoPlayer> */}

          <video
            controls
            src={`http://192.168.1.17:8080/api/videos/stream/range/${videoId}`}
            className="w-full max-w-4xl h-auto rounded-lg"
            autoPlay
          />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
