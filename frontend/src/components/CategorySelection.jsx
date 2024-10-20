// CategorySelection.js
import React from 'react';

const CategorySelection = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'sanitation', name: 'Sanitation and Waste Management' },
    { id: 'water', name: 'Water Supply' },
    { id: 'roads', name: 'Roads and Infrastructure' },
    { id: 'sewage', name: 'Sewage and Drainage' },
    { id: 'electricity', name: 'Electricity' },
    { id: 'transport', name: 'Public Transportation' },
    { id: 'parks', name: 'Parks and Public Spaces' },
    { id: 'health', name: 'Health and Safety' },
    { id: 'construction', name: 'Building and Construction' },
    { id: 'traffic', name: 'Traffic and Parking' },
    { id: 'housing', name: 'Housing and Urban Development' },
    { id: 'miscellaneous', name: 'Miscellaneous' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Complaint Category</label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)} // Pass the name directly
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelection;
