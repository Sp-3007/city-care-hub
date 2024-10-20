import React from 'react';

const PhotoUpload = ({ photo, onPhotoChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Upload Photo</label>
      <input
        type="file"
        className="w-full p-2 border border-gray-300 rounded-md"
        accept="image/*"
        onChange={(e) => onPhotoChange(e.target.files[0])}
      />
    </div>
  );
};

export default PhotoUpload;
