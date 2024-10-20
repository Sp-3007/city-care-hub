import React from 'react';
import Card from '../PlaceDetails/Card';
import Loading from '../Loading';

const List = ({ 
  onRequestLocationPermission, 
  locationPermission, 
  places, 
  setSelectedCategory, 
  setSelectedRating, 
  loading, 
  elRefs, 
  childClicked 
}) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  return (
    <div className="flex-1 p-4 h-full bg-gray-800 bg-opacity-20 ml-2 rounded-md"> {/* Light black background */}
      {locationPermission !== 'granted' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Allow Location Access</h2>
            <p className="mb-4">Click the button to allow the browser to access your location.</p>
            <button
              onClick={onRequestLocationPermission}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Allow Location Access
            </button>
          </div>
        </div>
      )}

      <h6 className="text-lg font-bold mb-2 text-center text-white">Food and Attractions Near You</h6> {/* White text for contrast */}

      <div className="flex mb-4 space-x-4">
        <div className="flex-1">
          <select 
            id="category" 
            onChange={handleCategoryChange} 
            className="border-2 border-black rounded-md p-1 w-full bg-gray-200"
          >
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </div>
        <div className="flex-1">
          <select 
            id="rating" 
            onChange={handleRatingChange} 
            className="border-2 border-black rounded-md p-1 w-full bg-gray-200"
          >
            <option value="all">All Ratings</option>
            <option value="3">Above 3 Stars</option>
            <option value="4">Above 4 Stars</option>
            <option value="4.5">Above 4.5 Stars</option>
          </select>
        </div>
      </div>

      <div className="overflow-y-auto h-[67vh] bg-gray-800 bg-opacity-5 rounded-lg p-2"> {/* Light black effect with opacity */}
        {loading ? (
          <Loading />
        ) : (
          places.map((place, i) => (
            <div ref={elRefs[i]} key={place.id || i} className="mb-4"> {/* Use a fallback key here */}
              <Card place={place} selected={Number(childClicked) === i} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
