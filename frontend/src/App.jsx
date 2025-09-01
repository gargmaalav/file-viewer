import React, { useRef, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/files';

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  const fetchFiles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        setFiles([]);
        // Optionally, show an error message to the user
        console.error('Error fetching files:', data.error || data);
      }
    } catch (err) {
      setFiles([]);
      console.error('Network or server error:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
    fileInput.current.value = '';
    fetchFiles();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    setUploading(false);
    fetchFiles();
  };

  const handleDelete = async (key) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      await fetch(`${API_URL}/${key}`, {
        method: 'DELETE',
      });
      fetchFiles(); // Refresh the file list
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">File Viewer</h1>
      <form onSubmit={handleUpload} className="mb-4 w-full max-w-md flex flex-col items-center">
        <input
          type="file"
          ref={fileInput}
          className="mb-2"
          accept="*"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="w-full max-w-md h-32 border-2 border-dashed border-blue-400 flex items-center justify-center mb-4 bg-white rounded cursor-pointer"
      >
        Drag & Drop files here
      </div>
      <div className="w-full max-w-md bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Uploaded Files</h2>
        <ul>
          {files.map(f => (
            <li key={f.key} className="flex justify-between items-center border-b py-2">
              <span className="truncate max-w-xs">{f.key}</span>
              <div className="flex gap-2">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(f.key)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
