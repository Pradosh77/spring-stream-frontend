import React, { useState } from 'react';
import axios from 'axios';
import { CloudUpload, Video } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      toast.success('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
      setUploadProgress(0);// Reset progress after completion
      console.log(response) 
    } catch (error) {
      toast.error('Error uploading video.');
      setUploadProgress(0);
    }
    finally {
      setIsUploading(false); // Re-enable the upload button
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-8 transform transition-all duration-500">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Upload Your Video</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-purple-200 mb-1">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full bg-white bg-opacity-20 text-white placeholder-purple-300 rounded-lg p-2"
              placeholder="Enter video title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-purple-200 mb-1">
              Video Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
              className="w-full bg-white bg-opacity-20 text-white placeholder-purple-300 rounded-lg p-2"
              placeholder="Enter video description"
            />
          </div>
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-purple-200 mb-1">
              Choose Video File
            </label>
            <div className="relative">
              <input
                type="file"
                id="video"
                // accept="video/*"
                onChange={handleFileChange}
                required
                className="hidden"
              />
              <label
                htmlFor="video"
                className="flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors duration-300"
              >
                <CloudUpload className="w-5 h-5 mr-2" />
                {file ? file.name : 'Select Video'}
              </label>
            </div>
          </div>
          {uploadProgress > 0 && (
            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-purple-200 mb-1">
                Upload Progress
              </label>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-300">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                  ></div>
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <Video className="w-5 h-5 mr-2" />
            {uploadProgress > 0 ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  );
}
