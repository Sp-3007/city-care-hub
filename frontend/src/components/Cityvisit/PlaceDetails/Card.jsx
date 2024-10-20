import { useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaDirections, FaStar } from 'react-icons/fa';

const Card = ({ place, selected }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selected) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected]);

  // Default image URL
  const defaultImageUrl = "https://media-cdn.tripadvisor.com/media/photo-w/0e/b6/f1/0d/rasa-restaurant-at-four.jpg"; 

  return (
    <div ref={scrollRef} className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      {/* Image section */}
      <div className="h-72 bg-gray-200">
        <img
          src={place.photo ? place.photo.images.large.url : defaultImageUrl}
          alt={place.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Place name */}
        <h5 className="text-xl font-bold">{place.name}</h5>

        {/* Rating and reviews */}
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              {place.rating ? `Rating: ${parseFloat(place.rating).toFixed(1)}` : "N/A"}
            </span>
            <FaStar className="text-yellow-400 ml-2" />
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </span>
        </div>

        {/* Price level and ranking */}
        <div className="flex justify-between items-center my-2">
          <span className="text-sm font-semibold">Price:</span>
          <span className="text-sm text-gray-600">{place.price_level || "N/A"}</span>
        </div>

        <div className="flex justify-between items-center my-2">
          <span className="text-sm font-semibold">Ranking:</span>
          <span className="text-sm text-gray-600">{place.ranking || "N/A"}</span>
        </div>

        {/* Address */}
        {place.address && (
          <div className="text-sm text-gray-600 flex items-center my-2">
            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
            {place.address}
          </div>
        )}

        {/* Phone */}
        {place.phone && (
          <div className="text-sm text-gray-600 flex items-center my-2">
            <FaPhoneAlt className="w-4 h-4 mr-2" />
            {place.phone}
          </div>
        )}
      </div>

      {/* Card actions */}
      <div className="flex justify-between p-4 bg-gray-100">
        {place.latitude && place.longitude && (
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`,
                '_blank'
              )
            }
            className="text-blue-500 text-sm flex items-center"
          >
            <FaDirections className="mr-2" /> Directions
          </button>
        )}
        {place.web_url && (
          <button
            onClick={() => window.open(place.web_url, '_blank')}
            className="text-blue-500 text-sm flex items-center"
          >
            Trip Advisor
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
