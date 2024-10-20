import React, { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultImageUrl = "https://media-cdn.tripadvisor.com/media/photo-w/0e/b6/f1/0d/rasa-restaurant-at-four.jpg";

// Custom icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CustomMarkerIcon = L.icon({
  iconUrl: 'https://i.postimg.cc/pVFFkBrX/icons8-location-50.png',
});

const MapEventsHandler = ({ setMapBounds }) => {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const newBounds = {
        bl_latitude: bounds.getSouthWest().lat,
        bl_longitude: bounds.getSouthWest().lng,
        tr_latitude: bounds.getNorthEast().lat,
        tr_longitude: bounds.getNorthEast().lng,
      };
      setMapBounds(newBounds);
    },
  });
  return null;
};

// Component to update map center when coords change
const FlyToLocation = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords.lat !== 0 || coords.lng !== 0) {
      map.flyTo([coords.lat, coords.lng], 13); // Fly to the new coordinates with zoom level 13
    }
  }, [coords, map]);

  return null;
};

// Function to convert time from minutes to "HH:MM AM/PM"
const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Function to get formatted opening hours
const getOpeningHours = (week_ranges) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  const hours = week_ranges[dayOfWeek] || [];

  if (hours.length === 0) return 'Closed';

  return hours.map(range => {
    const openTime = formatTime(range.open_time);
    const closeTime = formatTime(range.close_time);
    return `${openTime} - ${closeTime}`;
  }).join(', ');
};

const Map = ({
  currentPosition,
  locationPermission,
  setMapBounds,
  places,
  setChildClicked,
  coords
}) => {
  return (
    <div className="flex-none w-2/3 p-4">
      {locationPermission === "granted" && currentPosition ? (
        <MapContainer
          center={coords.lat !== 0 || coords.lng !== 0 ? coords : currentPosition} 
          zoom={13}
          style={{ height: "570px", width: "100%", zIndex: 1 }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Default">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Terrain">
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
              />
            </LayersControl.BaseLayer>

            {/* Marker for Current Position */}
            <Marker position={currentPosition} icon={CustomMarkerIcon}>
              <Popup>You are here!</Popup>
            </Marker>

            {/* Map Markers for Places */}
            {places?.map((place, i) => {
              const lat = parseFloat(place.latitude);
              const lng = parseFloat(place.longitude);

              if (isNaN(lat) || isNaN(lng)) {
                return null; // Skip if coordinates are invalid
              }

              const openingHours = place.hours ? getOpeningHours(place.hours.week_ranges) : 'Hours not available';
              const distanceString = place.distance_string;
              return (
                <Marker
                  key={i}
                  position={[lat, lng]}
                  eventHandlers={{
                    mouseover: () => {
                      setChildClicked(i); // Set child clicked when hovering
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center p-2 rounded-lg shadow-md bg-white">
                      <img
                        src={place.photo ? place.photo.images.large.url : defaultImageUrl}
                        alt={place.name}
                        className="w-full h-24 object-cover mb-2 rounded-md"
                      />
                      <h5 className="text-lg font-bold">{place.name}</h5>
                      <div className="flex justify-center items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-lg">{place.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">Distance: {distanceString}</p>
                      <p className="text-sm text-gray-600">Hours: {openingHours}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {place.address ? place.address : 'Address not available'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </LayersControl>

          {/* Update map bounds and fly to new coordinates */}
          <MapEventsHandler setMapBounds={setMapBounds} />
          <FlyToLocation coords={coords} />
        </MapContainer>
      ) : (
        <p>Please allow location access to view the map.</p>
      )}
    </div>
  );
};

export default Map;
